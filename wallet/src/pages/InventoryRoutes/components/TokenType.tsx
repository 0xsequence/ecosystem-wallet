import { InventoryCoinTile, InventoryCoinList } from './InventoryCoin.tsx'
import { InventoryCollectibleTile, InventoryCollectibleList } from './InventoryCollectible.tsx'
import { TokenTileEmpty, TokenListItemEmpty } from './TokenTileEmpty.tsx'
import type { TokenTypeProps } from '../types.ts'
import { InventoryCoinGroup } from './InventoryCoinGroup'
import { CoinGroup } from '../helpers/useFetchInventory'

function isCoinGroup(item: { tokenClass: TokenTypeProps['tokenClass'] }): item is CoinGroup {
  return item?.tokenClass === 'group'
}

function isTokenTypeProps(item: { tokenClass: TokenTypeProps['tokenClass'] }): item is TokenTypeProps {
  return ['nativeBalance', 'erc20', 'collectable'].includes(item?.tokenClass)
}

// Implementation
export function TokenType({
  item,
  displayMode = 'grid'
}: {
  item: CoinGroup | TokenTypeProps | null
  displayMode?: 'grid' | 'list'
}) {
  if (!item) return <TokenTileEmpty />

  if (displayMode === 'grid') {
    if (isCoinGroup(item)) {
      return <InventoryCoinGroup {...item} />
    }

    if (isTokenTypeProps(item)) {
      switch (item.tokenClass) {
        case 'nativeBalance':
        case 'erc20':
          return <InventoryCoinTile {...item} />
        case 'collectable':
          return <InventoryCollectibleTile {...item} />
      }
    }

    return <TokenTileEmpty />
  }

  // You can expand this for list mode if needed

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
