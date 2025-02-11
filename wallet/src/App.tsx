import '@0xsequence/design-system/styles.css'
import { Navigate, Route, Routes } from 'react-router'

import { AppLayout, ProtectedLayout } from './Layout'
import { Auth } from './pages/Auth'
import { CollectiblesPage } from './pages/CollectiblesPage'
import { Home } from './pages/Home'
import { SendPage } from './pages/SendPage'
import { TokensPage } from './pages/TokensPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { ROUTES } from './routes'

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.AUTH} element={<Auth />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.TOKENS} element={<TokensPage />} />
        <Route path={ROUTES.COLLECTIBLES} element={<CollectiblesPage />} />
        <Route path={ROUTES.SEND} element={<SendPage />} />
        <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
      </Route>

      {/* Redirect unknown routes to index */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
