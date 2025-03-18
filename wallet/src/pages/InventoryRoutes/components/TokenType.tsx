import { InventoryCoinTile, InventoryCoinList } from './InventoryCoin.tsx'
import { InventoryCollectibleTile, InventoryCollectibleList } from './InventoryCollectible.tsx'
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
      case 'erc20':
        return <InventoryCoinTile {...item} />
      case 'collectable':
        return <InventoryCollectibleTile {...item} />
      default:
        return <TokenTileEmpty />
    }
  }
  if (displayMode === 'list') {
    switch (item?.tokenClass) {
      case 'nativeBalance':
      case 'erc20':
        return <InventoryCoinList {...item} />
      case 'collectable':
        return <InventoryCollectibleList {...item} />

      default:
        return <TokenListItemEmpty />
    }
  }
}
