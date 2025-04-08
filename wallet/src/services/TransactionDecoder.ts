/* eslint-disable @typescript-eslint/no-explicit-any */
import { commons } from '@0xsequence/core'
import { ContractInfo, ContractType, TokenMetadata, TxnTransferType } from '@0xsequence/indexer'

import { getAddress, zeroAddress, Hex, slice, toHex, decodeFunctionData, Abi } from 'viem'

import { getContractInfoBatch, getTokenMetadata } from '../utils/metadata'

// --- Type Definitions ---
// Use the TransactionEncoded type from @0xsequence/core for internal consistency
type TransactionEncoded = commons.transaction.TransactionEncoded
type Args = Record<string, any>
type DecodingType = string

/**
 * Represents a flexible transaction input structure compatible with
 * common fields from ethers.js or viem transaction requests.
 */
interface DecodeTransactionInput {
  /** Target address (contract or EOA) */
  to?: string | null | undefined
  /** Alternative to 'to', used by Sequence types */
  target?: string | undefined
  /** Transaction data (calldata), should be a hex string */
  data?: string | undefined
  /** Value to send (in wei), accepts various numeric types */
  value?: string | number | bigint | undefined
  /** For meta-transactions: Whether the call is a delegateCall */
  delegateCall?: boolean | undefined
  /** For meta-transactions: Whether to revert if the sub-call fails */
  revertOnError?: boolean | undefined
  /** Gas limit for the transaction */
  gasLimit?: string | number | bigint | undefined

  // Note: Fields like nonce, gasPrice, maxFeePerGas etc. are ignored
  // as they are not directly used in function call decoding.
}

interface BaseDecoding {
  type: DecodingType
  signature?: string // Optional, using function name as default
  byteSignature: Hex
  methodName: string
  target: string
  value: string // Value is stored as string representation of bigint (wei)
}

interface DecoderDefinition<TDecoded extends BaseDecoding, TDecodedArgs extends Args = Args> {
  type: DecodingType
  abi: Abi // ABI needed for viem decoding
  byteSignatures: Hex[] // Used for quick matching
  matcher?: (txn: TransactionEncoded) => boolean
  decoder: (params: {
    transaction: TransactionEncoded // The normalized transaction being decoded
    decodedArgs: TDecodedArgs // Arguments decoded by viem (after transformer)
    baseDecoding: BaseDecoding
    fromAddress: string
  }) => TDecoded | undefined
  // ArgsTransformer now takes viem's output and shapes it into TDecodedArgs
  argsTransformer?: (rawViemArgs: readonly any[] | Record<string, any>) => TDecodedArgs
  metadataFetcher?: (params: {
    baseDecodedResult: TDecoded
    chainID: string | number
  }) => Promise<Partial<TDecoded> | undefined> // Returns only metadata fields
}

// --- ABIs for Specific Decoders ---
const erc20Abi = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

