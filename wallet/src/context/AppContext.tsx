import { ThemeProvider, ToastProvider } from '@0xsequence/design-system'
import { ChainId } from '@0xsequence/network'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { PropsWithChildren } from 'react'

import { ConfirmDialogProvider } from '../components/ConfirmDialogProvider'

import { AuthProvider } from './AuthContext'

const queryClient = new QueryClient()

const AppContext = createContext({} as { chainIds: ChainId[] })

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppContext.Provider
      value={{
        chainIds: [ChainId.ARBITRUM_NOVA, ChainId.SONEIUM, ChainId.POLYGON]
      }}
    >
      <ThemeProvider root="#app" scope="app" theme="dark">
        <AuthProvider>
          <ToastProvider>
            <ConfirmDialogProvider>
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </ConfirmDialogProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
