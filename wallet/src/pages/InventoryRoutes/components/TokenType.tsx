import { InventoryCoinTile, InventoryCoinList } from './InventoryCoin.tsx'
import { InventoryCollectibleTile, InventoryCollectibleList } from './InventoryCollectible.tsx'
import { TokenTileEmpty, TokenListItemEmpty } from './TokenTileEmpty.tsx'
import type { TokenGroupRecord, TokenRecord } from '../types.ts'
import { InventoryCoinGroup } from './InventoryCoinGroup'
import { TOKEN_TYPES } from '../../../utils/normalize-balances'
import { isTokenGroupRecord, isTokenRecord } from '../types'

// Implementation
export function TokenType({
  item,
  displayMode = 'grid'
}: {
  item: TokenGroupRecord | TokenRecord | null
  displayMode?: 'grid' | 'list'
}) {
  if (!item) return <TokenTileEmpty />

  if (displayMode === 'grid') {
    if (isTokenGroupRecord(item)) {
      return <InventoryCoinGroup {...item} />
    }

    if (isTokenRecord(item)) {
      switch (item.type) {
        case TOKEN_TYPES.COIN:
          return <InventoryCoinTile {...item} />
        case TOKEN_TYPES.COLLECTIBLE:
          return <InventoryCollectibleTile {...item} />
      }
    }

    return <TokenTileEmpty />
  }

  // You can expand this for list mode if needed

  if (displayMode === 'list' && !isTokenGroupRecord(item)) {
    switch (item?.type) {
      case TOKEN_TYPES.COIN:
        return <InventoryCoinList {...item} />
      case TOKEN_TYPES.COLLECTIBLE:
        return <InventoryCollectibleList {...item} />

      default:
        return <TokenListItemEmpty />
    }
  }
}
