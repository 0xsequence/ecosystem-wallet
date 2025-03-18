import { Outlet } from 'react-router'
import { InventoryProvider } from './helpers/InventoryProvider.tsx'

export function InventoryLayout() {
  return (
    <InventoryProvider>
      <Outlet />
    </InventoryProvider>
  )
}
