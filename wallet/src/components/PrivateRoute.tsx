import { Box, Spinner } from '@0xsequence/design-system'
import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useAuth } from '../context/AuthContext'

import { ROUTES, isPublicRoute } from '../routes'

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { authState } = useAuth()
  const location = useLocation()

  if (authState.status === 'loading') {
    return (
      <Box alignItems="center" justifyContent="center" style={{ height: 'calc(100vh - 24px)' }}>
        <Spinner size="lg" />
      </Box>
    )
  }

  if (authState.status !== 'signedIn' && !isPublicRoute(location.pathname)) {
    return <Navigate to={ROUTES.AUTH} state={{ from: location }} replace />
  }

  return <>{children}</>
}
