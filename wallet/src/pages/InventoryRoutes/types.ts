import type { ComponentProps } from 'react'
import type { ContractInfo, TokenBalance } from '@0xsequence/indexer'
import type { NetworkMetadata } from '@0xsequence/network'
import { CurrencyGroup } from '../../utils/currencyGroups/networks'
import { TokenMetadata } from '@0xsequence/indexer'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenRecord = {
  contractAddress: string
  accountAddress: string
  balance: string
  blockHash: string
  blockNumber: number
  uniqueCollectibles: string
  isSummary: boolean
  symbol: string
  chainId: string
  logoURI?: string
  decimals: number
  name?: string
  uuid: string
  path: string
  tokenId?: string
  // token: { symbol: string; name: string; decimals: number; logoURI?: string }
  group?: CurrencyGroup
  nativeToken?: { symbol: string; name: string; decimals: number }
  chainInfo?: NetworkMetadata
  contractInfo?: ContractInfo
  tokenMetadata?: TokenMetadata
  testnet: boolean
  prettyBalance: string
  contractType: 'NATIVE' | 'ERC20' | 'ERC1155' | 'ERC721'
  type: 'COIN' | 'COLLECTIBLE' | 'GROUP'
}

export type UserPreferenceLocalStore =
  | {
      hideBalance: boolean | undefined
      inventoryDisplayMode: 'grid' | 'list' | undefined
      currency: string
    }
  | undefined

export type CoinGroup = {
  contractAddress: string
  name: string
  chainId: 0 // set as 0
  symbol: string
  decimals: number
  imageUrl?: string
  group?: CurrencyGroup
  default?: boolean
  path: string
  uuid: string
  balance?: string
  type: 'GROUP'
  testnet: boolean
  logoURI?: string
  prettyBalance?: string
  chains: TokenRecord[]
}
