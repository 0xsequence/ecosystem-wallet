import { useEffect, useRef, useState } from 'react'

import { Deferred } from '../utils/promise'

import { walletTransport } from '../context/AuthContext'

export const useConnectionHandler = () => {
  const [connectionRequest, setConnectionRequest] = useState<string | undefined>()
  const connectionPromiseRef = useRef<Deferred<boolean> | null>(null)
  const [isConnectionHandlerRegistered, setIsConnectionHandlerRegistered] = useState(false)

  useEffect(() => {
    walletTransport.setConnectionPromptCallback(async (origin: string) => {
      setConnectionRequest(origin)
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
    handleApproveConnection,
    handleRejectConnection,
    isConnectionHandlerRegistered
  }
}
