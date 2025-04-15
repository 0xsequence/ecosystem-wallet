import type { ComponentProps } from 'react'
import type { ContractInfo } from '@0xsequence/indexer'
import type { ChainId, NetworkMetadata } from '@0xsequence/network'
import { currencyDefinition } from '../../utils/currencyGroups/networks'
import { TokenMetadata } from '@0xsequence/indexer'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenTypeProps = {
  symbol: string
  chainId: ChainId
  logoURI?: string
  decimals: number
  name?: string
  contractAddress: string
  balance?: string
  uuid: string
  path: string
  // token: { symbol: string; name: string; decimals: number; logoURI?: string }
  group?: {
    contractAddress: string
    name: string
    symbol: string
    decimals: number
    imageUrl: string
    default: boolean
    group: string
  }
  nativeToken?: { symbol: string; name: string; decimals: number }
  chainInfo?: NetworkMetadata
  contractInfo?: ContractInfo
  tokenMetadata?: TokenMetadata
  testnet: boolean
  prettyBalance: string
  contractType: 'NATIVE' | 'ERC20' | 'ERC1155' | 'ERC721'
  type: 'COIN' | 'COLLECTIBLE' | 'GROUP'
  chains?: TokenTypeProps[]
}

export type UserPreferenceLocalStore =
  | {
      hideBalance: boolean | undefined
      inventoryDisplayMode: 'grid' | 'list' | undefined
      currency: string
    }
  | undefined

export type CoinGroup = currencyDefinition & {
  contractAddress: string
  name: string
  symbol: string
  decimals: number
  imageUrl: string
  default: boolean
  group: string
  path: string
  uuid: string
  balance: bigint | string
  type: 'GROUP'
  testnet: boolean
  logoURI: string
  prettyBalance: string
  chains: TokenTypeProps[]
}
