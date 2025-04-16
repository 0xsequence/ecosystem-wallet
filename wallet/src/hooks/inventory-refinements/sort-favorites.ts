import { TokenRecord } from '../../pages/InventoryRoutes/types'

/**
 * Creates a comparator that prioritizes UUIDs in a "favorites" list.
 *
 * @param list - UUIDs to prioritize. Items not in the list come after.
 * @returns A comparator function for array sorting.
 */
export function favorites(list: string[] | null): (a: TokenRecord, b: TokenRecord) => number {
  const favorites = new Set(list ?? [])

  return (a, b) => {
    const aFav = favorites.has(a.uuid)
    const bFav = favorites.has(b.uuid)

    if (aFav && !bFav) return -1
    if (!aFav && bFav) return 1
    return 0
  }
}
