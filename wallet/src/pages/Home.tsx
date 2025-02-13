import { Box, Button, Collapsible, ReceiveIcon, SendIcon, Text } from '@0xsequence/design-system'
import { useNavigate } from 'react-router'
import { useSnapshot } from 'valtio'

import { useAssetBalance } from '../hooks/useBalancesSummary'
import { useConnectionHandler } from '../hooks/useConnectionHandler'
import { useSignMessageHandler } from '../hooks/useSignMessageHandler'
import { useTransactionHandler } from '../hooks/useTransactionHandler'

import { SearchAssets } from '../components/SearchAssets'

import { ROUTES } from '../routes'
import { walletConnectStore } from '../store/WalletConnectStore'

export const Home: React.FC = () => {
  const navigate = useNavigate()
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

  const { sessions } = useSnapshot(walletConnectStore.state)
  const activeWcSessions = sessions.filter(s => s.expiry * 1000 > Date.now())

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
      {!transactionRequest && !connectionRequest && !signRequest && (
        <Box width="full" style={{ maxWidth: '400px' }}>
          <Collapsible
            label={
              <Box flexDirection="column" alignItems="flex-start" justifyContent="center" gap="2">
                <Text color="text100">Assets</Text>
                {activeWcSessions.length > 0 && (
                  <Text color="text80" variant="small">
                    {activeWcSessions.length} Active Connection{activeWcSessions.length > 1 ? 's' : ''}
                  </Text>
                )}
              </Box>
            }
          >
            <SearchAssets />
          </Collapsible>
        </Box>
      )}
    </Box>
  )
}
