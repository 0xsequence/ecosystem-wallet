import type { ComponentProps } from 'react'
import type { TokenBalance } from '@0xsequence/indexer'
import type { NetworkMetadata } from '@0xsequence/network'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenTileProps = TokenBalance & {
  title?: string
  chain: NetworkMetadata
  nativeToken?: { symbol: string; name: string; decimals: number }
}

export type TokenTypeProps = TokenTileProps & {
  tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
}
