import { useMemo, useState } from 'react'
import { TokenTypeProps } from '../pages/InventoryRoutes/types'
import Fuse from 'fuse.js'
import { FUSE_OPTIONS } from '../constants'
import { filter } from './inventory-refinements/filters'
import { sort } from './inventory-refinements/sorters'
import { organize } from './inventory-refinements/organizers'

type FilterKey = keyof typeof filter // 'type' | 'chain' | 'contract'
type SortKey = keyof typeof sort
type OrganizerKey = keyof typeof organize

interface RefinersState {
  sort: Record<SortKey, string[]> | null
  filter: Record<FilterKey, string[]> | null
  organize: Record<OrganizerKey, string[]> | null
  searchTerm: string | null
}

/**
 * Hook to manage searching, filtering, and sorting of inventory data.
 *
 * @param data - The inventory dataset to refine.
 * @param initialRefiners - Optional initial state for filters and sorters.
 * @returns An object with refined `records`, active refiners, and manipulation methods.
 */
export function useInventory(data?: TokenTypeProps[], initialRefiners?: Partial<RefinersState>) {
  const [activeFilters, setActiveFilters] = useState<RefinersState['filter']>(initialRefiners?.filter || null)
  const [activeSorters, setActiveSorters] = useState<RefinersState['sort']>(initialRefiners?.sort || null)
  const [activeOrganizers, setActiveOrganizers] = useState<RefinersState['organize']>(
    initialRefiners?.organize || null
  )

  const [activeSearchTerm, setActiveSearchTerm] = useState<string | null>(initialRefiners?.searchTerm || null)

  const initial = useMemo(() => data || undefined, [data])

  /**
   * Perform fuzzy search on inventory data using Fuse.js
   *
   * @param values - Dataset to search within.
   * @param term - Search query.
   * @returns Filtered and ranked data.
   */
  function searchByTerm(values?: TokenTypeProps[], term?: string): TokenTypeProps[] | undefined {
    if (!values || !term) return values
    const fuse = new Fuse(structuredClone(values), FUSE_OPTIONS)
    return fuse.search(term).map(({ item }) => item)
  }

  const refiners = {
    searchTerm(term: string) {
      setActiveSearchTerm(term)
    },

    organize: {
      add(args: Record<OrganizerKey, string | string[]>) {
        setActiveOrganizers(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]
            const currentValues = nextArgs.get(key) || []
            nextArgs.set(key, [...currentValues, ...items])
          })
          return Object.fromEntries(nextArgs) as Record<OrganizerKey, string[]>
        })
        return { ...refiners, ...refiners.organize }
      },

      clear(args: OrganizerKey | OrganizerKey[]) {
        setActiveOrganizers(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          const keys = Array.isArray(args) ? args : [args]
          keys.forEach(key => nextArgs.delete(key))
          return Object.fromEntries(nextArgs) as Record<OrganizerKey, string[]>
        })
        return { ...refiners, ...refiners.organize }
      }
    },
    filter: {
      /**
       * Adds new filter values to the current filter state.
       */
      add(args: Record<FilterKey, string | string[]>) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]
            const currentValues = nextArgs.get(key) || []
            nextArgs.set(key, [...currentValues, ...items])
          })
          return Object.fromEntries(nextArgs) as Record<FilterKey, string[]>
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Replaces filter values for given keys.
       */
      set(args: Record<FilterKey, string | string[]>) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]
            refiners.filter.clear(key)
            nextArgs.set(key, items)
          })
          return Object.fromEntries(nextArgs) as Record<FilterKey, string[]>
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Removes specific filter values or entire filters if value list is empty.
       */
      remove(args: Record<FilterKey, string | string[]>) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = arg ? (Array.isArray(arg) ? arg : [arg]) : []
            const existing = nextArgs.get(key)
            if (!items.length || !existing) {
              nextArgs.delete(key)
            } else {
              const filtered = existing.filter(item => !items.includes(item))
              filtered.length ? nextArgs.set(key, filtered) : nextArgs.delete(key)
            }
          })
          return Object.fromEntries(nextArgs) as Record<FilterKey, string[]>
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Clears one or more specific filters.
       */
      clear(args: FilterKey | FilterKey[]) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          const keys = Array.isArray(args) ? args : [args]
          keys.forEach(key => nextArgs.delete(key))
          return Object.fromEntries(nextArgs) as Record<FilterKey, string[]>
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Clears all active filters.
       */
      clearAll() {
        setActiveFilters(null)
        return { ...refiners, ...refiners.filter }
      }
    },

    sort: {
      /**
       * Sets sorting criteria for sorters.
       */
      add(args: Record<SortKey, string | string[]>) {
        setActiveSorters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]
            nextArgs.set(key, items)
          })
          return Object.fromEntries(nextArgs) as Record<SortKey, string[]>
        })
        return { ...refiners, ...refiners.sort }
      },

      /**
       * Removes one or more sort keys.
       */
      remove(args: SortKey | SortKey[]) {
        setActiveSorters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          const keys = Array.isArray(args) ? args : [args]
          keys.forEach(key => nextArgs.delete(key))
          return Object.fromEntries(nextArgs) as Record<SortKey, string[]>
        })
        return { ...refiners, ...refiners.sort }
      }
    }
  }

  /**
   * Computed data after applying filters, sorting, and search.
   */
  const records = useMemo(() => {
    let mutableData = structuredClone(initial)

    if (activeFilters) {
      Object.entries(activeFilters).forEach(([key, refiners]) => {
        mutableData = filter?.[key as FilterKey]?.(mutableData, refiners)
      })
    }

    if (activeSearchTerm) {
      mutableData = searchByTerm(mutableData, activeSearchTerm)
    }

    if (activeOrganizers) {
      Object.entries(activeOrganizers).forEach(([key, refiners]) => {
        mutableData = organize?.[key as OrganizerKey]?.(mutableData, refiners)
      })
    }

    if (activeSorters) {
      const comparators = Object.entries(activeSorters).map(([key, refiners]) =>
        sort?.[key as SortKey]?.(refiners)
      )

      mutableData = mutableData?.sort((a, b) => {
        for (const comparator of comparators) {
          if (typeof comparator === 'function') {
            const result = comparator(a, b)
            if (result !== 0) return result
          }
        }
        return 0
      })
    }

    return mutableData || []
  }, [activeSearchTerm, activeSorters, activeFilters, initial])

  return {
    records,
    refiners,
    active: {
      searchTerm: activeSearchTerm,
      filter: activeFilters,
      sort: activeSorters,
      organize: activeOrganizers
    }
  }
}
