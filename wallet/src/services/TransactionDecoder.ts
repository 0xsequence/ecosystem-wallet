/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractCall, SequenceAPIClient } from '@0xsequence/api'
import { commons } from '@0xsequence/core'
import { ContractType, TxnTransferType } from '@0xsequence/indexer'
import { getAddress, encodeFunctionData, zeroAddress, Hex, slice, toHex } from 'viem'

import { apiClient } from '../sequenceApiClient'

// ==================== Core Types ====================

interface TransactionEncodedWithCall extends commons.transaction.TransactionEncoded {
  call?: ContractCall
}

type Args = Record<string, any>

interface TxnData {
  to: string
  signature: string
  byteSignature: Hex
  methodName: string
  args: Args
  objs: TxnData[]
  value: string
  data: string
}

interface ContractCallArg {
  name?: string
  type: string
  value: any
}

// ==================== Decoder Configuration ====================

type DecodingType = string

interface BaseDecoding {
  type: DecodingType
  signature: string
  byteSignature: Hex
  methodName: string
  target: string
  value: string
}

interface DecoderDefinition<T extends BaseDecoding> {
  /** Unique identifier for this decoding type */
  type: DecodingType

  /** Byte signatures this decoder can handle */
  byteSignatures: Hex[]

  /**
   * Function to determine if this decoder can handle the transaction.
   * More specific than byte signature matching.
   */
  matcher?: (txnData: TxnData) => boolean

  /**
   * Function to decode the transaction into your custom props.
   * Return undefined if the transaction doesn't match expected format.
   */
  decoder: (params: {
    txnData: TxnData
    baseDecoding: BaseDecoding
    transaction: commons.transaction.TransactionEncoded
    fromAddress: string
  }) => T | undefined

  /**
   * Optional function to transform arguments before they're passed to the decoder.
   * Useful for normalizing different argument formats.
   */
  argsTransformer?: (args: Args) => Args
}

// ==================== Built-in Decoders ====================

const NATIVE_TRANSFER_TYPE = 'native-transfer'

interface NativeTransferDecoding extends BaseDecoding {
  type: typeof NATIVE_TRANSFER_TYPE
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType
  from: string
  to: string
  tokenIds: string[]
  amounts: string[]
}

const nativeTransferDecoder: DecoderDefinition<NativeTransferDecoding> = {
  type: NATIVE_TRANSFER_TYPE,
  byteSignatures: [],
  matcher: transaction => transaction.data === '0x' || !transaction.data,
  decoder: ({ baseDecoding, transaction, fromAddress }) => ({
    ...baseDecoding,
    type: NATIVE_TRANSFER_TYPE,
    transferType: TxnTransferType.SEND,
    contractAddress: zeroAddress,
    contractType: ContractType.UNKNOWN,
    from: fromAddress,
    to: getAddress(transaction.target),
    tokenIds: ['0'],
    amounts: [BigInt(transaction.value).toString()],
    methodName: 'nativeTokenTransfer'
  })
}

// ==================== Transaction Decoder Service ====================

type InferDecodingType<T extends DecoderDefinition<any>> = T extends DecoderDefinition<infer U> ? U : never

export class TransactionDecoderService {
  private decoders: DecoderDefinition<any>[] = [nativeTransferDecoder]

  constructor(private apiClient: SequenceAPIClient) {}

  /**
   * Register a new decoder
   */
  public registerDecoder<T extends BaseDecoding>(decoder: DecoderDefinition<T>): void {
    this.decoders.push(decoder)
  }

  /**
   * Get all supported decoding types
   */
  public getSupportedTypes(): DecodingType[] {
    return this.decoders.map(d => d.type)
  }

  /**
   * Decode a list of transactions
   */
  public async decodeTransactions(
    accountAddress: string,
    transactions: commons.transaction.Transaction[]
  ): Promise<Array<InferDecodingType<(typeof this.decoders)[number]>>> {
    const encodedTxns = this.encodeTransactions(transactions)
    const decodedRoot = await this.decodeTxnData(encodedTxns)
    const from = getAddress(accountAddress)

    // Try nested transactions first
    if (decodedRoot.objs?.length) {
      for (const nestedTxn of decodedRoot.objs) {
        const nestedTxnForDecoding = {
          target: nestedTxn.to,
          data: nestedTxn.data,
          value: nestedTxn.value
        } as commons.transaction.TransactionEncoded

        const decoded = this.decodeSingleTransaction(nestedTxnForDecoding, nestedTxn, from)
        if (decoded) return [decoded]
      }
    }

    // If no nested transactions matched, try the root transaction
    const rootResult = this.decodeSingleTransaction(encodedTxns[0], decodedRoot, from)
    if (rootResult) return [rootResult]

    return []
  }

