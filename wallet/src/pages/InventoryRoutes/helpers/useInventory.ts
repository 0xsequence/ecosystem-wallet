import { useContext } from 'react'
import { Inventory } from './InventoryProvider'

export function useInventory() {
  const context = useContext(Inventory)

  if (!context) {
    throw new Error('useInventory must be used within a InventoryProvider')
  }

  return context
}
