import { InventoryGrid, InventoryList } from './components/InventoryList.tsx'

import { useLocalStore } from '../../utils/local-store.ts'

import { InventoryDisplayModeSwitch } from './components/InventoryDisplayModeSwitch.tsx'
import { UserPreferenceLocalStore } from './types.ts'
import { SearchInput } from '@0xsequence/design-system'
import { Outlet, useLocation, useParams } from 'react-router'
import { useFavoriteTokens } from '../../hooks/useFavoriteTokens'
import { useFetchInventory } from './helpers/useFetchInventory'
import { NetworkFilterSelect } from '../../components/NetworkFilterSelect'
import { useInventory } from '../../hooks/use-inventory'
import { useState } from 'react'

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

  const DEFAULT_REFINERS = {
    organize: {
      groupContractsAcrossNetworks: { minGroupSize: 2 }
    },
    sort: {
      type: ['GROUP', 'COIN', 'COLLECTIBLE'],
      favorites,
      testnet: ['asc'],
      balance: ['desc']
    }
  }

  const inventory = useInventory(query?.data, DEFAULT_REFINERS)

  function handleNetworkFilterChange(value: string | number) {
    value = value.toString()

    if (value && value !== 'all') {
      inventory.refiners.filter.set({ chain: value.split(',') })
    } else {
      inventory.refiners.filter.clear('chain')
    }
  }

  return (
    <>
      {/* <pre>{JSON.stringify(active, null, 2)}</pre> */}
      <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:my-8 sm:px-2 p-8 sm:py-0 gap-6">
        <div className="flex justify-between items-center gap-4">
          <SearchInput
            id="search"
            name="search"
            value={searchTerm}
            onChange={e => {
              if (e.target.value && e.target.value.length > 0) {
                inventory.refiners.organize.clear(['groupContractsAcrossNetworks'])
              } else {
                inventory.refiners.organize.add({ groupContractsAcrossNetworks: { minGroupSize: 2 } })
              }
              inventory.refiners.search(e.target.value)
              setSearchTerm(e.target.value)
            }}
          />

          <div className="flex gap-2">
            <NetworkFilterSelect callback={handleNetworkFilterChange} />
            <InventoryDisplayModeSwitch />
          </div>
        </div>

        <div className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
          <InventoryGrid
            inventory={inventory}
            isActive={prefs?.inventoryDisplayMode === 'grid'}
            isLoading={query.isLoading}
          />
          <InventoryList
            inventory={inventory}
            isActive={prefs?.inventoryDisplayMode === 'list'}
            isLoading={query.isLoading}
          />
        </div>
      </div>

      <Outlet />
    </>
  )
}