  private encodeTransactions(
    transactions: Array<commons.transaction.Transaction | commons.transaction.TransactionEncoded>
  ): commons.transaction.TransactionEncoded[] {
    return transactions.map(txn => ({
      delegateCall: txn.delegateCall ?? false,
      revertOnError: txn.revertOnError ?? false,
      gasLimit: txn.gasLimit ?? 0,
      target: 'target' in txn ? txn.target : 'to' in txn ? txn.to : zeroAddress,
      value: txn.value ?? 0,
      data: txn.data ?? '0x'
    }))
  }

  private async decodeTxnData(txns: commons.transaction.TransactionEncoded[]): Promise<TxnData> {
    const callData = encodeFunctionData({ abi: mainModuleAbi, functionName: 'selfExecute', args: [txns] })
    const { call } = await this.apiClient.decodeContractCall({ callData })
    return createTxnData('', call, 0, callData)
  }

  private decodeSingleTransaction(
    transaction: commons.transaction.TransactionEncoded,
    txnData: TxnData | undefined,
    fromAddress: string
  ): any | undefined {
    const baseDecoding: BaseDecoding = {
      type: 'unknown',
      signature: txnData?.signature || '',
      byteSignature: txnData?.byteSignature || '0x',
      methodName: txnData?.methodName || '',
      target: txnData?.to || transaction.target, // Prefer txnData.to as it comes from the decoded call
      value: BigInt(txnData?.value || transaction.value).toString()
    }

    // Find the first matching decoder
    for (const decoder of this.decoders) {
      const txnByteSignature = txnData?.byteSignature ? txnData.byteSignature.toLowerCase() : '0x'
      const decoderSigs = decoder.byteSignatures.map(sig => sig.toLowerCase())
      const isByteSigMatch =
        txnData && txnByteSignature !== '0x'
          ? decoderSigs.some(sig => sig === txnByteSignature)
          : decoder.byteSignatures.length === 0

      console.log('decoder.type', decoder.type)
      console.log('isByteSigMatch', isByteSigMatch)
      console.log('txn data', JSON.stringify(txnData, null, 2))

      const isMatcherMatch = decoder.matcher
        ? decoder.matcher(
            txnData || {
              to: transaction.target,
              signature: '',
              byteSignature: '0x',
              methodName: '',
              args: {},
              objs: [],
              value: BigInt(transaction.value).toString(),
              data: transaction.data
            }
          )
        : isByteSigMatch

      console.log('isMatcherMatch', isMatcherMatch)

      if (isMatcherMatch) {
        let args = txnData?.args || {}

        // Transform args if needed
        if (decoder.argsTransformer && Object.keys(args).length > 0) {
          args = decoder.argsTransformer(args)
        }

        // Create the full txn data object
        const fullTxnData = {
          ...txnData,
          to: txnData?.to || transaction.target,
          signature: txnData?.signature || '',
          byteSignature: txnData?.byteSignature || '0x',
          methodName: txnData?.methodName || '',
          args: args,
          objs: txnData?.objs || [],
          value: txnData?.value || BigInt(transaction.value).toString(),
          data: txnData?.data || transaction.data
        }

        console.log('fullTxnData', JSON.stringify(fullTxnData, null, 2))

        return decoder.decoder({
          txnData: fullTxnData,
          baseDecoding,
          transaction,
          fromAddress
        })
      }
    }

    return undefined
  }
}

