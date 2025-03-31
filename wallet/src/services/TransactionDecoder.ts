/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractCall, SequenceAPIClient } from '@0xsequence/api'
import { commons } from '@0xsequence/core'
import { ContractInfo, ContractType, TokenMetadata, TxnTransferType } from '@0xsequence/indexer'
import { getAddress, encodeFunctionData, zeroAddress, Hex, slice, toHex } from 'viem'

import { apiClient } from '../sequenceApiClient'
import { getContractInfoBatch, getTokenMetadata } from '../utils/metadata'

interface TransactionEncodedWithCall extends commons.transaction.TransactionEncoded {
  call?: ContractCall
}

type Args = Record<string, any>

interface TxnData<TArgs extends Args = Args> {
  to: string
  signature: string
  byteSignature: Hex
  methodName: string
  args: TArgs
  objs: TxnData[]
  value: string
  data: string
}

interface ContractCallArg {
  name?: string
  type: string
  value: any
}

type DecodingType = string

interface BaseDecoding {
  type: DecodingType
  signature: string
  byteSignature: Hex
  methodName: string
  target: string
  value: string
}

interface DecoderDefinition<TDecoded extends BaseDecoding, TInputArgs extends Args = Args> {
  type: DecodingType
  byteSignatures: Hex[]
  matcher?: (txnData: TxnData) => boolean
  decoder: (params: {
    txnData: TxnData<TInputArgs>
    baseDecoding: BaseDecoding
    transaction: commons.transaction.TransactionEncoded
    fromAddress: string
  }) => TDecoded | undefined
  argsTransformer?: (rawArgs: Args) => TInputArgs
  metadataFetcher?: (params: {
    baseDecodedResult: TDecoded
    chainID: string | number
  }) => Promise<Partial<TDecoded> | undefined> // Returns only metadata fields
}

const NATIVE_TRANSFER_TYPE = 'native-transfer'

interface NativeTransferDecoding extends BaseDecoding {
  type: typeof NATIVE_TRANSFER_TYPE
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType.NATIVE
  from: string
  to: string
  value: string
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
    contractType: ContractType.NATIVE,
    from: fromAddress,
    to: getAddress(transaction.target),
    value: BigInt(transaction.value).toString(),
    methodName: 'nativeTokenTransfer'
  })
  // No fetchMetadata needed for native transfers
}

type InferDecodedType<T extends DecoderDefinition<any, any>> =
  T extends DecoderDefinition<infer U, any> ? U : never

export class TransactionDecoderService {
  private decoders: Array<DecoderDefinition<any, any>> = [nativeTransferDecoder]

  constructor(private apiClient: SequenceAPIClient) {}

  public registerDecoder<TDecoded extends BaseDecoding, TInputArgs extends Args>(
    decoder: DecoderDefinition<TDecoded, TInputArgs>
  ): void {
    this.decoders.push(decoder)
  }

  public getSupportedTypes(): DecodingType[] {
    return this.decoders.map(d => d.type)
  }

