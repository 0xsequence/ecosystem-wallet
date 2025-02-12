import { Box, Card, Text } from '@0xsequence/design-system'
import { Link } from 'react-router'

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
    <Box
      maxWidth="1/2"
      marginTop="10"
      marginX="auto"
      gap="2"
      paddingX="4"
      alignItems="center"
      justifyContent="center"
      width="full"
    >
      <Card>
        <Link to={ROUTES.TOKENS}>
          <Text color="text80">Token {`${coinBalances.length > 0 ? `(${coinBalances.length})` : ''}`}</Text>
        </Link>
      </Card>
      <Card>
        <Link to={ROUTES.COLLECTIBLES}>
          <Text color="text80">
            Collectibles {`${collectionBalances.length > 0 ? `(${collectionBalances.length})` : ''}`}
          </Text>
        </Link>
      </Card>
      <Card>
        <Link to={ROUTES.SEND}>
          <Text color="text80">Send</Text>
        </Link>
      </Card>
      <Card>
        <Link to={ROUTES.TRANSACTIONS}>
          <Text color="text80">Transactions</Text>
        </Link>
      </Card>
    </Box>
  )
}
