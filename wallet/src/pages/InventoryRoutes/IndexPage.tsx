import { InventoryGrid, InventoryList } from './components/InventoryList.tsx'

import { useLocalStore } from '../../utils/local-store.ts'

import { InventoryDisplayModeSwitch } from './components/InventoryDisplayModeSwitch.tsx'
import { UserPreferenceLocalStore } from './types.ts'
import { SearchInput, Select, Text } from '@0xsequence/design-system'
import { Outlet, useLocation, useParams } from 'react-router'
import { useInventory } from './helpers/use-inventory.ts'
import { SearchContext, useSearchValues } from '../../hooks/useSearch'
import { NetworkImage } from '../../components/NetworkImage'
import { useMemo, useState } from 'react'

export const InventoryPage = () => {
  const { tokenId, contractAddress } = useParams()
  const [prefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const location = useLocation()
  const inventory = useInventory()

  const searchKeys = [
    'title',
    'name',
    'symbol',
    'nativeToken.symbol',
    'nativeToken.name',
    'contractInfo.name',
    'contractInfo.symbol',
    'tokenMetadata.name',
    'tokenMetadata.description',
    'tokenMetadata.properties'
  ]

  const value = useSearchValues({ items: inventory, keys: searchKeys })
  // const [chain, setChain] = useState<'all' | number | null>(null)

  // const items = useMemo(() => {

  //   if (chain && chain === 'all') {
  //     return inventory.get()
  //   }

  //   if (chain) {
  //     return inventory.get(view =>
  //       view.filterBy.chain(chain).sortBy.type(['favorites', 'groups', 'coins', 'collectibles'])
  //     )
  //   }

  //   return inventory
  // }, [chain, inventory])

  if (
    (contractAddress && !tokenId) ||
    (tokenId && location.state === null) ||
    (tokenId && location.state && location.state.referer !== '/inventory')
  ) {
    return <Outlet />
  }

  function handleNetworkFilterChange(value: string | number) {
    if (value && value !== 'all') {
      console.log(value)
      inventory.set(view =>
        view.filterBy.chain(value).sortBy.type(['favorites', 'groups', 'coins', 'collectibles'])
      )
    } else {
      return inventory.set(null)
    }

    // setChain(value)
  }

  return (
    <SearchContext.Provider value={value}>
      <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:my-8 sm:px-2 p-8 sm:py-0 gap-6">
        <div className="flex justify-between items-center gap-4">
          <SearchInput
            id="search"
            name="search"
            value={value.query}
            onChange={e => value.setQuery(e.target.value)}
          />

          <div className="flex gap-2">
            <NetworkFilter callback={handleNetworkFilterChange} />

            <InventoryDisplayModeSwitch />
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
          <InventoryGrid inventory={inventory} isActive={prefs?.inventoryDisplayMode === 'grid'} />
          <InventoryList inventory={inventory} isActive={prefs?.inventoryDisplayMode === 'list'} />
        </div>
      </div>
      <Outlet />
    </SearchContext.Provider>
  )
}

function NetworkFilter({ callback }: { callback: (value: string | number) => void }) {
  return (
    <Select
      defaultValue="all"
      label="Networks"
      labelLocation="hidden"
      name="networkFilter"
      onValueChange={callback}
      options={[
        {
          label: (
            <div className="flex items-center gap-2">
              <Text>All networks</Text>
            </div>
          ),
          value: 'all'
        },
        {
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={10} size="sm" />
              <Text>Optimism</Text>
            </div>
          ),
          value: '1'
        },

        {
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={8453} size="sm" />
              <Text>Base</Text>
            </div>
          ),
          value: '8453'
        },
        {
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={1868} size="sm" />
              <Text>Soneium</Text>
            </div>
          ),
          value: '1868'
        }
      ]}
    />
  )
}
