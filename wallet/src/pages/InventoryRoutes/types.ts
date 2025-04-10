import type { ComponentProps } from 'react'
import type { ContractInfo, TokenBalance } from '@0xsequence/indexer'
import type { ChainId, NetworkMetadata } from '@0xsequence/network'
import { currencyDefinition } from '../../utils/currencyGroups/networks'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenTypeProps = TokenBalance & {
  symbol: string
  chainId: ChainId
  logoURI?: string
  decimals: number
  name?: string
  contractAddress: string
  balance?: string
  uuid: string
  token: { symbol: string; name: string; decimals: number; logoURI?: string }
  group?: string
  nativeToken?: { symbol: string; name: string; decimals: number }
  chainInfo?: NetworkMetadata
  contractInfo?: ContractInfo
  testnet: boolean
  prettyBalance: string
  type: 'COIN' | 'COLLECTIBLE' | 'GROUP'
}

export type UserPreferenceLocalStore =
  | {
      hideBalance: boolean | undefined
      inventoryDisplayMode: 'grid' | 'list' | undefined
      currency: string
    }
  | undefined

export type CoinGroup = currencyDefinition & {
  balance: string
  chains: { name?: string; title?: string; chainId: number }[]
  testnet: boolean
}
