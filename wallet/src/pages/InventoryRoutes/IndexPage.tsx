import { TokenDetailModal } from './components/TokenDetailModal.tsx'
import { InventoryGrid, InventoryList } from './components/InventoryList.tsx'
import { SendTokens } from './components/SendTokens.tsx'

import { useLocalStore } from '../../utils/local-store.ts'

import { InventoryDisplayModeSwitch } from './components/InventoryDisplayModeSwitch.tsx'
import { UserPreferenceLocalStore } from './types.ts'
import { SearchInput } from '@0xsequence/design-system'
import { Outlet, useLocation, useParams } from 'react-router'

export const InventoryPage = () => {
  const { tokenId, contractAddress } = useParams()
  const [prefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const location = useLocation()

  if ((contractAddress && !tokenId) || (tokenId && location.state === null)) {
    return <Outlet />
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:my-8 sm:px-2 p-8 sm:py-0 gap-6">
        <div className="flex justify-between items-center">
          <SearchInput name="search" />
          <InventoryDisplayModeSwitch />
        </div>

        <div className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
          <InventoryGrid isActive={prefs?.inventoryDisplayMode === 'grid'} />
          <InventoryList isActive={prefs?.inventoryDisplayMode === 'list'} />
        </div>
      </div>
      <TokenDetailModal />
      <SendTokens />
    </>
  )
}
