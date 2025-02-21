
import { PropsWithChildren, createContext, useContext } from 'react'
import { useConnectionHandler } from '../hooks/useConnectionHandler'
import { useSignMessageHandler } from '../hooks/useSignMessageHandler'
import { useTransactionHandler } from '../hooks/useTransactionHandler'

interface WalletConnectContextType {
  connectionHandler: ReturnType<typeof useConnectionHandler>
  transactionHandler: ReturnType<typeof useTransactionHandler>
  signMessageHandler: ReturnType<typeof useSignMessageHandler>
}

const WalletConnectContext = createContext<WalletConnectContextType | undefined>(undefined)

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
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

export const useWalletConnect = () => {
  const context = useContext(WalletConnectContext)
  if (context === undefined) {
    throw new Error('useWalletConnect must be used within an WalletConnectProvider')
  }
  return context
}
