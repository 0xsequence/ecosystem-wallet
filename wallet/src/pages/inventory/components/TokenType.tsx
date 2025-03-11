import { TokenTileErc20, TokenListItemErc20 } from './TokenTileERC20.tsx'
import { TokenTileNativeBalance, TokenListItemNativeBalance } from './TokenTileNativeBalance.tsx'
import { TokenTileCollectable, TokenListItemCollectable } from './TokenTileCollectable.tsx'
import { TokenTileEmpty, TokenListItemEmpty } from './TokenTileEmpty.tsx'
import type { TokenTypeProps } from '../types.ts'

// Implementation
export function TokenType({
  item,
  displayMode = 'grid'
}: {
  item: TokenTypeProps | null
  displayMode?: 'grid' | 'list'
}) {
  if (displayMode === 'grid') {
    switch (item?.tokenClass) {
      case 'nativeBalance':
        return <TokenTileNativeBalance {...item} />
      case 'collectable':
        return <TokenTileCollectable {...item} />
      case 'erc20':
        return <TokenTileErc20 {...item} />
      default:
        return <TokenTileEmpty />
    }
  }
  if (displayMode === 'list') {
    switch (item?.tokenClass) {
      case 'nativeBalance':
        return <TokenListItemNativeBalance {...item} />
      case 'collectable':
        return <TokenListItemCollectable {...item} />
      case 'erc20':
        return <TokenListItemErc20 {...item} />
      default:
        return <TokenListItemEmpty />
    }
  }
}
