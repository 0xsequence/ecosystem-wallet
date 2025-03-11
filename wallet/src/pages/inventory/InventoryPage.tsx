import { TokenDetailModal } from './components/TokenDetailModal.tsx'
import { InventoryGrid, InventoryList } from './components/InventoryList.tsx'
import { InventoryProvider } from './helpers/inventory-provider.tsx'
import { SendTokens } from './components/SendTokens.tsx'

import { useLocalStore } from '../../utils/local-store'

import { InventoryDisplayModeSwitch } from './components/InventoryDisplayModeSwitch'
import { UserPreferenceLocalStore } from './types'
import { WalletsTotalBalance } from '../../components/WalletsTotalBalance'

export const InventoryPage = () => {
  return (
    <InventoryProvider>
      <Inventory />
      <TokenDetailModal />
      <SendTokens />
    </InventoryProvider>
  )
}

function Inventory() {
  const [prefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      <div className="flex justify-between">
        <WalletsTotalBalance />
        <InventoryDisplayModeSwitch />
      </div>

      <div className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
        <InventoryGrid isActive={prefs?.inventoryDisplayMode === 'grid'} />
        <InventoryList isActive={prefs?.inventoryDisplayMode === 'list'} />
      </div>
    </div>
  )
}
