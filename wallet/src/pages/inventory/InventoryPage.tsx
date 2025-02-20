import { TokenDetailModal } from './components/token-detail-modal.tsx'
import { InventoryList } from './components/inventory-list'
import { InventoryProvider } from './helpers/inventory-provider.tsx'
import { useInventory } from './helpers/use-inventory'
import { InventoryListEmpty } from './components/inventory-list-empty'
import { SendTokens } from './components/send-tokens'

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
  const { inventoryIsEmpty } = useInventory()

  return (
    <div className="isolate grid w-full max-w-screen-md grid-cols-2 sm:grid-cols-4 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      {!inventoryIsEmpty ? <InventoryList /> : <InventoryListEmpty />}
    </div>
  )
}
