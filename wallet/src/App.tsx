import { Navigate, Route, Routes, useLocation } from 'react-router'

import { AppLayout, ProtectedLayout } from './Layout'
import { Auth } from './pages/Auth'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { ROUTES } from './routes'
import { DiscoverPage } from './pages/discover'
import { DiscoverShowRoute } from './pages/discover/show'
import { WalletHandlerRequestModal } from './pages/WalletHandlerRequestModal'
import { TransactionHistory as HistoryPage } from './pages/TransactionHistory/index'
import { useEffect } from 'react'
export const App: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<AppLayout />}>
          <Route path={ROUTES.AUTH} element={<Auth />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route index element={<WalletHandlerRequestModal variant="popup" />} />
          <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
          <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
          <Route path={`${ROUTES.DISCOVER}/:id`} element={<DiscoverShowRoute />} />
          <Route path={ROUTES.MARKET} element={<></>} />
          <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        </Route>

        {/* Redirect unknown routes to index */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </>
  )
}
