import { Navigate, Route, Routes } from 'react-router'

import { AppLayout, ProtectedLayout } from './Layout'
import { Auth } from './pages/Auth'
import { InventoryPage } from './pages/InventoryRoutes/IndexPage'
import { ROUTES } from './routes'
import { DiscoverPage } from './pages/DiscoverRoutes/IndexPage'
import { DiscoverShowRoute } from './pages/DiscoverRoutes/ShowPage'
import { InventoryTokenRoute } from './pages/InventoryRoutes/TokenPage'
import { InventoryContractRoute } from './pages/InventoryRoutes/ContractPage'
import { WalletHandlerRequestModal } from './pages/WalletHandlerRequestModal'
import { TransactionHistory as HistoryPage } from './pages/TransactionHistory/IndexPage'
import { THEME } from './utils/theme'
import { useEffect } from 'react'
import { InventoryLayout } from './pages/InventoryRoutes/InventoryLayout'

export const App: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && THEME.css) {
      if (!document.getElementById('theme-styles')) {
        const $head = document.querySelector('head')
        const $style = document.createElement('style')
        $style.setAttribute('type', 'text/css')
        $style.setAttribute('id', 'theme-styles')
        $style.textContent = THEME.css

        $head?.appendChild($style)
      }
    }
  }, [])

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.AUTH} element={<Auth />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route element={<InventoryLayout />}>
          <Route index element={<WalletHandlerRequestModal variant="popup" />} />

          <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
          <Route
            path={`${ROUTES.INVENTORY}/:chainId/:contractAddress`}
            element={<InventoryContractRoute />}
          />
          <Route
            path={`${ROUTES.INVENTORY}/:chainId/:contractAddress/:tokenId`}
            element={<InventoryTokenRoute />}
          />
        </Route>
        <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
        <Route path={`${ROUTES.DISCOVER}/:id`} element={<DiscoverShowRoute />} />
        <Route path={ROUTES.MARKET} element={<></>} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
      </Route>

      {/* Redirect unknown routes to index */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
