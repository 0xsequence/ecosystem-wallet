import { Box, Image, Text } from '@0xsequence/design-system'
import { Link, Outlet } from 'react-router'

import { AccountMenu } from './components/AccountMenu'
import { PoweredBySequence } from './components/PoweredBySequence'
import { PrivateRoute } from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'
import { ROUTES } from './routes'

const PROJECT_SMALL_LOGO = import.meta.env.VITE_PROJECT_SMALL_LOGO

const AppHeader = () => {
  return (
    <Box
      flexDirection="row"
      gap="4"
      background="backgroundRaised"
      backdropFilter="blur"
      padding="4"
      alignItems="center"
      justifyContent="space-between"
    >
      {PROJECT_SMALL_LOGO && (
        <Link to={ROUTES.HOME}>
          <Image src={PROJECT_SMALL_LOGO} style={{ width: '30px', height: '30px' }} />
        </Link>
      )}
      <Box flexGrow="1" flexDirection="row" gap="10" justifyContent="center">
        <Link to={ROUTES.INVENTORY}>
          <Text variant="large" color="text100" fontWeight="bold">
            {' '}
            Inventory
          </Text>
        </Link>
        <Link to={ROUTES.DISCOVER}>
          <Text variant="large" color="text100" fontWeight="bold">
            Discover
          </Text>
        </Link>
        <Link to={ROUTES.MARKET}>
          <Text variant="large" color="text100" fontWeight="bold">
            Market
          </Text>
        </Link>
      </Box>
      <AccountMenu />
    </Box>
  )
}

export const AppLayout = () => {
  const { authState } = useAuth()
  const isAuth = authState.status === 'signedIn'
  return (
    <Box minHeight="vh" position="relative" paddingBottom="14">
      {isAuth && <AppHeader />}
      <Outlet />
      <PoweredBySequence />
    </Box>
  )
}

export const ProtectedLayout = () => {
  return (
    <PrivateRoute>
      <AppLayout />
    </PrivateRoute>
  )
}
