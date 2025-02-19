import type { ComponentProps } from 'react'
import type { TokenBalance, NativeTokenBalance } from '@0xsequence/indexer'
import type { ChainId, NetworkMetadata } from '@0xsequence/network'

export type TokenTileEmptyProps = ComponentProps<'div'>

export type TokenTileProps = TokenBalance & { chain: NetworkMetadata }

export type TokenTileNativeBalanceProps = NativeTokenBalance &
  NetworkMetadata & {
    chainId: ChainId
  }

export type TokenTypeProps =
  (TokenTileProps & {
    title?: string
    tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
  })
