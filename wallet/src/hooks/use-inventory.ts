import { useMemo, useState } from 'react'
import { TokenRecords } from '../pages/InventoryRoutes/types'
import Fuse from 'fuse.js'
import { filter, FilterArgs, FilterKeys } from './inventory-refinements/filters'
import { sort, SortArgs, SortKeys } from './inventory-refinements/sorters'
import { organize, OrganizeArgs, OrganizeKeys } from './inventory-refinements/organizers'
import { FUSE_OPTIONS } from '../constants'

export interface RefinersState {
  sort: Partial<SortArgs> | null
  filter: Partial<FilterArgs> | null
  organize: Partial<OrganizeArgs> | null
  searchTerm: string | null
}

/**
 * Hook to manage searching, filtering, and sorting of inventory data.
 *
 * @param data - The inventory dataset to refine.
 * @param initialRefiners - Optional initial state for filters and sorters.
 * @returns An object with refined `records`, active refiners, and manipulation methods.
 */
export function useInventory(data?: TokenRecords, initialRefiners?: Partial<RefinersState>) {
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
  function searchByTerm(values?: TokenRecords, term?: string): TokenRecords | undefined {
    if (!values || !term) return values
    const fuse = new Fuse(structuredClone(values), FUSE_OPTIONS)
    return fuse.search(term).map(({ item }) => item)
  }

  const refiners = {
    search(term: string) {
      setActiveSearchTerm(term)
    },

    organize: {
      add(args: Partial<OrganizeArgs>) {
        setActiveOrganizers(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const currentValue = nextArgs.get(key) || {}
            nextArgs.set(key, { ...currentValue, ...arg })
          })
          return Object.fromEntries(nextArgs)
        })
        return { ...refiners, ...refiners.organize }
      },

      clear(args: OrganizeKeys | OrganizeKeys[]) {
        setActiveOrganizers(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          const keys = Array.isArray(args) ? args : [args]
          keys.forEach(key => nextArgs.delete(key))
          return Object.fromEntries(nextArgs)
        })
        return { ...refiners, ...refiners.organize }
      }
    },
    filter: {
      /**
       * Adds new filter values to the current filter state.
       */
      add(args: Partial<FilterArgs>) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]

            const values = nextArgs.get(key) || []
            const currentValues = Array.isArray(values) ? values : [values]

            nextArgs.set(key, [...currentValues, ...items])
          })
          return Object.fromEntries(nextArgs)
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Replaces filter values for given keys.
       */
      set(args: Partial<FilterArgs>) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]
            refiners.filter.clear(key as keyof FilterArgs)
            nextArgs.set(key, items)
          })
          return Object.fromEntries(nextArgs)
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Removes specific filter values or entire filters if value list is empty.
       */
      remove(args: Partial<FilterArgs>) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = arg ? (Array.isArray(arg) ? arg : [arg]) : []
            const existing = nextArgs.get(key) as (string | number)[]
            if (!items.length || !existing) {
              nextArgs.delete(key)
            } else {
              const filtered = existing.filter(item => !items.includes(item))
              if (filtered.length) {
                nextArgs.set(key, filtered)
              } else {
                nextArgs.delete(key)
              }
            }
          })
          return Object.fromEntries(nextArgs)
        })
        return { ...refiners, ...refiners.filter }
      },

      /**
       * Clears one or more specific filters.
       */
      clear(args: FilterKeys | FilterKeys[]) {
        setActiveFilters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          const keys = Array.isArray(args) ? args : [args]
          keys.forEach(key => nextArgs.delete(key))
          return Object.fromEntries(nextArgs)
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
      add(args: Record<SortKeys, string | string[]>) {
        setActiveSorters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          Object.entries(args).forEach(([key, arg]) => {
            const items = Array.isArray(arg) ? arg : [arg]
            nextArgs.set(key, items)
          })
          return Object.fromEntries(nextArgs)
        })
        return { ...refiners, ...refiners.sort }
      },

      /**
       * Removes one or more sort keys.
       */
      remove(args: SortKeys | SortKeys[]) {
        setActiveSorters(current => {
          const nextArgs = new Map(Object.entries(current || {}))
          const keys = Array.isArray(args) ? args : [args]
          keys.forEach(key => nextArgs.delete(key))
          return Object.fromEntries(nextArgs)
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
        /* @ts-expect-error refiners not scoped tightly */
        mutableData = filter?.[key as FilterKeys]?.(mutableData, refiners)
      })
    }

    if (activeSearchTerm) {
      mutableData = searchByTerm(mutableData, activeSearchTerm)
    }

    if (activeOrganizers) {
      Object.entries(activeOrganizers).forEach(([key, refiners]) => {
        mutableData = organize?.[key as OrganizeKeys]?.(mutableData, refiners)
      })
    }

    if (activeSorters) {
      const comparators = Object.entries(activeSorters).map(([key, refiners]) =>
        /* @ts-expect-error refiners not scoped tightly */
        sort?.[key as SortKeys]?.(refiners)
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
  }, [activeSearchTerm, activeOrganizers, activeSorters, activeFilters, initial])

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
