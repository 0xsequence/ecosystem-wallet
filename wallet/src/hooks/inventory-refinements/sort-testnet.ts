import { TokenRecord, TokenGroupRecord } from '../../pages/InventoryRoutes/types'

/**
 * Creates a comparator that sorts by testnet flag.
 *
 * @param args - Sorting order: 'asc' puts testnets last, 'desc' puts them first.
 * @returns A comparator function for array sorting.
 */
export function testnet(
  args: 'asc' | 'desc' = 'asc'
): (a: TokenRecord | TokenGroupRecord, b: TokenRecord | TokenGroupRecord) => number {
  return (a, b) => {
    const testnetA = a?.testnet ?? false
    const testnetB = b?.testnet ?? false

    if (testnetA === testnetB) return 0
    return args === 'asc' ? (testnetA ? 1 : -1) : testnetA ? -1 : 1
  }
}
