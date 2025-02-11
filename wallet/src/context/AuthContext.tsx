import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSnapshot } from 'valtio'

import { ROUTES } from '../routes'
import { sequenceWaas } from '../waasSetup'
import { WalletTransport } from '../walletTransport'

export const walletTransport = new WalletTransport()

type AuthState = { status: 'loading' } | { status: 'signedOut' } | { status: 'signedIn'; address: string }

interface AuthContextType {
  authState: AuthState
  pendingEventOrigin: string | undefined
  setWalletAddress: (address: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' })
  const walletTransportSnapshot = useSnapshot(walletTransport.state)

  useEffect(() => {
    sequenceWaas.isSignedIn().then(async signedIn => {
      if (signedIn) {
        const address = await sequenceWaas.getAddress()
        setAuthState({ status: 'signedIn', address })
        walletTransport.setSignedInState({ address })
      } else {
        setAuthState({ status: 'signedOut' })
        walletTransport.setSignedInState(null)
      }
    })
  }, [])

  const setWalletAddress = (address: string) => {
    setAuthState({ status: 'signedIn', address })
    walletTransport.setSignedInState({ address })
  }

  const signOut = async () => {
    try {
      setAuthState({ status: 'signedOut' })
      await sequenceWaas.dropSession()
      walletTransport.setSignedInState(null)
      localStorage.clear()
      navigate(ROUTES.AUTH)
    } catch {
      setAuthState(authState)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        pendingEventOrigin: walletTransportSnapshot.pendingEventOrigin,
        setWalletAddress,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
