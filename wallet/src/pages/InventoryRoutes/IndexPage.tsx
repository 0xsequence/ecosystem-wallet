import { TokenDetailModal } from './components/TokenDetailModal.tsx'
import { InventoryGrid, InventoryList } from './components/InventoryList.tsx'
import { SendTokens } from './components/SendTokens.tsx'

import { useLocalStore } from '../../utils/local-store.ts'

import { InventoryDisplayModeSwitch } from './components/InventoryDisplayModeSwitch.tsx'
import { UserPreferenceLocalStore } from './types.ts'
import { SearchInput } from '@0xsequence/design-system'
import { Outlet, useLocation, useParams } from 'react-router'
import { useInventory } from './helpers/useInventory'
import { SearchContext, useSearchValues } from '../../hooks/useSearch'

export const InventoryPage = () => {
  const { tokenId, contractAddress } = useParams()
  const [prefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const { inventory } = useInventory()

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

  const location = useLocation()

  const value = useSearchValues({ items: inventory, keys: searchKeys })

  if ((contractAddress && !tokenId) || (tokenId && location.state === null)) {
    return <Outlet />
  }

  return (
    <SearchContext.Provider value={value}>
      <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:my-8 sm:px-2 p-8 sm:py-0 gap-6">
        <div className="flex justify-between items-center">
          <SearchInput name="search" onChange={e => value.setQuery(e.target.value)} />
          <InventoryDisplayModeSwitch />
        </div>
        {/* <pre>{JSON.stringify(filteredItems, null, 2)}</pre> */}
        <div className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
          <InventoryGrid isActive={prefs?.inventoryDisplayMode === 'grid'} />
          <InventoryList isActive={prefs?.inventoryDisplayMode === 'list'} />
        </div>
      </div>
      <TokenDetailModal />
      <SendTokens />
    </SearchContext.Provider>
  )
}