  // Make decodeTransactions async and add chainID parameter
  public async decodeTransactions(
    accountAddress: string,
    chainID: string | number, // Added chainID
    transactions: commons.transaction.Transaction[]
  ): Promise<Array<InferDecodedType<(typeof this.decoders)[number]>>> {
    const encodedTxns = this.encodeTransactions(transactions)
    const decodedRoot: TxnData = await this.decodeTxnData(encodedTxns)
    const fromAddress = getAddress(accountAddress)

    const results: Array<InferDecodedType<(typeof this.decoders)[number]>> = []

    // Make attemptDecode async to handle async decodeSingleTransaction
    const attemptDecode = async (
      originalTxn: commons.transaction.TransactionEncoded,
      txnDataToDecode: TxnData
    ): Promise<InferDecodedType<(typeof this.decoders)[number]> | undefined> => {
      // Pass chainID and await the async call
      return await this.decodeSingleTransaction(originalTxn, txnDataToDecode, fromAddress, chainID)
    }

    if (decodedRoot.objs?.length) {
      // Use Promise.all to handle potential async decodes in nested transactions
      // Note: This still processes nested decodes concurrently, but the metadata fetch within each is sequential.
      const nestedResults = await Promise.all(
        decodedRoot.objs.map(nestedTxnData => {
          const pseudoOriginalTxn: commons.transaction.TransactionEncoded = {
            target: nestedTxnData.to,
            data: nestedTxnData.data,
            value: nestedTxnData.value,
            delegateCall: false,
            revertOnError: false,
            gasLimit: 0
          }
          // Await the async call here
          return attemptDecode(pseudoOriginalTxn, nestedTxnData)
        })
      )
      // Filter out undefined results and push valid ones
      results.push(
        ...(nestedResults.filter(r => r !== undefined) as Array<
          InferDecodedType<(typeof this.decoders)[number]>
        >)
      )
      // If nested transactions were decoded, return them
      if (results.length > 0) return results
    }

    const rootResult = await attemptDecode(encodedTxns[0], decodedRoot)
    if (rootResult) {
      results.push(rootResult)
    }

    return results
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

  private async decodeSingleTransaction<TDecoded extends BaseDecoding, TInputArgs extends Args>(
    originalTransaction: commons.transaction.TransactionEncoded,
    txnDataForMatching: TxnData,
    fromAddress: string,
    chainID: string | number // Added chainID
  ): Promise<TDecoded | undefined> {
    // Return Promise
    const baseDecoding: BaseDecoding = {
      type: 'unknown', // Default type
      signature: txnDataForMatching.signature || '',
      byteSignature: txnDataForMatching.byteSignature || '0x',
      methodName: txnDataForMatching.methodName || '',
      target: txnDataForMatching.to || originalTransaction.target,
      value: BigInt(txnDataForMatching.value || originalTransaction.value).toString()
    }

    for (const decoder of this.decoders as Array<DecoderDefinition<TDecoded, TInputArgs>>) {
      const txnByteSignature = txnDataForMatching.byteSignature
        ? txnDataForMatching.byteSignature.toLowerCase()
        : '0x'
      const decoderSigs = decoder.byteSignatures.map(sig => sig.toLowerCase())

      const isByteSigMatch =
        decoder.byteSignatures.length === 0
          ? txnByteSignature === '0x' || !txnDataForMatching.data || txnDataForMatching.data === '0x'
          : decoderSigs.some(sig => sig === txnByteSignature)

      const isMatcherMatch = decoder.matcher ? decoder.matcher(txnDataForMatching) : isByteSigMatch

      if (isMatcherMatch) {
        let transformedArgs: TInputArgs = txnDataForMatching.args as TInputArgs

        if (decoder.argsTransformer) {
          try {
            transformedArgs = decoder.argsTransformer(txnDataForMatching.args)
          } catch (error) {
            console.error(`Error transforming args for decoder ${decoder.type}:`, error)
            continue // Skip this decoder if args transformation fails
          }
        }

        const specificTxnData: TxnData<TInputArgs> = {
          ...txnDataForMatching,
          args: transformedArgs
        }

        try {
          // Perform initial decoding
          const decodedResult = decoder.decoder({
            txnData: specificTxnData,
            baseDecoding,
            transaction: originalTransaction,
            fromAddress
          })

          // If decoding was successful, attempt to fetch metadata
          if (decodedResult) {
            // Check if fetchMetadata exists for this decoder
            if (decoder.metadataFetcher) {
              try {
                // Await the metadata fetch
                const metadataFields = await decoder.metadataFetcher({
                  baseDecodedResult: decodedResult,
                  chainID
                })
                if (metadataFields) {
                  // Merge metadata into the result and return
                  return { ...decodedResult, ...metadataFields }
                }
              } catch (error) {
                console.error(`Error fetching metadata for decoder ${decoder.type}:`, error)
                // Return base result even if metadata fetch fails, log the error
                return decodedResult
              }
            }
            // If no fetchMetadata or it didn't return fields, return the base decoded result
            return decodedResult
          }
        } catch (error) {
          console.error(`Error in decoder ${decoder.type}:`, error)
          // Continue to the next decoder if an error occurs
        }
      }
    }

    // No matching decoder found or all failed
    return undefined
  }
}

// --- ABI Definition
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

// --- Helper Functions (transformArgs, createTxnData - unchanged) ---
const transformArgs = (args: ContractCallArg[]): Args => {
  if (args.length === 1 && args[0].type.startsWith('tuple[]')) {
    const firstArg = args[0]

    if (Array.isArray(firstArg.value)) {
      const callTxn = firstArg.value.find(txn => txn.call?.args)
      if (callTxn?.call) {
        return transformArgs(callTxn.call.args)
      }
    }
  }

  return Object.fromEntries(
    args.map((arg, i) => {
      const name = arg.name && !arg.name.startsWith('unnamed') ? arg.name : `_${i}`
      let value = arg.value

      if (Array.isArray(value)) {
        if (arg.type.includes('tuple')) {
          value = value.map(v => {
            if (v.call?.args) {
              return transformArgs(v.call.args)
            }
            return v
          })
        } else {
          value = value.map(v => {
            if (typeof v === 'bigint') return v.toString()
            return v
          })
        }
      } else if (typeof value === 'bigint') {
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
  const rawArgs = transformArgs(call.args)

  let objs: TxnData['objs'] = []
  const methodByteSignature: Hex = slice(data, 0, 4) // Changed let to const

  switch (call.signature) {
    case 'execute((bool,bool,uint256,address,uint256,bytes)[],uint256,bytes)':
    case 'selfExecute((bool,bool,uint256,address,uint256,bytes)[])': {
      const txns: TransactionEncodedWithCall[] = call.args[0].value

      const processedTxns = txns.map(txn => {
        if (txn.call) {
          return createTxnData(txn.target, txn.call, txn.value, txn.data as Hex)
        } else {
          const nestedByteSig = txn.data && txn.data !== '0x' ? slice(txn.data as Hex, 0, 4) : '0x'
          return {
            to: txn.target,
            signature: '',
            byteSignature: nestedByteSig,
            methodName: '',
            args: {},
            objs: [],
            value: toHex(BigInt(txn.value)),
            data: txn.data as Hex
          }
        }
      })

      objs = processedTxns
    }
  }

  return {
    to,
    signature: call.signature,
    byteSignature: methodByteSignature,
    methodName: call.function,
    args: rawArgs,
    objs,
    value: toHex(BigInt(value)),
    data: data
  }
}

// --- ERC20 Decoder ---
interface ERC20TransferDecoding extends BaseDecoding {
  type: 'erc20-transfer'
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType.ERC20
  from: string
  to: string
  amount: string
  contractInfo?: ContractInfo // Added metadata field
}

interface ERC20TransferArgs {
  recipient: string
  amount: string
}

const erc20TransferDecoder: DecoderDefinition<ERC20TransferDecoding, ERC20TransferArgs> = {
  type: 'erc20-transfer',
  byteSignatures: ['0xa9059cbb'], // transfer(address,uint256)
  argsTransformer: (rawArgs): ERC20TransferArgs => ({
    // Added checks for 'to' and 'value' which are present in the decoded call args
    recipient: String(rawArgs.recipient || rawArgs._to || rawArgs.to || rawArgs._0 || zeroAddress),
    amount: String(rawArgs.amount || rawArgs._value || rawArgs.value || rawArgs._1 || '0')
  }),
  decoder: ({ txnData, baseDecoding, fromAddress }) => {
    const { recipient, amount } = txnData.args

    if (!recipient || recipient === zeroAddress || amount === undefined) {
      console.warn('ERC20 Transfer: Invalid or missing arguments after transformation.')
      return undefined
    }

    return {
      ...baseDecoding,
      type: 'erc20-transfer',
      transferType: TxnTransferType.SEND, // Assuming wallet initiated transfers are sends
      contractAddress: getAddress(txnData.to),
      contractType: ContractType.ERC20,
      from: fromAddress,
      to: getAddress(recipient),
      amount: amount,
      methodName: 'transfer'
    }
  },
  metadataFetcher: async ({ baseDecodedResult, chainID }) => {
    try {
      const contractAddress = getAddress(baseDecodedResult.contractAddress)
      const result = await getContractInfoBatch({
        chainID: String(chainID),
        contractAddresses: [contractAddress]
      })
      // Use contractInfoMap which is keyed by address. Try both checksummed and lowercase lookup.
      const info =
        result.contractInfoMap?.[contractAddress] ?? result.contractInfoMap?.[contractAddress.toLowerCase()]
      return info ? { contractInfo: info } : undefined
    } catch (error) {
      console.error(`Error fetching ERC20 contract info for ${baseDecodedResult.contractAddress}:`, error)
      return undefined
    }
  }
}

// --- ERC721 Decoder ---
const ERC721_TRANSFER_TYPE = 'erc721-transfer'

interface ERC721TransferDecoding extends BaseDecoding {
  type: typeof ERC721_TRANSFER_TYPE
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType.ERC721
  from: string
  to: string
  tokenId: string
  tokenMetadata?: TokenMetadata // Added metadata field
}

interface ERC721TransferArgs {
  from: string
  to: string
  tokenId: string
}

const erc721TransferDecoder: DecoderDefinition<ERC721TransferDecoding, ERC721TransferArgs> = {
  type: ERC721_TRANSFER_TYPE,
  byteSignatures: [
    '0x23b872dd', // transferFrom(address,address,uint256)
    '0x42842e0e' // safeTransferFrom(address,address,uint256)
    // Note: safeTransferFrom(address,address,uint256,bytes) - 0xb88d4fde - is not handled here, assumes no data payload
  ],
  argsTransformer: (rawArgs): ERC721TransferArgs => ({
    from: String(rawArgs.from || rawArgs._from || rawArgs._0 || zeroAddress),
    to: String(rawArgs.to || rawArgs._to || rawArgs._1 || zeroAddress),
    tokenId: String(rawArgs.tokenId || rawArgs._tokenId || rawArgs._2 || '0')
  }),
  decoder: ({ txnData, baseDecoding, fromAddress }) => {
    const { from, to, tokenId } = txnData.args

    if (!from || from === zeroAddress || !to || to === zeroAddress || tokenId === undefined) {
      console.warn('ERC721 Transfer: Invalid or missing arguments after transformation.')
      return undefined
    }

    // Determine transfer type based on who initiated (fromAddress)
    const transferType =
      from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE

    // Determine method name based on byte signature
    const methodName = txnData.byteSignature === '0x42842e0e' ? 'safeTransferFrom' : 'transferFrom'

    return {
      ...baseDecoding,
      type: ERC721_TRANSFER_TYPE,
      transferType: transferType,
      contractAddress: getAddress(txnData.to),
      contractType: ContractType.ERC721,
      from: getAddress(from),
      to: getAddress(to),
      tokenId: tokenId,
      methodName: methodName
    }
  },
  metadataFetcher: async ({ baseDecodedResult, chainID }) => {
    try {
      const result = await getTokenMetadata({
        chainID: String(chainID),
        contractAddress: baseDecodedResult.contractAddress,
        tokenIDs: [baseDecodedResult.tokenId]
      })
      const meta = result.tokenMetadata?.[0]
      return meta ? { tokenMetadata: meta } : undefined
    } catch (error) {
      console.error(
        `Error fetching ERC721 token metadata for ${baseDecodedResult.contractAddress}#${baseDecodedResult.tokenId}:`,
        error
      )
      return undefined
    }
  }
}

// --- ERC1155 Decoders ---
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
  tokenMetadata?: TokenMetadata // Added metadata field
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
  tokenMetadata?: TokenMetadata[] // Added metadata field (array)
}

interface ERC1155SingleTransferArgs {
  from: string
  to: string
  tokenId: string
  amount: string
  data: string
}

interface ERC1155BatchTransferArgs {
  from: string
  to: string
  tokenIds: string[]
  amounts: string[]
  data: string
}

const erc1155SingleTransferDecoder: DecoderDefinition<
  ERC1155SingleTransferDecoding,
  ERC1155SingleTransferArgs
> = {
  type: ERC1155_SINGLE_TRANSFER_TYPE,
  byteSignatures: ['0xf242432a'], // safeTransferFrom(address,address,uint256,uint256,bytes)
  argsTransformer: (rawArgs): ERC1155SingleTransferArgs => ({
    from: String(rawArgs.from || rawArgs._from || rawArgs._0 || zeroAddress),
    to: String(rawArgs.to || rawArgs._to || rawArgs._1 || zeroAddress),
    tokenId: String(rawArgs.id || rawArgs.tokenId || rawArgs._id || rawArgs._2 || '0'),
    amount: String(rawArgs.value || rawArgs.amount || rawArgs._value || rawArgs._3 || '0'),
    data: String(rawArgs.data || rawArgs._data || rawArgs._4 || '0x')
  }),
  decoder: ({ txnData, baseDecoding, fromAddress }) => {
    const { from, to, tokenId, amount, data } = txnData.args

    if (
      !from ||
      from === zeroAddress ||
      !to ||
      to === zeroAddress ||
      tokenId === undefined ||
      amount === undefined
    ) {
      console.warn('ERC1155 Single Transfer: Invalid or missing arguments after transformation.')
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
      tokenId: tokenId,
      amount: amount,
      data: data,
      methodName: 'safeTransferFrom'
    }
  },
  metadataFetcher: async ({ baseDecodedResult, chainID }) => {
    try {
      const result = await getTokenMetadata({
        chainID: String(chainID),
        contractAddress: baseDecodedResult.contractAddress,
        tokenIDs: [baseDecodedResult.tokenId]
      })
      const meta = result.tokenMetadata?.[0]
      return meta ? { tokenMetadata: meta } : undefined
    } catch (error) {
      console.error(
        `Error fetching ERC1155 single token metadata for ${baseDecodedResult.contractAddress}#${baseDecodedResult.tokenId}:`,
        error
      )
      return undefined
    }
  }
}

const erc1155BatchTransferDecoder: DecoderDefinition<ERC1155BatchTransferDecoding, ERC1155BatchTransferArgs> =
  {
    type: ERC1155_BATCH_TRANSFER_TYPE,
    byteSignatures: ['0x2eb2c2d6'], // safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)
    argsTransformer: (rawArgs): ERC1155BatchTransferArgs => {
      const tokenIdsRaw = rawArgs.ids || rawArgs.tokenIds || rawArgs._ids || rawArgs._2
      const amountsRaw =
        rawArgs.values || rawArgs.amounts || rawArgs._values || rawArgs._amounts || rawArgs._3

      return {
        from: String(rawArgs.from || rawArgs._from || rawArgs._0 || zeroAddress),
        to: String(rawArgs.to || rawArgs._to || rawArgs._1 || zeroAddress),
        tokenIds: Array.isArray(tokenIdsRaw) ? tokenIdsRaw.map(String) : [],
        amounts: Array.isArray(amountsRaw) ? amountsRaw.map(String) : [],
        data: String(rawArgs.data || rawArgs._data || rawArgs._4 || '0x')
      }
    },
    decoder: ({ txnData, baseDecoding, fromAddress }) => {
      const { from, to, tokenIds, amounts, data } = txnData.args

      if (
        !from ||
        from === zeroAddress ||
        !to ||
        to === zeroAddress ||
        !Array.isArray(tokenIds) ||
        !Array.isArray(amounts) ||
        tokenIds.length === 0 ||
        amounts.length === 0 ||
        tokenIds.length !== amounts.length
      ) {
        console.warn('ERC1155 Batch Transfer: Invalid or inconsistent arguments after transformation.')
        return undefined
      }

      return {
        ...baseDecoding,
        type: ERC1155_BATCH_TRANSFER_TYPE,
        transferType:
          from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE,
        contractAddress: getAddress(txnData.to),
        contractType: ContractType.ERC1155,
        from: getAddress(from),
        to: getAddress(to),
        tokenIds: tokenIds,
        amounts: amounts,
        data: data,
        methodName: 'safeBatchTransferFrom'
      }
    },
    metadataFetcher: async ({ baseDecodedResult, chainID }) => {
      try {
        const result = await getTokenMetadata({
          chainID: String(chainID),
          contractAddress: baseDecodedResult.contractAddress,
          tokenIDs: baseDecodedResult.tokenIds // Fetch metadata for all token IDs in the batch
        })
        // Ensure we return an array, even if empty or undefined
        const metaArray = result.tokenMetadata || []
        return metaArray.length > 0 ? { tokenMetadata: metaArray } : undefined
      } catch (error) {
        console.error(
          `Error fetching ERC1155 batch token metadata for ${baseDecodedResult.contractAddress}:`,
          error
        )
        return undefined
      }
    }
  }

export const decoderService = new TransactionDecoderService(apiClient)

decoderService.registerDecoder(erc1155BatchTransferDecoder)
decoderService.registerDecoder(erc1155SingleTransferDecoder)
decoderService.registerDecoder(erc721TransferDecoder)
decoderService.registerDecoder(erc20TransferDecoder)
