import { ThemeProvider, ToastProvider } from '@0xsequence/design-system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

import { ConfirmDialogProvider } from '../components/ConfirmDialogProvider'

import { AuthProvider } from './AuthContext'
import { WalletConnectProvider } from './WalletConnectContext'

const queryClient = new QueryClient()

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const theme = import.meta.env.VITE_PROJECT_BASE_THEME || 'dark'

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <WalletConnectProvider>
          <ToastProvider swipeDirection="right">
            <ConfirmDialogProvider>
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </ConfirmDialogProvider>
          </ToastProvider>
        </WalletConnectProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
