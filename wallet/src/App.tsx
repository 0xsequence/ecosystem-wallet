import { Box, ThemeProvider, ToastProvider } from '@0xsequence/design-system'
import '@0xsequence/design-system/styles.css'
import { Navigate, Outlet, Route, Routes } from 'react-router'

import { ConfirmDialogProvider } from './components/ConfirmDialogProvider'
import { PoweredBySequence } from './components/PoweredBySequence'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { Auth } from './pages/Auth'
import { Wallet } from './pages/Home'
import { ROUTES } from './routes'

const AppLayout = () => {
  return (
    <Box minHeight="vh" position="relative" paddingBottom="14">
      <Outlet />
      <PoweredBySequence />
    </Box>
  )
}

const ProtectedLayout = () => {
  return (
    <PrivateRoute>
      <AppLayout />
    </PrivateRoute>
  )
}

export const App: React.FC = () => {
  return (
    <div id="app">
      <ThemeProvider root="#app" scope="app" theme="dark">
        <AuthProvider>
          <ToastProvider>
            <ConfirmDialogProvider>
              <Routes>
                {/* Public routes */}
                <Route element={<AppLayout />}>
                  <Route path={ROUTES.AUTH} element={<Auth />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedLayout />}>
                  <Route index element={<Wallet />} />
                  <Route path={ROUTES.ASSETS.INDEX}>
                    <Route index element={<div style={{ color: 'white' }}>token</div>} />
                    <Route path="collectibles" element={<div style={{ color: 'white' }}>collectibles</div>} />
                  </Route>
                </Route>

                {/* Redirect unknown routes to index */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </ConfirmDialogProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}
