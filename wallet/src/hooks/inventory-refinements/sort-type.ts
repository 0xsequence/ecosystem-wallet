import { TokenGroupRecord, TokenRecord } from '../../pages/InventoryRoutes/types'

/**
 * Creates a comparator that sorts items based on a custom type order.
 *
 * @param order - Array of token types in preferred order.
 * @returns A comparator function for array sorting.
 */
export function type(
  order: string[]
): (a: TokenRecord | TokenGroupRecord, b: TokenRecord | TokenGroupRecord) => number {
  const typeRank = new Map(order.map((type, i) => [type.toUpperCase(), i]))

  return (a, b) => {
    const aType = a?.type?.toString().toUpperCase() ?? ''
    const bType = b?.type?.toString().toUpperCase() ?? ''

    const rankA = typeRank.get(aType) ?? Number.MAX_SAFE_INTEGER
    const rankB = typeRank.get(bType) ?? Number.MAX_SAFE_INTEGER

    return rankA - rankB
  }
}
