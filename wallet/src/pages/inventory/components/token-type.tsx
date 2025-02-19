import { TokenTileErc20 } from './token-tile-erc-20'
import { TokenTileNativeBalance } from './token-tile-native-balance.tsx'
import { TokenTileCollectable } from './token-tile-collectable'
import { TokenTileEmpty } from './token-tile-empty.tsx'
import type { TokenTypeProps } from '../types'

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
