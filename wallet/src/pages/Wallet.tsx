import { Box, Button, Collapsible, Spinner, Text } from '@0xsequence/design-system'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSnapshot } from 'valtio'

import { useConnectionHandler } from '../hooks/useConnectionHandler'
import { useSignMessageHandler } from '../hooks/useSignMessageHandler'
import { useTransactionHandler } from '../hooks/useTransactionHandler'

import { FeeOptionSelector } from '../components/FeeOptionSelector'
import { SignatureDetails } from '../components/SignatureDetails'
import { TransactionDetails } from '../components/TransactionDetails'
import { WalletConnect } from '../components/WalletConnect'

import { walletConnectStore } from '../store/WalletConnectStore'

export const Wallet: React.FC = () => {
  const {
    connectionRequest,
    handleApproveConnection,
    handleRejectConnection,
    isConnectionHandlerRegistered
  } = useConnectionHandler()

  const {
    transactionRequest,
    requestOrigin: txnOrigin,
    requestChainId: txnChainId,
    isSendingTxn,
    txnFeeOptions,
    feeOptionBalances,
    selectedFeeOptionAddress,
    setSelectedFeeOptionAddress,
    hasCheckedFeeOptions,
    handleApproveTxn,
    handleRejectTxn,
    isTransactionHandlerRegistered
  } = useTransactionHandler()

  const {
    signRequest,
    requestOrigin: signOrigin,
    requestChainId: signChainId,
    isSigningMessage,
    handleApproveSign,
    handleRejectSign,
    isSignHandlerRegistered
  } = useSignMessageHandler()

  const allHandlersRegistered =
    isConnectionHandlerRegistered && isTransactionHandlerRegistered && isSignHandlerRegistered

  const { sessions } = useSnapshot(walletConnectStore.state)
  const activeWcSessions = sessions.filter(s => s.expiry * 1000 > Date.now())

  return (
    <Box>
      <Box flexDirection="column" gap="2" alignItems="center" justifyContent="center" width="full">
        {!transactionRequest && !connectionRequest && !signRequest && (
          <Box width="full" style={{ maxWidth: '400px' }}>
            <Collapsible
              label={
                <Box flexDirection="column" alignItems="flex-start" justifyContent="center" gap="2">
                  <Text color="text100">WalletConnect</Text>
                  {activeWcSessions.length > 0 && (
                    <Text color="text80" variant="small">
                      {activeWcSessions.length} Active Connection{activeWcSessions.length > 1 ? 's' : ''}
                    </Text>
                  )}
                </Box>
              }
            >
              <WalletConnect />
            </Collapsible>
          </Box>
        )}
      </Box>
      <AnimatePresence>
        {allHandlersRegistered && !connectionRequest && !transactionRequest && !signRequest && (
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            padding="4"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="normal" color="text80">
              No pending confirmation
            </Text>
          </Box>
        )}
      </AnimatePresence>

      <Box alignItems="center" justifyContent="center" width="full">
        <AnimatePresence>
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            width="full"
            style={{ maxWidth: '400px' }}
          >
            {connectionRequest && (
              <Box
                marginTop="4"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="4"
              >
                <Text variant="medium" color="text80">
                  Connection request from dapp with origin <Text color="text100">{connectionRequest}</Text>
                </Text>
                <Box flexDirection="column" gap="2" marginTop="6">
                  <Text variant="normal" color="text80">
                    - This will share your wallet address with the dapp
                  </Text>
                  <Text variant="normal" color="text80">
                    - This will NOT allow the dapp to do any operations without your confirmation
                  </Text>
                </Box>
                <Box marginTop="6" gap="2">
                  <Button label="Reject" onClick={handleRejectConnection} />
                  <Button variant="primary" label="Approve" onClick={handleApproveConnection} />
                </Box>
              </Box>
            )}

            {(isSendingTxn || isSigningMessage) && (
              <Box alignItems="center" justifyContent="center" marginTop="4">
                <Spinner size="lg" color="text100" />
              </Box>
            )}

            {transactionRequest && transactionRequest.length > 0 && !isSendingTxn && (
              <Box
                marginTop="4"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="4"
                borderRadius="md"
                gap="2"
              >
                <TransactionDetails
                  transactions={transactionRequest}
                  chainId={txnChainId}
                  origin={txnOrigin}
                />

                {txnFeeOptions && feeOptionBalances.length > 0 && (
                  <FeeOptionSelector
                    txnFeeOptions={txnFeeOptions}
                    feeOptionBalances={feeOptionBalances}
                    selectedFeeOptionAddress={selectedFeeOptionAddress}
                    setSelectedFeeOptionAddress={setSelectedFeeOptionAddress}
                  />
                )}

                <Box marginTop="2" paddingBottom="10" gap="2">
                  <Button label="Reject" onClick={handleRejectTxn} disabled={!hasCheckedFeeOptions} />
                  <Button
                    variant="primary"
                    label="Approve"
                    onClick={handleApproveTxn}
                    disabled={
                      !hasCheckedFeeOptions ||
                      (txnFeeOptions && txnFeeOptions.length > 0 && !selectedFeeOptionAddress)
                    }
                  />
                </Box>
              </Box>
            )}

            {signRequest && !isSigningMessage && (
              <Box
                marginTop="4"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="4"
                borderRadius="md"
                gap="2"
              >
                <SignatureDetails message={signRequest.message} chainId={signChainId} origin={signOrigin} />
                <Box marginTop="4" marginBottom="2" gap="2">
                  <Button label="Reject" onClick={handleRejectSign} />
                  <Button variant="primary" label="Approve" onClick={handleApproveSign} />
                </Box>
              </Box>
            )}
          </Box>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
