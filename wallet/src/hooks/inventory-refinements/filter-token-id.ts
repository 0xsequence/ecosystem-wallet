import { TokenRecord } from '../../pages/InventoryRoutes/types'

/**
 * Filters inventory values by token ID(s).
 *
 * @param values - Inventory list to filter.
 * @param tokenId - A single token ID or an array of token IDs to match against.
 * @returns Filtered list of inventory items with matching token IDs, or an empty array if none match.
 */
export function tokenId(values?: TokenRecord[], tokenId?: string | string[]): TokenRecord[] {
  if (!tokenId || !values) {
    return []
  }

  const tokenIds = Array.isArray(tokenId) ? tokenId : [tokenId]

  return values.filter(item => {
    const id = item.tokenMetadata?.tokenId
    return typeof id === 'string' && tokenIds.includes(id)
  })
}
