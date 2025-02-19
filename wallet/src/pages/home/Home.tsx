import { Spinner } from '@0xsequence/design-system'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { useConnectionHandler } from '../../hooks/useConnectionHandler'
import { useSignMessageHandler } from '../../hooks/useSignMessageHandler'
import { useTransactionHandler } from '../../hooks/useTransactionHandler'

import { SignMessagePanel } from './components/SignMessagePanel'
import { SendTransactionPanel } from './components/SendTransactionPanel'
import { ConnectionRequestPanel } from './components/ConnectionRequestPanel'

import { useNavigate } from 'react-router'
import { ROUTES } from '../../routes'

export function Home() {
  // Setup handlers
  const connectionHandler = useConnectionHandler()
  const transactionHandler = useTransactionHandler()
  const signMessageHandler = useSignMessageHandler()

  const { connectionRequest, isConnectionHandlerRegistered } = connectionHandler
  const { transactionRequest, isSendingTxn, isTransactionHandlerRegistered } = transactionHandler
  const { signRequest, isSigningMessage, isSignHandlerRegistered } = signMessageHandler
  const allHandlersRegistered =
    isConnectionHandlerRegistered && isTransactionHandlerRegistered && isSignHandlerRegistered

  const isPopup = window.opener !== null
  const sendInProgress = isSendingTxn || isSigningMessage

  // If not a popup request, redirect to inventory
  const navigate = useNavigate()
  useEffect(() => {
    if (!isPopup && !transactionRequest && !connectionRequest && !signRequest) {
      navigate(ROUTES.INVENTORY)
    }
  }, [isPopup, transactionRequest, connectionRequest, signRequest])

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full">
      <AnimatePresence>
        {isPopup && allHandlersRegistered && !connectionRequest && !transactionRequest && !signRequest && (
          <motion.div
            className="flex p-4 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-black">No pending confirmation</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col flex-1 items-center justify-start w-full">
        <AnimatePresence>
          <motion.div
            className="w-full flex-col flex-1 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sendInProgress && (
              <div className="flex items-center flex-1 justify-center mt-4">
                <Spinner className="text-text100" size="lg" />
              </div>
            )}
            {connectionRequest && <ConnectionRequestPanel handler={connectionHandler} />}
            {transactionRequest && transactionRequest.length > 0 && !isSendingTxn && (
              <SendTransactionPanel handler={transactionHandler} />
            )}
            {signRequest && !isSigningMessage && <SignMessagePanel handler={signMessageHandler} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
