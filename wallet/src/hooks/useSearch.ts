import { useState, useMemo, createContext, useContext } from 'react'
import Fuse from 'fuse.js'
import { TokenRecord } from '../pages/InventoryRoutes/types'
import { CoinGroup } from '../pages/InventoryRoutes/helpers/useFetchInventory'

type SearchContextProps = {
  query: string
  setQuery: (query: string) => void
  filteredItems: (CoinGroup | TokenRecord | null)[]
}

export const SearchContext = createContext<SearchContextProps | null>(null)

export function useSearchValues({ items, keys }: { items: (TokenRecord | null)[]; keys: string[] }) {
  const [query, setQuery] = useState('')

  // Configure Fuse.js options
  const fuseOptions = useMemo(
    () => ({
      keys,
      threshold: 0.3, // Adjust for sensitivity
      includeScore: false,
      ignoreLocation: true // Ignores position relevance (useful for flexible matching)
    }),
    [keys]
  )

  // Create Fuse instance
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items, fuseOptions])

  // Filter items based on search query
  const filteredItems = useMemo(
    () => (query ? fuse.search(query).map(({ item }) => item) : items),
    [query, fuse, items]
  )

  return { query, setQuery, filteredItems }
}

export function useSearchFilter() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchFilter must be used within a Search Context Provider')
  }

  const { query, setQuery, filteredItems } = context

  const isSearching = query

  function filterResults(items: (TokenRecord | null)[]) {
    if (!isSearching) {
      return items
    }

    if (filteredItems.length === 0) {
      return []
    }

    return items.filter(item => filteredItems.find(result => result?.uuid === item?.uuid))
  }

  const totalResults = filteredItems.length
  const hasNoResults = isSearching && totalResults === 0

  return { filterResults, totalResults, hasNoResults, isSearching, query, setQuery }
}
