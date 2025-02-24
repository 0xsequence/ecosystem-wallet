import { Navigate, Route, Routes } from 'react-router'

import { AppLayout, ProtectedLayout } from './Layout'
import { Auth } from './pages/Auth'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { ROUTES } from './routes'
import { DiscoverPage } from './pages/DiscoverPage'
import { WalletConnectModal } from './pages/WalletConnectModal'
import { TransactionHistory as HistoryPage } from './components/TransactionHistory/index'
export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.AUTH} element={<Auth />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route index element={<WalletConnectModal variant="popup" />} />
        <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
        <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
        <Route path={ROUTES.MARKET} element={<></>} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
      </Route>

      {/* Redirect unknown routes to index */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