const mainModuleAbi = [
  {
    type: 'function',
    name: 'nonce',
    constant: true,
    inputs: [],
    outputs: [
      {
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'readNonce',
    constant: true,
    inputs: [
      {
        type: 'uint256'
      }
    ],
    outputs: [
      {
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'updateImplementation',
    constant: false,
    inputs: [
      {
        type: 'address'
      }
    ],
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'selfExecute',
    constant: false,
    inputs: [
      {
        components: [
          {
            type: 'bool',
            name: 'delegateCall'
          },
          {
            type: 'bool',
            name: 'revertOnError'
          },
          {
            type: 'uint256',
            name: 'gasLimit'
          },
          {
            type: 'address',
            name: 'target'
          },
          {
            type: 'uint256',
            name: 'value'
          },
          {
            type: 'bytes',
            name: 'data'
          }
        ],
        type: 'tuple[]'
      }
    ],
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'execute',
    constant: false,
    inputs: [
      {
        components: [
          {
            type: 'bool',
            name: 'delegateCall'
          },
          {
            type: 'bool',
            name: 'revertOnError'
          },
          {
            type: 'uint256',
            name: 'gasLimit'
          },
          {
            type: 'address',
            name: 'target'
          },
          {
            type: 'uint256',
            name: 'value'
          },
          {
            type: 'bytes',
            name: 'data'
          }
        ],
        type: 'tuple[]'
      },
      {
        type: 'uint256'
      },
      {
        type: 'bytes'
      }
    ],
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'createContract',
    inputs: [
      {
        type: 'bytes'
      }
    ],
    payable: true,
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'setExtraImageHash',
    constant: false,
    inputs: [
      {
        type: 'bytes32',
        name: 'imageHash'
      },
      {
        type: 'uint256',
        name: 'expiration'
      }
    ],
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable'
  }
]

// ==================== Helper Functions ====================

const transformArgs = (args: ContractCallArg[]): Args => {
  // Handle root level transaction array
  if (args.length === 1 && args[0].type.startsWith('tuple[]')) {
    const firstArg = args[0]

    if (Array.isArray(firstArg.value)) {
      // Find first transaction with a call and return its args
      const callTxn = firstArg.value.find(txn => txn.call?.args)
      if (callTxn?.call) {
        return transformArgs(callTxn.call.args)
      }
    }
  }

  // Transform regular arguments
  return Object.fromEntries(
    args.map((arg, i) => {
      const name = arg.name && !arg.name.startsWith('unnamed') ? arg.name : `_${i}`
      let value = arg.value

      // Handle array and tuple types
      if (Array.isArray(value)) {
        if (arg.type.includes('tuple')) {
          // Handle tuple arrays recursively
          value = value.map(v => {
            // If this is a call, extract its args
            if (v.call?.args) {
              return transformArgs(v.call.args)
            }
            return v
          })
        } else {
          // Handle basic arrays (numbers, etc)
          value = value.map(v => {
            if (typeof v === 'bigint') return v.toString()
            return v
          })
        }
      } else if (typeof value === 'bigint') {
        // Convert single bigint values to strings
        value = value.toString()
      }

      return [name, value]
    })
  )
}

const createTxnData = (
  to: string,
  call: ContractCall,
  value: string | number | bigint,
  data: Hex
): TxnData => {
  const args = transformArgs(call.args)

  let objs: TxnData['objs'] = []
  // Normalize the data before slicing
  let methodByteSignature: Hex = slice(data, 0, 4)

  switch (call.signature) {
    case 'execute((bool,bool,uint256,address,uint256,bytes)[],uint256,bytes)':
    case 'selfExecute((bool,bool,uint256,address,uint256,bytes)[])': {
      const txns: TransactionEncodedWithCall[] = call.args[0].value

      // Process nested transactions
      const processedTxns = txns.map(txn => {
        if (txn.call) {
          // Create txn data from the decoded call
          return createTxnData(txn.target, txn.call, txn.value, txn.data as Hex)
        }

        // Create a basic transaction object for non-decoded calls
        return {
          to: txn.target,
          signature: '',
          byteSignature: slice(txn.data as Hex, 0, 4),
          methodName: '',
          args: {},
          objs: [],
          value: toHex(BigInt(txn.value)),
          data: txn.data
        }
      })

      objs = processedTxns

      // Use the first nested transaction's byte signature
      if (processedTxns.length > 0 && processedTxns[0].byteSignature !== '0x') {
        methodByteSignature = processedTxns[0].byteSignature
      }
    }
  }

  return {
    to,
    signature: call.signature,
    byteSignature: methodByteSignature,
    methodName: call.function,
    args,
    objs,
    value: toHex(BigInt(value)),
    data: data
  }
}

// ==================== Example Usage ====================

// 1. Define your custom decoding type
interface ERC20TransferDecoding extends BaseDecoding {
  type: 'erc20-transfer'
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType.ERC20
  from: string
  to: string
  amount: string
}

// 2. Create your decoder
const erc20TransferDecoder: DecoderDefinition<ERC20TransferDecoding> = {
  type: 'erc20-transfer',
  byteSignatures: ['0xa9059cbb'], // transfer(address,uint256)
  decoder: ({ txnData, baseDecoding, fromAddress }) => {
    // Type-safe access to args
    const recipient = txnData.args.recipient || txnData.args._0
    const amount = txnData.args.amount || txnData.args._1

    if (!recipient || amount === undefined) return undefined

    return {
      ...baseDecoding,
      type: 'erc20-transfer',
      transferType: TxnTransferType.SEND,
      contractAddress: getAddress(txnData.to),
      contractType: ContractType.ERC20,
      from: fromAddress,
      to: getAddress(recipient),
      amount: String(amount),
      methodName: 'transfer'
    }
  },
  // Optional: normalize argument names
  argsTransformer: args => ({
    recipient: args.recipient || args._0,
    amount: args.amount || args._1
  })
}

// ==================== ERC1155 Decoding Types ====================

const ERC1155_SINGLE_TRANSFER_TYPE = 'erc1155-single-transfer'
const ERC1155_BATCH_TRANSFER_TYPE = 'erc1155-batch-transfer'

interface ERC1155SingleTransferDecoding extends BaseDecoding {
  type: typeof ERC1155_SINGLE_TRANSFER_TYPE
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType.ERC1155
  from: string
  to: string
  tokenId: string
  amount: string
  data: string
}

interface ERC1155BatchTransferDecoding extends BaseDecoding {
  type: typeof ERC1155_BATCH_TRANSFER_TYPE
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType.ERC1155
  from: string
  to: string
  tokenIds: string[]
  amounts: string[]
  data: string
}

// ==================== ERC1155 Decoders ====================

const erc1155SingleTransferDecoder: DecoderDefinition<ERC1155SingleTransferDecoding> = {
  type: ERC1155_SINGLE_TRANSFER_TYPE,
  byteSignatures: ['0xf242432a'], // safeTransferFrom(address,address,uint256,uint256,bytes)
  argsTransformer: args => ({
    from: args.from || args._from || args._0,
    to: args.to || args._to || args._1,
    tokenId: args.id || args.tokenId || args._id || args._2,
    amount: args.value || args.amount || args._value || args._3,
    data: args.data || args._data || args._4
  }),
  decoder: ({ txnData, baseDecoding, fromAddress }) => {
    const { from, to, tokenId, amount, data } = txnData.args

    if (!from || !to || tokenId === undefined || amount === undefined) {
      return undefined
    }

    return {
      ...baseDecoding,
      type: ERC1155_SINGLE_TRANSFER_TYPE,
      transferType:
        from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE,
      contractAddress: getAddress(txnData.to),
      contractType: ContractType.ERC1155,
      from: getAddress(from),
      to: getAddress(to),
      tokenId: String(tokenId),
      amount: String(amount),
      data: data || '0x',
      methodName: 'safeTransferFrom'
    }
  }
}

const erc1155BatchTransferDecoder: DecoderDefinition<ERC1155BatchTransferDecoding> = {
  type: ERC1155_BATCH_TRANSFER_TYPE,
  byteSignatures: ['0x2eb2c2d6'], // safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)
  argsTransformer: args => ({
    from: args.from || args._from || args._0,
    to: args.to || args._to || args._1,
    tokenIds: args.ids || args.tokenIds || args._ids || args._2,
    amounts: args.values || args.amounts || args._values || args._amounts || args._3,
    data: args.data || args._data || args._4
  }),
  decoder: ({ txnData, baseDecoding, fromAddress }) => {
    const { from, to, tokenIds, amounts, data } = txnData.args

    // Validate all required fields
    if (!from || !to || !Array.isArray(tokenIds) || !Array.isArray(amounts)) return undefined
    if (tokenIds.length === 0 || amounts.length === 0) return undefined
    if (tokenIds.length !== amounts.length) return undefined

    // Create the decoded transaction
    return {
      ...baseDecoding,
      type: ERC1155_BATCH_TRANSFER_TYPE,
      transferType:
        from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE,
      contractAddress: getAddress(txnData.to),
      contractType: ContractType.ERC1155,
      from: getAddress(from),
      to: getAddress(to),
      tokenIds: tokenIds?.map(String) || [],
      amounts: amounts?.map(String) || [],
      data: data || '0x',
      methodName: 'safeBatchTransferFrom'
    }
  }
}

// ==================== Registering Decoders ====================

// Add these to your existing decoder service

// Initialize decoder service with native transfer decoder
export const decoderService = new TransactionDecoderService(apiClient)

// Register decoders in priority order (most specific first)
decoderService.registerDecoder(erc1155BatchTransferDecoder)
decoderService.registerDecoder(erc1155SingleTransferDecoder)
decoderService.registerDecoder(erc20TransferDecoder)
