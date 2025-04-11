import { useMemo, useState } from 'react'

import { inventory, type InventoryReturn } from './inventory-model'
import { TokenTypeProps } from '../types'

export function useInventory(
  data?: TokenTypeProps[] | false,
  value?: (view: InventoryReturn) => InventoryReturn
) {
  const [viewState, setViewState] = useState<TokenTypeProps[] | null>(null)

  const initialView = useMemo(() => {
    const records = data || []

    if (typeof value === 'function') {
      return value(inventory(records)).records()
    } else {
      return inventory(records).records()
    }
  }, [data])

  const view = viewState || initialView || inventory([]).records()

  function useView(
    value: (view: InventoryReturn) => InventoryReturn,
    data: TokenTypeProps[] | null | undefined = view
  ): ReturnType<InventoryReturn['records']> | null | undefined {
    return useMemo(() => {
      if (typeof value === 'function' && data) {
        return value(inventory(data)).records()
      }
    }, [view, data, value])
  }

  function getView(
    value: (view: InventoryReturn) => InventoryReturn,
    data: TokenTypeProps[] | null | undefined = view
  ): ReturnType<InventoryReturn['records']> | null | undefined {
    if (typeof value === 'function' && data) {
      return value(inventory(data)).records()
    }
  }

  // function updateView(

  // )

  // function setView(
  //   value: (view: InventoryReturn) => InventoryReturn,
  //   data: TokenTypeProps[] | null | undefined | = view

  // ): void  {

  //   if (typeof value === 'function') {
  //     setViewState(value(inventory(data)).records())
  //   }
  // } else {

  // }

  //   const records = getView(
  //     view => view.filterBy.chain(value).sortBy.type(['COIN', 'COLLECTIBLE']).balance().testnet().sort(),
  //     data
  //   )
  //   if (records) {
  //     inventory.setView(records)
  //   }
  // }

  // function set(value?: null | ((view: InventoryReturn) => InventoryReturn)): void {
  //   if (typeof value === 'function') {
  //     if (query.data) {
  //       setView(value(inventory(query.data)).records())
  //     }
  //   } else {
  //     setView(null)
  //   }
  // }

  const deprecated = { items: view, get: getView, data }

  return { view, setView: setViewState, getView, useView, initialView, ...deprecated }
}
