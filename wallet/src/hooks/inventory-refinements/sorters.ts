import { type } from './sort-type'
import { balance } from './sort-balance'
import { testnet } from './sort-testnet'
import { favorites } from './sort-favorites'
import { TokenRecord } from '../../pages/InventoryRoutes/types'

export type SortArgs = {
  type: string[] // custom order
  balance: 'asc' | 'desc' | 'lowToHigh' | 'highToLow'
  testnet: 'asc' | 'desc'
  favorites: string[] | null
}

export type SortFns = {
  [K in keyof SortArgs]: (args: SortArgs[K]) => (a: TokenRecord, b: TokenRecord) => number
}
export type SortKeys = keyof SortArgs

/**
 * A collection of sort functions that return comparator callbacks for array sorting.
 */
export const sort: SortFns = {
  type,
  balance,
  testnet,
  favorites
}
