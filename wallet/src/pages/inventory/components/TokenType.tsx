import { TokenTileErc20 } from './TokenTileERC20.tsx'
import { TokenTileNativeBalance } from './TokenTileNativeBalance.tsx'
import { TokenTileCollectable } from './TokenTileCollectable.tsx'
import { TokenTileEmpty } from './TokenTileEmpty.tsx'
import type { TokenTypeProps } from '../types.ts'

// Implementation
export function TokenType({ item }: { item: TokenTypeProps | null }) {
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
