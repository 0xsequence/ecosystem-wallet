import { useEffect, useRef, useState } from 'react'

import { Deferred } from '../utils/promise'

import { walletTransport } from '../context/AuthContext'

export const useConnectionHandler = () => {
  const [connectionRequest, setConnectionRequest] = useState<string | undefined>()
  // This is the email dapp requested to initiate login with, we need this here so that we can handle the case where user is already logged in and we need to show user a warning if email does not match. Something like "You are logged in with `auth method` - `email` but requested to connect with `emailFromAuxData`, approve this connection request to continue with your current account."
  const [emailFromAuxData, setEmailFromAuxData] = useState<string | undefined>()
  const connectionPromiseRef = useRef<Deferred<boolean> | null>(null)
  const [isConnectionHandlerRegistered, setIsConnectionHandlerRegistered] = useState(false)

  useEffect(() => {
    walletTransport.setConnectionPromptCallback(async (origin: string, emailFromAuxData?: string) => {
      setConnectionRequest(origin)
      setEmailFromAuxData(emailFromAuxData)
      const deferred = new Deferred<boolean>()
      connectionPromiseRef.current = deferred
      setIsConnectionHandlerRegistered(true)
      return deferred.promise
    })
  }, [])

  const handleApproveConnection = () => {
    if (connectionPromiseRef.current) {
      connectionPromiseRef.current.resolve(true)
      setConnectionRequest(undefined)
    }
  }

  const handleRejectConnection = () => {
    if (connectionPromiseRef.current) {
      connectionPromiseRef.current.resolve(false)
      setConnectionRequest(undefined)
    }
  }

  return {
    connectionRequest,
    emailFromAuxData,
    handleApproveConnection,
    handleRejectConnection,
    isConnectionHandlerRegistered
  }
}
