// import { useState } from 'react'

// import { useFetchInventory } from './useFetchInventory'
// import { inventory } from './inventory-model'

// type InventoryView = ReturnType<typeof inventory> | null

// export function useInventory() {
//   const query = useFetchInventory()

//   const [view, setView] = useState<InventoryView>(null)

//   const items = view || query.data || []

//   function get(value?: null | ((view: typeof inventory) => ReturnType<typeof inventory>)) {
//     if (typeof value === 'function') {
//       return value(inventory(items)).records()
//     } else {
//       return value
//     }
//   }

//   function set(value: null | ((view: typeof inventory) => ReturnType<typeof inventory>)) {
//     if (typeof value === 'function') {
//       setView(value(inventory(query.data)).records())
//     } else {
//       setView(value)
//     }
//   }

//   return { items, set, get, data: query.data, query }
// }

import { useState, useMemo } from 'react'

import { useFetchInventory } from './useFetchInventory'
import { inventory } from './inventory-model'

type InventoryInstance = ReturnType<typeof inventory> | null

export function useInventory() {
  const query = useFetchInventory()
  const [view, setView] = useState<InventoryInstance>(null)

  const defaultInventory = useMemo(() => {
    if (!query.data) return inventory([])
    return inventory(query.data)
  }, [query.data])

  const active = view || defaultInventory

  function get(fn?: (inv: ReturnType<typeof inventory>) => InventoryInstance) {
    return fn ? fn(active).records() : active.records()
  }

  function set(fn: null | ((inv: ReturnType<typeof inventory>) => InventoryInstance)) {
    if (typeof fn === 'function') {
      const result = fn(defaultInventory)
      setView(result)
    } else {
      setView(null)
    }
  }

  console.log(active)

  return {
    // ...active,
    items: active.records(),
    get,
    set,
    query,
    data: query.data
  }
}
