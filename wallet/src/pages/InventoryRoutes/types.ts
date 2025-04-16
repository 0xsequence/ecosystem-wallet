import type { ComponentProps } from 'react'
import type { ContractType, TokenBalance } from '@0xsequence/indexer' //ContractInfo
// import type { NetworkMetadata } from '@0xsequence/network'
import { CurrencyGroup } from '../../utils/currencyGroups/networks'
// import { TokenMetadata } from '@0xsequence/indexer'
import { NetworkMetadata } from '../../utils/currencyGroups/constants'
import { TOKEN_TYPES } from '../../utils/normalize-balances'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenRecord = TokenBalance & TokenBalanceNormalized

type TokenBalanceNormalized = {
  testnet: boolean
  prettyBalance: string
  type: 'COIN' | 'COLLECTIBLE' | 'GROUP'
  chainInfo?: NetworkMetadata
  uuid: string
  path: string
  symbol: string
  logoURI?: string
  decimals: number
}

export type UserPreferenceLocalStore =
  | {
      hideBalance: boolean | undefined
      inventoryDisplayMode: 'grid' | 'list' | undefined
      currency: string
    }
  | undefined

// export type CoinGroup = {
//   contractAddress: string
//   name: string
//   chainId: 0 // set as 0
//   symbol: string
//   decimals: number
//   imageUrl?: string
//   group?: CurrencyGroup
//   default?: boolean
//   path: string
//   uuid: string
//   balance?: string
//   type: 'GROUP'
//   testnet: boolean
//   logoURI?: string
//   prettyBalance?: string
//   chains: TokenRecord[]
// }

export type TokenGroupRecord = TokenBalanceNormalized & TokenGroup

type TokenGroup = {
  testnet: boolean
  prettyBalance: string
  type: 'COIN' | 'COLLECTIBLE' | 'GROUP'
  contractType: ContractType
  balance: string
  uuid: string
  path: string
  imageUrl?: string
  chains: TokenRecord[]
  group?: CurrencyGroup
}

export type TokenRecords = (TokenRecord | TokenGroupRecord)[]

export function isTokenGroupRecord(record: TokenRecord | TokenGroupRecord): record is TokenGroupRecord {
  return record.type === TOKEN_TYPES.GROUP
}

export function isTokenRecord(record: TokenRecord | TokenGroupRecord): record is TokenRecord {
  return record.type !== TOKEN_TYPES.GROUP
}

// export type TokenRecord = {
//   contractAddress: string
//   accountAddress: string
//   balance: string
//   blockHash: string
//   blockNumber: number
//   uniqueCollectibles: string
//   isSummary: boolean
//   symbol: string
//   chainId: string
//   logoURI?: string
//   decimals: number
//   name?: string
//   uuid: string
//   path: string
//   tokenId?: string
//   // token: { symbol: string; name: string; decimals: number; logoURI?: string }
//   group?: CurrencyGroup
//   nativeToken?: { symbol: string; name: string; decimals: number }
//   chainInfo?: NetworkMetadata
//   contractInfo?: ContractInfo
//   tokenMetadata?: TokenMetadata
//   testnet: boolean
//   prettyBalance: string
//   contractType: 'NATIVE' | 'ERC20' | 'ERC1155' | 'ERC721'
//   type: 'COIN' | 'COLLECTIBLE' | 'GROUP'
// }
