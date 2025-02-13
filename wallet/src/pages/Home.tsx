import { Box, Button, ReceiveIcon, SendIcon } from '@0xsequence/design-system'
import { useNavigate } from 'react-router'

// import { useSnapshot } from 'valtio';
// import { useConnectionHandler } from '../hooks/useConnectionHandler';
// import { useSignMessageHandler } from '../hooks/useSignMessageHandler';
// import { useTransactionHandler } from '../hooks/useTransactionHandler'
// import { walletConnectStore } from '../store/WalletConnectStore'
import { ROUTES } from '../routes'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  // const {
  //   connectionRequest,
  //   handleApproveConnection,
  //   handleRejectConnection,
  //   isConnectionHandlerRegistered
  // } = useConnectionHandler()

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

  // const {
  //   signRequest,
  //   requestOrigin: signOrigin,
  //   requestChainId: signChainId,
  //   isSigningMessage,
  //   handleApproveSign,
  //   handleRejectSign,
  //   isSignHandlerRegistered
  // } = useSignMessageHandler()

  // const allHandlersRegistered =
  //   isConnectionHandlerRegistered && isTransactionHandlerRegistered && isSignHandlerRegistered

  // const { sessions } = useSnapshot(walletConnectStore.state)
  // const activeWcSessions = sessions.filter(s => s.expiry * 1000 > Date.now())

  return (
    <Box
      maxWidth="1/2"
      marginTop="10"
      marginX="auto"
      paddingX="4"
      flexDirection="column"
      gap="4"
      alignItems="center"
      justifyContent="center"
      width="full"
    >
      <Box width="full" flexDirection="row" gap="2" style={{ maxWidth: '400px' }}>
        <Button label="Send" leftIcon={SendIcon} onClick={() => navigate(ROUTES.SEND)} />
        <Button label="Receive" leftIcon={ReceiveIcon} onClick={() => navigate(ROUTES.SEND)} />
      </Box>
    </Box>
  )
}
