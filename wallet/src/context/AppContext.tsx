import { ThemeProvider, ToastProvider } from '@0xsequence/design-system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

import { ConfirmDialogProvider } from '../components/ConfirmDialogProvider'

import { AuthProvider } from './AuthContext'
import { WalletConnectProvider } from './WalletConnectContext'
import { THEME } from '../utils/theme'

const queryClient = new QueryClient()

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={THEME.mode}>
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
