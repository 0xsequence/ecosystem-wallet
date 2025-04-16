import { TokenRecord } from '../../pages/InventoryRoutes/types'

/**
 * Creates a comparator that sorts items by balance.
 *
 * @param args - Sorting order: 'asc', 'desc', 'lowToHigh', or 'highToLow'.
 * @returns A comparator function for array sorting.
 */
export function balance(
  args: 'asc' | 'desc' | 'lowToHigh' | 'highToLow' = 'desc'
): (a: TokenRecord, b: TokenRecord) => number {
  const normalized = args === 'lowToHigh' ? 'asc' : args === 'highToLow' ? 'desc' : args

  return (a, b) => {
    const aBal = BigInt(a.balance ?? '0')
    const bBal = BigInt(b.balance ?? '0')
    return normalized === 'desc' ? Number(bBal - aBal) : Number(aBal - bBal)
  }
}
