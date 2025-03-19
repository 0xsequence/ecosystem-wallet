import type { ComponentProps } from 'react'
import type { TokenBalance } from '@0xsequence/indexer'
import type { NetworkMetadata } from '@0xsequence/network'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenTileProps = TokenBalance & {
  title?: string
  name?: string
  chain?: NetworkMetadata
  uuid: string
  token: { symbol: string; name: string; decimals: number; logoURI?: string }
  nativeToken?: { symbol: string; name: string; decimals: number }
}

export type TokenTypeProps = TokenTileProps & {
  tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
}

export type UserPreferenceLocalStore =
  | {
      hideBalance: boolean | undefined
      inventoryDisplayMode: 'grid' | 'list' | undefined
      currency: string
    }
  | undefined
