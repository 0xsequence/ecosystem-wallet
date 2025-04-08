import { Navigate, Route, Routes, useLocation } from 'react-router'

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
import { useLocalStore } from './utils/local-store'

export const App: React.FC = () => {
  const [address, setAddress] = useLocalStore<string>('address')

  const location = useLocation()

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

  useEffect(() => {
    if ((location.state && location.state.modal) || (location.state && location.state.keepPosition)) {
      // do nothing
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.state])

  useEffect(() => {
    document.addEventListener('keydown', setAccount)
    function setAccount(event: KeyboardEvent) {
      if (event.metaKey && event.key === 'a') {
        event.preventDefault() // Prevent default "Select All" behavior

        const input = prompt('Enter an address: 0x... (or blank for current logged in user)', address || '')
        if (input !== null) {
          setAddress(input)
        }
      }
    }

    return () => document.removeEventListener('keydown', setAccount)
  }, [])

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.AUTH} element={<Auth />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route index element={<WalletHandlerRequestModal variant="popup" />} />

        <Route path={ROUTES.INVENTORY} element={<InventoryPage />}>
          <Route path={`${ROUTES.INVENTORY}/:chainId/:contractAddress`} element={<InventoryContractRoute />}>
            <Route
              path={`${ROUTES.INVENTORY}/:chainId/:contractAddress/:tokenId`}
              element={<InventoryTokenRoute />}
            />
          </Route>
        </Route>
        <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
        <Route path={`${ROUTES.DISCOVER}/:id`} element={<DiscoverShowRoute />} />
        <Route path={ROUTES.MARKET} element={<></>} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />

        {/* Redirect unknown routes to index */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Route>
    </Routes>
  )
}
