import { Box, Spinner, ThemeProvider, ToastProvider } from '@0xsequence/design-system'
import '@0xsequence/design-system/styles.css'

import { ConfirmDialogProvider } from './components/ConfirmDialogProvider'
import { PoweredBySequence } from './components/PoweredBySequence'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Auth } from './routes/Auth'
import { Wallet } from './routes/Wallet'

const AppContent: React.FC = () => {
  const { authState } = useAuth()

  switch (authState.status) {
    case 'loading':
      return (
        <Box alignItems="center" justifyContent="center" style={{ height: 'calc(100vh - 24px)' }}>
          <Spinner size="lg" />
        </Box>
      )
    case 'signedIn':
      return <Wallet />
    case 'signedOut':
      return <Auth />
  }
}

export const App: React.FC = () => {
  return (
    <div id="app">
      <ThemeProvider root="#app" scope="app" theme="dark">
        <AuthProvider>
          <ToastProvider>
            <ConfirmDialogProvider>
              <Box minHeight="vh" position="relative" paddingBottom="14">
                <AppContent />
                <PoweredBySequence />
              </Box>
            </ConfirmDialogProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}
