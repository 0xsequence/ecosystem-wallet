import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { UserRejectedRequestError } from 'viem'

import { Deferred } from '../utils/promise'

import { walletTransport } from '../context/AuthContext'

import { sequenceWaas } from '../waasSetup'
import { HandlerType } from '../walletTransport'

export const useSignMessageHandler = () => {
  const [signRequest, setSignRequest] = useState<{ message: string } | undefined>()
  const [requestOrigin, setRequestOrigin] = useState<string | undefined>()
  const [requestChainId, setRequestChainId] = useState<number | undefined>()
  const [isSigningMessage, setIsSigningMessage] = useState(false)
  const [isSignHandlerRegistered, setIsSignHandlerRegistered] = useState(false)

  const signConfirmationPromiseRef = useRef<Deferred<boolean> | null>(null)

  useEffect(() => {
    walletTransport.registerHandler(HandlerType.SIGN, async request => {
      const { params, chainId, origin } = request

      if (origin) {
        setRequestOrigin(origin)
      }
      if (chainId) {
        setRequestChainId(chainId)
      }

      const message = params?.[0]
      setSignRequest({ message: ethers.toUtf8String(message) })
      setIsSignHandlerRegistered(true)

      const deferred = new Deferred<boolean>()
      signConfirmationPromiseRef.current = deferred

      const confirmation = await signConfirmationPromiseRef.current.promise

      if (!confirmation) {
        return new UserRejectedRequestError(new Error('User rejected signature request'))
      }

      setIsSigningMessage(true)

      const result = await sequenceWaas.signMessage({
        message: message,
        network: chainId
      })

      setIsSigningMessage(false)
      setSignRequest(undefined)

      return result
    })
  }, [])

  const handleApproveSign = () => {
    if (signConfirmationPromiseRef.current) {
      signConfirmationPromiseRef.current.resolve(true)
    }
  }

  const handleRejectSign = () => {
    if (signConfirmationPromiseRef.current) {
      signConfirmationPromiseRef.current.resolve(false)
      setSignRequest(undefined)
    }
  }

  return {
    signRequest,
    requestOrigin,
    requestChainId,
    isSigningMessage,
    handleApproveSign,
    handleRejectSign,
    isSignHandlerRegistered
  }
}
