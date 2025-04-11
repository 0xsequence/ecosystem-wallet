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
  // token: { symbol: string; name: string; decimals: number; logoURI?: string }
  group?: string
  nativeToken?: { symbol: string; name: string; decimals: number }
  chainInfo?: NetworkMetadata
  contractInfo?: ContractInfo
  TokenMetadata?: TokenMetadata
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

export type CoinGroup = currencyDefinition & {
  balance: string
  chains: { name?: string; title?: string; chainId: number }[]
  testnet: boolean
}
