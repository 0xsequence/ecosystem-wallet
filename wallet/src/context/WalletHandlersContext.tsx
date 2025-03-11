import { PropsWithChildren, createContext, useContext } from 'react'
import { useConnectionHandler } from '../hooks/useConnectionHandler'
import { useSignMessageHandler } from '../hooks/useSignMessageHandler'
import { useTransactionHandler } from '../hooks/useTransactionHandler'

interface WalletHandlersContext {
  connectionHandler: ReturnType<typeof useConnectionHandler>
  transactionHandler: ReturnType<typeof useTransactionHandler>
  signMessageHandler: ReturnType<typeof useSignMessageHandler>
}

const WalletConnectContext = createContext<WalletHandlersContext | undefined>(undefined)

export const WalletHandlersProvider = ({ children }: PropsWithChildren) => {
  const connectionHandler = useConnectionHandler()
  const transactionHandler = useTransactionHandler()
  const signMessageHandler = useSignMessageHandler()

  return (
    <WalletConnectContext.Provider
      value={{
        connectionHandler,
        signMessageHandler,
        transactionHandler
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletHandlersContext = () => {
  const context = useContext(WalletConnectContext)
  if (context === undefined) {
    throw new Error('useWalletHandlersContext must be used within an WalletHandlersProvider')
  }
  return context
}
