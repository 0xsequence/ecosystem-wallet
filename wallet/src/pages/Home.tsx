import { Box } from '@0xsequence/design-system'
import React from 'react'
import { NavLink } from 'react-router'

import { useAssetBalance } from '../hooks/useBalancesSummary'

import { ROUTES } from '../routes'

export const Home: React.FC = () => {
  // const {
  //   connectionRequest,
  //   handleApproveConnection,
  //   handleRejectConnection,
  //   isConnectionHandlerRegistered
  // } = useConnectionHandler()
  //
  // const {
  //   transactionRequest,
  //   requestOrigin: txnOrigin,
  //   requestChainId: txnChainId,
  //   isSendingTxn,
  //   txnFeeOptions,
  //   feeOptionBalances,
  //   selectedFeeOptionAddress,
  //   setSelectedFeeOptionAddress,
  //   hasCheckedFeeOptions,
  //   isRefreshingBalance,
  //   handleApproveTxn,
  //   handleRejectTxn,
  //   checkTokenBalancesForFeeOptions,
  //   isTransactionHandlerRegistered
  // } = useTransactionHandler()
  //
  // const {
  //   signRequest,
  //   requestOrigin: signOrigin,
  //   requestChainId: signChainId,
  //   isSigningMessage,
  //   handleApproveSign,
  //   handleRejectSign,
  //   isSignHandlerRegistered
  // } = useSignMessageHandler()
  //
  // const allHandlersRegistered =
  //   isConnectionHandlerRegistered && isTransactionHandlerRegistered && isSignHandlerRegistered
  //
  // const { sessions } = useSnapshot(walletConnectStore.state)
  // const activeWcSessions = sessions.filter(s => s.expiry * 1000 > Date.now())
  const {
    data: { coinBalances, collectionBalances },
    isPending,
    isError
  } = useAssetBalance()

  if (isError) {
    return <div>Error...</div>
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <Box marginTop="10" gap="2" paddingX="4" alignItems="center" justifyContent="center" width="full">
      <NavLink to={ROUTES.TOKENS}>Token {`${coinBalances.length > 0 ? coinBalances.length : ''}`}</NavLink>
      <NavLink to={ROUTES.COLLECTIBLES}>
        Collectibles {`${collectionBalances.length > 0 ? collectionBalances.length : ''}`}
      </NavLink>
      <NavLink to={ROUTES.SEND}> Send </NavLink>
      <NavLink to={ROUTES.TRANSACTIONS}> Transactions </NavLink>
    </Box>
  )
}
