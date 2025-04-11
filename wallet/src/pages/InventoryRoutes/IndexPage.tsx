import { InventoryGrid, InventoryList } from './components/InventoryList.tsx'

import { useLocalStore } from '../../utils/local-store.ts'

import { InventoryDisplayModeSwitch } from './components/InventoryDisplayModeSwitch.tsx'
import { UserPreferenceLocalStore } from './types.ts'
import { SearchInput } from '@0xsequence/design-system'
import { Outlet, useLocation, useParams } from 'react-router'
import { useInventory } from './helpers/use-inventory.ts'
import { useFavoriteTokens } from '../../hooks/useFavoriteTokens'
import { useFetchInventory } from './helpers/useFetchInventory'
import { useMemo, useState } from 'react'
import { NetworkFilterSelect } from '../../components/NetworkFilterSelect'

export const InventoryPage = () => {
  const { tokenId, contractAddress } = useParams()
  const location = useLocation()

  // Bypass and show child
  if (
    (contractAddress && !tokenId) ||
    (tokenId && location.state === null) ||
    (tokenId && location.state && location.state.referer !== '/inventory')
  ) {
    return <Outlet />
  }

  return <InventoryPageView />
}

function InventoryPageView() {
  const [prefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const { favorites } = useFavoriteTokens()
  const [searchTerm, setSearchTerm] = useState('')

  const query = useFetchInventory()

  const inventory = useInventory(query?.data, view =>
    view.filterBy
      .showGroups()
      .sortBy.favorites(favorites)
      .type(['GROUP', 'COIN', 'COLLECTIBLE'])
      .testnet()
      .balance()
      .sort()
  )

  const lastState = useMemo(() => inventory.getSnapshot(), [])

  function handleNetworkFilterChange(value: string | number) {
    if (value && value !== 'all') {
      const records = inventory.getView(
        view => view.filterBy.chain(value).sortBy.type(['COIN', 'COLLECTIBLE']).balance().testnet().sort(),
        lastState
      )
      if (records) {
        inventory.setView(records)
      }
    } else {
      inventory.setView(lastState)
    }
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:my-8 sm:px-2 p-8 sm:py-0 gap-6">
        <div className="flex justify-between items-center gap-4">
          <SearchInput
            id="search"
            name="search"
            value={searchTerm}
            onChange={e => {
              const term = e.target.value
              setSearchTerm(term)
              const records = inventory.getView(view => view.search(term), inventory.initialView)
              if (records) {
                inventory.setView(records)
              }
            }}
          />

          <div className="flex gap-2">
            <NetworkFilterSelect callback={handleNetworkFilterChange} />
            <InventoryDisplayModeSwitch />
          </div>
        </div>

        <div className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
          <InventoryGrid
            items={inventory.view}
            isActive={prefs?.inventoryDisplayMode === 'grid'}
            isLoading={query.isLoading}
          />
          <InventoryList
            items={inventory.view}
            isActive={prefs?.inventoryDisplayMode === 'list'}
            isLoading={query.isLoading}
          />
        </div>
      </div>
      <Outlet />
    </>
  )
}
