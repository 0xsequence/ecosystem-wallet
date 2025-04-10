import { InventoryCoinTile, InventoryCoinList } from './InventoryCoin.tsx'
import { InventoryCollectibleTile, InventoryCollectibleList } from './InventoryCollectible.tsx'
import { TokenTileEmpty, TokenListItemEmpty } from './TokenTileEmpty.tsx'
import type { TokenTypeProps } from '../types.ts'
import { InventoryCoinGroup } from './InventoryCoinGroup'
import { CoinGroup } from '../helpers/useFetchInventory'
import { TOKEN_TYPES } from '../../../utils/normalize-balances'

function isCoinGroup(item: { type: TokenTypeProps['type'] }): item is CoinGroup {
  return item?.type === TOKEN_TYPES.GROUP
}

function isTokenTypeProps(item: { type: TokenTypeProps['type'] }): item is TokenTypeProps {
  return Object.keys(TOKEN_TYPES).includes(item?.type)
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

  if (displayMode === 'list') {
    switch (item?.type) {
      case 'NATIVE':
      case 'ERC20':
        return <InventoryCoinList {...item} />
      case 'ERC721':
      case 'ERC1155':
        return <InventoryCollectibleList {...item} />

      default:
        return <TokenListItemEmpty />
    }
  }
}
