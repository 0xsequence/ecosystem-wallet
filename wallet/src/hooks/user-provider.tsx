import { createContext, useContext, useState } from 'react'
import { sequenceWaas } from '../waasSetup'
import type { EmailConflictInfo } from '@0xsequence/waas'

type ErrorState = { type: 'email-conflict'; data: EmailConflictInfo } | false // No error state

export type UserContextValues = {
  wallet?: `0x${string}`
  status: 'idle' | 'pending' | 'connected' | 'otp' | 'error'
  error: ErrorState
  method?: 'apple' | 'google' | 'email' | 'guest'
  set: {
    wallet: React.Dispatch<React.SetStateAction<`0x${string}` | undefined>>
    status: React.Dispatch<React.SetStateAction<'idle' | 'pending' | 'error' | 'otp' | 'connected'>>
    error: React.Dispatch<React.SetStateAction<ErrorState>>
    method: React.Dispatch<React.SetStateAction<'apple' | 'google' | 'email' | 'guest' | undefined>>
  }
  signOut: () => void
  reset: () => void
  cancel: () => void
}

const UserContext = createContext<null | UserContextValues>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<UserContextValues['wallet']>()
  const [status, setStatus] = useState<UserContextValues['status']>('idle')
  const [method, setMethod] = useState<UserContextValues['method']>()
  const [error, setError] = useState<UserContextValues['error']>(false)
  const [isAuth] = useState<boolean>(false)
  //setAuthenticated
  // console.log(
  //   waasClient
  //     .isSignedIn()
  //     .then((res) => setAuthenticated(res))
  //     .catch((err) => console.log(err)),
  // );

  async function cancel(error: UserContextValues['error'] = false) {
    setError(error)
    setWallet(undefined)
    setStatus('idle')
    setMethod(undefined)
  }

  async function reset() {
    cancel()
    signOut()
  }

  async function signOut() {
    await sequenceWaas.dropSession()
  }

  const value = {
    isAuth,
    wallet,
    status,
    method,
    error,
    set: {
      wallet: setWallet,
      status: setStatus,
      method: setMethod,
      error: setError
    },
    signOut,
    reset,
    cancel
  } as UserContextValues

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    return {} as UserContextValues
    // throw new Error("useField must be used within a Field");
  }
  return context
}