const erc721Abi = [
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    // Version with data
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

const erc1155Abi = [
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_id', type: 'uint256' },
      { name: '_value', type: 'uint256' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_ids', type: 'uint256[]' },
      { name: '_values', type: 'uint256[]' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      }
    ],
    name: 'batchMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

// --- Native Transfer Decoder ---
const NATIVE_TRANSFER_TYPE = 'native-transfer'
interface NativeTransferDecoding extends BaseDecoding {
  type: typeof NATIVE_TRANSFER_TYPE
  transferType: TxnTransferType
  contractAddress: string // Always zeroAddress
  contractType: ContractType.NATIVE
  from: string
  to: string
  // value is already in BaseDecoding
}
const nativeTransferDecoder: DecoderDefinition<NativeTransferDecoding> = {
  type: NATIVE_TRANSFER_TYPE,
  abi: [], // No ABI
  byteSignatures: [], // Matcher is sufficient
  // Matcher now operates on TransactionEncoded after normalization
  matcher: (transaction: TransactionEncoded) =>
    (!transaction.data || transaction.data === '0x') && BigInt(transaction.value ?? 0) > 0n,
  decoder: ({ baseDecoding, transaction, fromAddress }) => ({
    ...baseDecoding,
    type: NATIVE_TRANSFER_TYPE,
    transferType: TxnTransferType.SEND, // Wallet is always the sender in this context
    contractAddress: zeroAddress,
    contractType: ContractType.NATIVE,
    from: fromAddress,
    to: getAddress(transaction.target), // target is already checksummed by normalize
    value: baseDecoding.value, // Get value from baseDecoding
    methodName: 'nativeTokenTransfer' // Static name
  })
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
  contractInfo?: ContractInfo
}
interface ERC20TransferRawArgs {
  _to: Hex
  _value: bigint
}
interface ERC20TransferArgs {
  recipient: string
  amount: string
}
const erc20TransferDecoder: DecoderDefinition<ERC20TransferDecoding, ERC20TransferArgs> = {
  type: 'erc20-transfer',
  abi: erc20Abi,
  byteSignatures: ['0xa9059cbb'],
  argsTransformer: (rawViemArgs): ERC20TransferArgs => {
    const args = rawViemArgs as unknown as ERC20TransferRawArgs
    return {
      recipient: getAddress(args._to ?? (rawViemArgs as any[])[0] ?? zeroAddress),
      amount: (args._value ?? (rawViemArgs as any[])[1] ?? 0n).toString()
    }
  },
  decoder: ({ transaction, decodedArgs, baseDecoding, fromAddress }) => {
    const { recipient, amount } = decodedArgs
    if (!recipient || recipient === zeroAddress || amount === undefined || amount === '0') {
      return undefined
    }
    return {
      ...baseDecoding,
      type: 'erc20-transfer',
      transferType: TxnTransferType.SEND,
      contractAddress: getAddress(transaction.target),
      contractType: ContractType.ERC20,
      from: fromAddress,
      to: recipient,
      amount: amount
    }
  },
  metadataFetcher: async ({ baseDecodedResult, chainID }) => {
    try {
      const contractAddress = getAddress(baseDecodedResult.contractAddress)
      const result = await getContractInfoBatch({
        chainID: String(chainID),
        contractAddresses: [contractAddress]
      })
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
  tokenMetadata?: TokenMetadata
}
interface ERC721TransferRawArgs {
  _from: Hex
  _to: Hex
  _tokenId: bigint
  _data?: Hex
}
interface ERC721TransferArgs {
  from: string
  to: string
  tokenId: string
}
const erc721TransferDecoder: DecoderDefinition<ERC721TransferDecoding, ERC721TransferArgs> = {
  type: ERC721_TRANSFER_TYPE,
  abi: erc721Abi,
  byteSignatures: ['0x23b872dd', '0x42842e0e', '0xb88d4fde'],
  argsTransformer: (rawViemArgs): ERC721TransferArgs => {
    const args = rawViemArgs as unknown as ERC721TransferRawArgs
    return {
      from: getAddress(args._from ?? (rawViemArgs as any[])[0] ?? zeroAddress),
      to: getAddress(args._to ?? (rawViemArgs as any[])[1] ?? zeroAddress),
      tokenId: (args._tokenId ?? (rawViemArgs as any[])[2] ?? 0n).toString()
    }
  },
  decoder: ({ transaction, decodedArgs, baseDecoding, fromAddress }) => {
    const { from, to, tokenId } = decodedArgs
    if (!from || from === zeroAddress || !to || to === zeroAddress || tokenId === undefined) {
      return undefined
    }
    const transferType =
      from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE
    return {
      ...baseDecoding,
      type: ERC721_TRANSFER_TYPE,
      transferType: transferType,
      contractAddress: getAddress(transaction.target),
      contractType: ContractType.ERC721,
      from: from,
      to: to,
      tokenId: tokenId
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
const ERC1155_BATCH_MINT_TYPE = 'erc1155-batch-mint'

// --- Single Transfer ---
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
  tokenMetadata?: TokenMetadata
}
interface ERC1155SingleTransferRawArgs {
  _from: Hex
  _to: Hex
  _id: bigint
  _value: bigint
  _data: Hex
}
interface ERC1155SingleTransferArgs {
  from: string
  to: string
  tokenId: string
  amount: string
  data: string
}
const erc1155SingleTransferDecoder: DecoderDefinition<
  ERC1155SingleTransferDecoding,
  ERC1155SingleTransferArgs
> = {
  type: ERC1155_SINGLE_TRANSFER_TYPE,
  abi: erc1155Abi,
  byteSignatures: ['0xf242432a'],
  argsTransformer: (rawViemArgs): ERC1155SingleTransferArgs => {
    const args = rawViemArgs as unknown as ERC1155SingleTransferRawArgs
    return {
      from: getAddress(args._from ?? (rawViemArgs as any[])[0] ?? zeroAddress),
      to: getAddress(args._to ?? (rawViemArgs as any[])[1] ?? zeroAddress),
      tokenId: (args._id ?? (rawViemArgs as any[])[2] ?? 0n).toString(),
      amount: (args._value ?? (rawViemArgs as any[])[3] ?? 0n).toString(),
      data: args._data ?? (rawViemArgs as any[])[4] ?? '0x'
    }
  },
  decoder: ({ transaction, decodedArgs, baseDecoding, fromAddress }) => {
    const { from, to, tokenId, amount, data } = decodedArgs
    if (
      !from ||
      from === zeroAddress ||
      !to ||
      to === zeroAddress ||
      tokenId === undefined ||
      amount === undefined ||
      amount === '0'
    ) {
      return undefined
    }
    const transferType =
      from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE
    return {
      ...baseDecoding,
      type: ERC1155_SINGLE_TRANSFER_TYPE,
      transferType: transferType,
      contractAddress: getAddress(transaction.target),
      contractType: ContractType.ERC1155,
      from: from,
      to: to,
      tokenId: tokenId,
      amount: amount,
      data: data
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

// --- Batch Transfer ---
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
  tokenMetadata?: TokenMetadata[]
}
interface ERC1155BatchTransferRawArgs {
  _from: Hex
  _to: Hex
  _ids: readonly bigint[]
  _values: readonly bigint[]
  _data: Hex
}
interface ERC1155BatchTransferArgs {
  from: string
  to: string
  tokenIds: string[]
  amounts: string[]
  data: string
}
const erc1155BatchTransferDecoder: DecoderDefinition<ERC1155BatchTransferDecoding, ERC1155BatchTransferArgs> =
  {
    type: ERC1155_BATCH_TRANSFER_TYPE,
    abi: erc1155Abi,
    byteSignatures: ['0x2eb2c2d6'],
    argsTransformer: (rawViemArgs): ERC1155BatchTransferArgs => {
      const args = rawViemArgs as unknown as ERC1155BatchTransferRawArgs
      const idsRaw = args._ids ?? (rawViemArgs as any[])[2] ?? []
      const valuesRaw = args._values ?? (rawViemArgs as any[])[3] ?? []
      return {
        from: getAddress(args._from ?? (rawViemArgs as any[])[0] ?? zeroAddress),
        to: getAddress(args._to ?? (rawViemArgs as any[])[1] ?? zeroAddress),
        tokenIds: Array.isArray(idsRaw) ? idsRaw.map(id => id.toString()) : [],
        amounts: Array.isArray(valuesRaw) ? valuesRaw.map(v => v.toString()) : [],
        data: args._data ?? (rawViemArgs as any[])[4] ?? '0x'
      }
    },
    decoder: ({ transaction, decodedArgs, baseDecoding, fromAddress }) => {
      const { from, to, tokenIds, amounts, data } = decodedArgs
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
        return undefined
      }
      const transferType =
        from.toLowerCase() === fromAddress.toLowerCase() ? TxnTransferType.SEND : TxnTransferType.RECEIVE
      return {
        ...baseDecoding,
        type: ERC1155_BATCH_TRANSFER_TYPE,
        transferType: transferType,
        contractAddress: getAddress(transaction.target),
        contractType: ContractType.ERC1155,
        from: from,
        to: to,
        tokenIds: tokenIds,
        amounts: amounts,
        data: data
      }
    },
    metadataFetcher: async ({ baseDecodedResult, chainID }) => {
      try {
        const result = await getTokenMetadata({
          chainID: String(chainID),
          contractAddress: baseDecodedResult.contractAddress,
          tokenIDs: baseDecodedResult.tokenIds
        })
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

// --- Batch Mint ---
interface ERC1155BatchMintDecoding extends BaseDecoding {
  type: typeof ERC1155_BATCH_MINT_TYPE
  contractAddress: string
  contractType: ContractType.ERC1155
  tokenIds: string[]
  amounts: string[]
  tokenMetadata?: TokenMetadata[]
}
interface ERC1155BatchMintRawArgs {
  tokenIds: readonly bigint[]
  amounts: readonly bigint[]
}
interface ERC1155BatchMintArgs {
  tokenIds: string[]
  amounts: string[]
}
const erc1155BatchMintDecoder: DecoderDefinition<ERC1155BatchMintDecoding, ERC1155BatchMintArgs> = {
  type: ERC1155_BATCH_MINT_TYPE,
  abi: erc1155Abi,
  byteSignatures: ['0x688d2232'], // Corrected signature for batchMint(uint256[],uint256[])
  argsTransformer: (rawViemArgs): ERC1155BatchMintArgs => {
    const args = rawViemArgs as unknown as ERC1155BatchMintRawArgs
    const idsRaw = args.tokenIds ?? (rawViemArgs as any[])[0] ?? []
    const amountsRaw = args.amounts ?? (rawViemArgs as any[])[1] ?? []
    return {
      tokenIds: Array.isArray(idsRaw) ? idsRaw.map(id => id.toString()) : [],
      amounts: Array.isArray(amountsRaw) ? amountsRaw.map(v => v.toString()) : []
    }
  },
  decoder: ({ transaction, decodedArgs, baseDecoding }) => {
    const { tokenIds, amounts } = decodedArgs
    if (
      !Array.isArray(tokenIds) ||
      !Array.isArray(amounts) ||
      tokenIds.length === 0 ||
      amounts.length === 0 ||
      tokenIds.length !== amounts.length
    ) {
      return undefined
    }
    // Minting is always considered a RECEIVE from the perspective of the contract caller (the wallet)
    return {
      ...baseDecoding,
      type: ERC1155_BATCH_MINT_TYPE,
      contractAddress: getAddress(transaction.target),
      contractType: ContractType.ERC1155,
      tokenIds: tokenIds,
      amounts: amounts
    }
  },
  metadataFetcher: async ({ baseDecodedResult, chainID }) => {
    try {
      const result = await getTokenMetadata({
        chainID: String(chainID),
        contractAddress: baseDecodedResult.contractAddress,
        tokenIDs: baseDecodedResult.tokenIds
      })
      const metaArray = result.tokenMetadata || []
      return metaArray.length > 0 ? { tokenMetadata: metaArray } : undefined
    } catch (error) {
      console.error(
        `Error fetching ERC1155 batch mint token metadata for ${baseDecodedResult.contractAddress}:`,
        error
      )
      return undefined
    }
  }
}

export type DecodedTransactionResult =
  | NativeTransferDecoding
  | ERC20TransferDecoding
  | ERC721TransferDecoding
  | ERC1155SingleTransferDecoding
  | ERC1155BatchTransferDecoding
  | ERC1155BatchMintDecoding
  | BaseDecoding // Fallback for unknown/undecoded

export class TransactionDecoder {
  private decoders: Array<DecoderDefinition<any, any>> = [
    nativeTransferDecoder,
    erc20TransferDecoder,
    erc721TransferDecoder,
    erc1155SingleTransferDecoder,
    erc1155BatchTransferDecoder,
    erc1155BatchMintDecoder
  ]

  constructor() {}

  public registerDecoder<TDecoded extends BaseDecoding, TInputArgs extends Args>(
    decoder: DecoderDefinition<TDecoded, TInputArgs>
  ): void {
    if (decoder.type !== NATIVE_TRANSFER_TYPE && (!decoder.abi || decoder.abi.length === 0)) {
      console.warn(
        `Decoder registered for type "${decoder.type}" without an ABI. Decoding arguments will not be possible.`
      )
    }
    this.decoders.push(decoder)
  }

  public getSupportedTypes(): DecodingType[] {
    return this.decoders.map(d => d.type)
  }

  /**
   * Decodes a list of transactions based on registered decoders.
   * Accepts flexible input objects compatible with ethers.js/viem.
   */
  public async decodeTransactions(
    accountAddress: string,
    chainID: string | number,
    transactions: Array<DecodeTransactionInput>
  ): Promise<DecodedTransactionResult[]> {
    const fromAddress = getAddress(accountAddress)
    const results: DecodedTransactionResult[] = []

    // Normalize input transactions to the internal TransactionEncoded format
    const encodedTxns = this.normalizeTransactions(transactions)

    for (const tx of encodedTxns) {
      const decoded = await this.decodeSingleTransaction(tx, fromAddress, chainID)
      if (decoded) {
        results.push(decoded)
      }
    }

    return results
  }

  /**
   * Converts flexible transaction inputs into the internal TransactionEncoded format.
   */
  // MODIFIED: Implementation updated to handle DecodeTransactionInput
  private normalizeTransactions(transactions: Array<DecodeTransactionInput>): TransactionEncoded[] {
    return transactions.map(txn => {
      // Determine target address (prefer 'target', fallback to 'to')
      const targetAddress = txn.target ?? txn.to ?? zeroAddress
      // Ensure address is checksummed, handle null/zeroAddress
      const checksummedTarget =
        targetAddress === zeroAddress || targetAddress === null ? zeroAddress : getAddress(targetAddress)

      // Ensure data is a valid Hex string, default to '0x'
      const dataHex =
        txn.data && typeof txn.data === 'string' && txn.data.startsWith('0x') ? (txn.data as Hex) : '0x'

      // Convert value to bigint, handling potential errors, then format as Hex
      let valueBigInt: bigint = 0n
      if (txn.value !== undefined && txn.value !== null) {
        try {
          valueBigInt = BigInt(txn.value)
        } catch (e) {
          console.warn('Could not parse transaction value:', txn.value, e)
        }
      }
      const valueHex = toHex(valueBigInt)

      // Convert gasLimit to bigint, handling potential errors
      let gasLimitBigInt: bigint = 0n
      if (txn.gasLimit !== undefined && txn.gasLimit !== null) {
        try {
          gasLimitBigInt = BigInt(txn.gasLimit)
        } catch (e) {
          console.warn('Could not parse transaction gasLimit:', txn.gasLimit, e)
        }
      }

      // Return the object conforming to the internal TransactionEncoded structure
      return {
        delegateCall: txn.delegateCall ?? false,
        revertOnError: txn.revertOnError ?? false,
        gasLimit: gasLimitBigInt, // Ensure TransactionEncoded expects bigint for gasLimit
        target: checksummedTarget,
        value: valueHex, // Ensure TransactionEncoded expects hex for value
        data: dataHex
      }
    })
  }

  // Decodes a single, normalized transaction using registered decoders
  private async decodeSingleTransaction(
    transaction: TransactionEncoded, // Expects the normalized format
    fromAddress: string,
    chainID: string | number
  ): Promise<DecodedTransactionResult | undefined> {
    // Ensure data is a valid Hex string (already done in normalize, but safe check)
    const dataHex = (transaction.data && transaction.data.startsWith('0x') ? transaction.data : '0x') as Hex

    const txByteSignature: Hex = dataHex.length >= 10 ? (slice(dataHex, 0, 4).toLowerCase() as Hex) : '0x'
    const targetAddress = getAddress(transaction.target) // target is already checksummed

    // Base information available for any transaction
    const baseDecoding: Omit<BaseDecoding, 'type' | 'methodName' | 'signature'> = {
      byteSignature: txByteSignature,
      target: targetAddress,
      value: BigInt(transaction.value ?? 0).toString() // Use normalized value (hex)
    }

    // --- Try Native Transfer Matcher First ---
    // Pass the *normalized* transaction to the matcher
    if (nativeTransferDecoder.matcher && nativeTransferDecoder.matcher(transaction)) {
      const nativeResult = nativeTransferDecoder.decoder({
        transaction,
        decodedArgs: {},
        baseDecoding: {
          ...baseDecoding,
          type: NATIVE_TRANSFER_TYPE,
          methodName: 'nativeTokenTransfer',
          signature: ''
        },
        fromAddress
      })
      return nativeResult as DecodedTransactionResult | undefined
    }

    // --- Iterate through other decoders ---
    for (const decoder of this.decoders) {
      if (decoder.type === NATIVE_TRANSFER_TYPE) continue

      const decoderSigs = decoder.byteSignatures.map(sig => sig.toLowerCase())
      const isByteSigMatch = decoderSigs.includes(txByteSignature)

      if (isByteSigMatch && decoder.abi && decoder.abi.length > 0) {
        try {
          const { functionName, args: rawViemArgs } = decodeFunctionData({
            abi: decoder.abi,
            data: dataHex
          })

          let transformedArgs = rawViemArgs as Args
          if (decoder.argsTransformer) {
            try {
              transformedArgs = decoder.argsTransformer(rawViemArgs || [])
            } catch (error) {
              console.error(
                `Error transforming args for decoder ${decoder.type} (${functionName}):`,
                error,
                'Raw args:',
                rawViemArgs
              )
              continue
            }
          }

          const currentBaseDecoding: BaseDecoding = {
            ...baseDecoding,
            type: decoder.type,
            methodName: functionName,
            signature: functionName // Use functionName as default signature identifier
          }

          let decodedResult = decoder.decoder({
            transaction: transaction,
            decodedArgs: transformedArgs,
            baseDecoding: currentBaseDecoding,
            fromAddress
          })

          if (!decodedResult) {
            continue
          }

          if (decoder.metadataFetcher) {
            try {
              const metadataFields = await decoder.metadataFetcher({
                baseDecodedResult: decodedResult,
                chainID
              })
              if (metadataFields) {
                decodedResult = { ...decodedResult, ...metadataFields }
              }
            } catch (error) {
              console.error(`Error fetching metadata for decoder ${decoder.type}:`, error)
            }
          }

          return decodedResult
        } catch (e) {
          if (
            e instanceof Error &&
            (e.message.includes('data is too short') ||
              e.message.includes('Cannot decode zero data') ||
              e.message.includes('Invalid ABI resolution'))
          ) {
            // Ignore common decoding failures
          } else if (e instanceof Error && e.message.includes('Function not found')) {
            console.warn(
              `Viem function not found for ${decoder.type} selector ${txByteSignature} in provided ABI.`
            )
          } else {
            console.error(
              `Unexpected Viem error during decoding for ${decoder.type} (${txByteSignature}):`,
              e
            )
          }
        }
      }
    }

    // --- Fallback for Unknown Transactions ---
    return {
      ...baseDecoding,
      type: 'unknown',
      methodName: 'unknown',
      signature: ''
    }
  }
}

export const txnDecoder = new TransactionDecoder()
