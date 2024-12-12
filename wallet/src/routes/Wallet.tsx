import {
  Box,
  Button,
  Collapsible,
  Image,
  SignoutIcon,
  Spinner,
  Text,
  truncateAddress
} from '@0xsequence/design-system'
import { allNetworks } from '@0xsequence/network'
import { ethers } from 'ethers'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { useAuth } from '../context/AuthContext'

import { useConnectionHandler } from '../hooks/useConnectionHandler'
import { useSignMessageHandler } from '../hooks/useSignMessageHandler'
import { useTransactionHandler } from '../hooks/useTransactionHandler'

import { useConfirmDialog } from '../components/ConfirmDialogProvider'
import { CopyButton } from '../components/CopyButton'
import { FeeOptionSelector } from '../components/FeeOptionSelector'
import { NetworkImage } from '../components/NetworkImage'

const PROJECT_SMALL_LOGO = import.meta.env.VITE_PROJECT_SMALL_LOGO

const NetworkInfo: React.FC<{ chainId: number }> = ({ chainId }) => (
  <Box alignItems="center" justifyContent="center" flexDirection="row" gap="2">
    <Text variant="small" color="text80">
      on
    </Text>
    <NetworkImage chainId={chainId} size="sm" />
    <Text variant="small" color="text100">
      {allNetworks.find(n => n.chainId === chainId)?.title}
    </Text>
  </Box>
)

const WalletHeader: React.FC<{ address?: string; onSignOut: () => void }> = ({ address, onSignOut }) => (
  <Box
    flexDirection="row"
    gap="4"
    background="backgroundRaised"
    backdropFilter="blur"
    padding="4"
    alignItems="center"
  >
    {PROJECT_SMALL_LOGO && (
      <Box>
        <Image src={PROJECT_SMALL_LOGO} style={{ width: '30px', height: '30px' }} />
      </Box>
    )}
    {address && (
      <Box flexDirection="row" alignItems="center" justifyContent="center" gap="2">
        <Text variant="normal" color="text100" fontWeight="bold">
          {truncateAddress(address, 8, 6)}
        </Text>
        <CopyButton text={address} />
      </Box>
    )}
    <Button size="sm" leftIcon={SignoutIcon} onClick={onSignOut} marginLeft="auto" />
  </Box>
)

const TransactionDetails: React.FC<{
  transactions: ethers.Transaction[]
  chainId?: number
  origin?: string
}> = ({ transactions, chainId, origin }) => (
  <Box flexDirection="column" gap="2" width="full">
    <Text variant="medium" color="text100" fontWeight="bold" marginTop="6" textAlign="center">
      Transaction Request <br />
      <Text variant="small" color="text80">
        from origin <Text fontWeight="bold">{origin} </Text>
      </Text>
    </Text>
    <Box marginTop="2" flexDirection="column" gap="2" width="full">
      {transactions.map((txn, index) => (
        <Box key={index} flexDirection="column" gap="3" width="full">
          {chainId && <NetworkInfo chainId={chainId} />}
          <Collapsible label="Transaction data">
            <Box
              overflowX="scroll"
              background="backgroundSecondary"
              padding="4"
              borderRadius="md"
              style={{
                whiteSpace: 'pre',
                maxHeight: '300px'
              }}
            >
              <Text variant="code" color="text100">
                {JSON.stringify(txn, null, 2)}
              </Text>
            </Box>
          </Collapsible>
        </Box>
      ))}
    </Box>
  </Box>
)

const SignatureDetails: React.FC<{
  message: string
  chainId?: number
  origin?: string
}> = ({ message, chainId, origin }) => {
  // Check if the message is valid JSON
  const isJson = React.useMemo(() => {
    try {
      JSON.parse(message)
      return true
    } catch {
      return false
    }
  }, [message])

  return (
    <Box flexDirection="column" gap="2" width="full">
      <Text variant="medium" color="text100" fontWeight="bold" marginTop="6" textAlign="center">
        Signature Request <br />
        <Text variant="small" color="text80">
          from origin <Text fontWeight="bold">{origin} </Text>
        </Text>
      </Text>
      <Box marginTop="2" flexDirection="column" gap="2" width="full">
        {chainId && <NetworkInfo chainId={chainId} />}
        <Collapsible label="Message to sign:" open={true}>
          {isJson ? (
            <Box
              overflowX="scroll"
              background="backgroundSecondary"
              padding="4"
              borderRadius="md"
              style={{
                whiteSpace: 'pre',
                maxHeight: '250px'
              }}
            >
              <Text variant="code" color="text100">
                {message}
              </Text>
            </Box>
          ) : (
            <Text variant="small" color="text80" style={{ wordBreak: 'break-all' }}>
              {message}
            </Text>
          )}
        </Collapsible>
      </Box>
    </Box>
  )
}

export const Wallet: React.FC = () => {
  const { authState, signOut } = useAuth()
  const { confirmAction } = useConfirmDialog()

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
    isRefreshingBalance,
    handleApproveTxn,
    handleRejectTxn,
    checkTokenBalancesForFeeOptions,
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

  const handleSignOut = () => {
    confirmAction({
      title: 'Signing out',
      warningMessage: 'Are you sure you want to sign out?',
      confirmLabel: 'Sign out',
      onConfirm: async () => {
        signOut()
      },
      cancelLabel: 'Cancel',
      onCancel: () => {}
    })
  }

  return (
    <Box>
      <WalletHeader
        address={authState.status === 'signedIn' ? authState.address : undefined}
        onSignOut={handleSignOut}
      />

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

      <AnimatePresence>
        <Box as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {connectionRequest && (
            <Box marginTop="4" flexDirection="column" alignItems="center" justifyContent="center" padding="4">
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
              <TransactionDetails transactions={transactionRequest} chainId={txnChainId} origin={txnOrigin} />

              {txnFeeOptions && feeOptionBalances.length > 0 && (
                <FeeOptionSelector
                  txnFeeOptions={txnFeeOptions}
                  feeOptionBalances={feeOptionBalances}
                  selectedFeeOptionAddress={selectedFeeOptionAddress}
                  setSelectedFeeOptionAddress={setSelectedFeeOptionAddress}
                  checkTokenBalancesForFeeOptions={checkTokenBalancesForFeeOptions}
                  isRefreshingBalance={isRefreshingBalance}
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
  )
}
