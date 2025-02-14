import { Box, Button, ReceiveIcon, SendIcon } from '@0xsequence/design-system'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getIndexerClient } from '../utils/indexer'

import { useAuth } from '../context/AuthContext'

import { ROUTES } from '../routes'

import { Wallet } from './Wallet'

export const Home: React.FC = () => {
  const { address: accountAddress = '' } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const indexerClient = getIndexerClient()
    indexerClient.getTokenBalances({ accountAddress }).then(console.log)
  }, [])
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
      <Box width="full" flexDirection="column" gap="2" style={{ maxWidth: '400px' }} padding="4">
        <Box flexDirection="row" gap="2" alignItems="center">
          <Button label="Send" leftIcon={SendIcon} onClick={() => navigate(ROUTES.SEND)} />
          <Button label="Receive" leftIcon={ReceiveIcon} onClick={() => navigate(ROUTES.SEND)} />
        </Box>
        <Wallet />
      </Box>
    </Box>
  )
}
