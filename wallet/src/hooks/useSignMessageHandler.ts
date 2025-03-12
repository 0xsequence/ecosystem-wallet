import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { BaseError, UserRejectedRequestError } from 'viem'

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

  console.log(signRequest, requestOrigin, requestChainId, isSigningMessage, isSignHandlerRegistered)

  const signConfirmationPromiseRef = useRef<Deferred<boolean> | null>(null)

  useEffect(() => {
    walletTransport.registerHandler(HandlerType.SIGN, async request => {
      const { params, chainId, origin, method } = request

      if (origin) {
        setRequestOrigin(origin)
      }
      if (chainId) {
        setRequestChainId(chainId)
      }

      let messageToDisplay: string
      let messageToSign: string

      if (method === 'eth_signTypedData' || method === 'eth_signTypedData_v4') {
        const typedData = JSON.parse(params[1]) // For typed data, the data is the second parameter

        // Generate the digest
        messageToSign = typedData

        messageToDisplay = JSON.stringify(typedData, null, 2)
      } else {
        // Regular message signing (eth_sign or personal_sign)
        messageToSign = params[0]
        messageToDisplay = ethers.toUtf8String(messageToSign)
      }

      setSignRequest({ message: messageToDisplay })
      setIsSignHandlerRegistered(true)

      const deferred = new Deferred<boolean>()
      signConfirmationPromiseRef.current = deferred

      const confirmation = await signConfirmationPromiseRef.current.promise

      if (!confirmation) {
        return new UserRejectedRequestError(new Error('User rejected signature request'))
      }

      setIsSigningMessage(true)

      try {
        let result

        if (method === 'eth_signTypedData' || method === 'eth_signTypedData_v4') {
          result = await sequenceWaas.signTypedData({
            typedData: messageToSign,
            network: chainId
          })
        } else {
          result = await sequenceWaas.signMessage({
            message: messageToSign,
            network: chainId
          })
        }

        return result
      } catch (error) {
        throw new BaseError(error instanceof Error ? error.message : 'Failed to sign message')
      } finally {
        setIsSigningMessage(false)
        setSignRequest(undefined)
      }
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
