import { FeeOption, Transaction } from '@0xsequence/waas'
import { ethers } from 'ethers'
import { ZeroAddress } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { UserRejectedRequestError } from 'viem'

import { Deferred } from '../utils/promise'

import { walletTransport } from '../context/AuthContext'
import { useAuth } from '../context/AuthContext'

import { sequenceWaas } from '../waasSetup'
import { HandlerType } from '../walletTransport'

const checkTransactionFeeOptions = async ({
  transactions,
  chainId
}: {
  transactions: Transaction[]
  chainId: number
}): Promise<{
  feeQuote: string | undefined
  feeOptions: FeeOption[] | undefined
  isSponsored: boolean
}> => {
  const resp = await sequenceWaas.feeOptions({
    transactions: transactions,
    network: chainId
  })

  if (resp.data.feeQuote && resp.data.feeOptions) {
    return {
      feeQuote: resp.data.feeQuote,
      feeOptions: resp.data.feeOptions,
      isSponsored: false
    }
  }
  return {
    feeQuote: resp.data.feeQuote,
    feeOptions: resp.data.feeOptions,
    isSponsored: true
  }
}

export const useTransactionHandler = () => {
  const { authState } = useAuth()
  const [transactionRequest, setTransactionRequest] = useState<ethers.Transaction[] | undefined>()
  const [requestOrigin, setRequestOrigin] = useState<string | undefined>()
  const [requestChainId, setRequestChainId] = useState<number | undefined>()
  const [isSendingTxn, setIsSendingTxn] = useState(false)
  const [hasCheckedFeeOptions, setHasCheckedFeeOptions] = useState(false)
  const [txnFeeOptions, setTxnFeeOptions] = useState<FeeOption[] | undefined>()
  const [selectedFeeOptionAddress, setSelectedFeeOptionAddress] = useState<string | undefined>()
  const [feeOptionBalances, setFeeOptionBalances] = useState<
    { tokenName: string; decimals: number; balance: string }[]
  >([])
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false)
  const [isTransactionHandlerRegistered, setIsTransactionHandlerRegistered] = useState(false)

  const txnConfirmationPromiseRef = useRef<Deferred<boolean> | null>(null)
  const feeOptionSelectionPromiseRef = useRef<Deferred<FeeOption | undefined> | null>(null)

  useEffect(() => {
    walletTransport.registerHandler(HandlerType.SEND_TRANSACTION, async request => {
      const { params, chainId, origin } = request

      if (origin) {
        setRequestOrigin(origin)
      }
      if (chainId) {
        setRequestChainId(chainId)
      }

      const txns: ethers.Transaction | ethers.Transaction[] = await ethers.resolveProperties(params?.[0])
      const txnsArray = Array.isArray(txns) ? txns : [txns]

      setTransactionRequest(txnsArray)
      setIsTransactionHandlerRegistered(true)

      txnConfirmationPromiseRef.current = new Deferred<boolean>()

      const feeOptionsResponse = await checkTransactionFeeOptions({
        transactions: txnsArray,
        chainId
      })
      const feeOptions = feeOptionsResponse?.feeOptions

      setHasCheckedFeeOptions(true)
      setTxnFeeOptions(feeOptions)

      feeOptionSelectionPromiseRef.current = new Deferred<FeeOption | undefined>()

      let selectedFeeOption: FeeOption | undefined

      if (feeOptions && feeOptions.length > 0) {
        const feeOptionSelection = await feeOptionSelectionPromiseRef.current.promise
        selectedFeeOption = feeOptionSelection

        if (!feeOptionSelection) {
          return new UserRejectedRequestError(new Error('User rejected transaction fee option selection'))
        }
      }

      const confirmation = await txnConfirmationPromiseRef.current.promise

      if (!confirmation) {
        return new UserRejectedRequestError(new Error('User rejected transaction request'))
      }

      setIsSendingTxn(true)

      const response = await sequenceWaas.sendTransaction({
        transactions: [txns] as Transaction[],
        network: chainId,
        transactionsFeeOption: selectedFeeOption,
        transactionsFeeQuote: feeOptionsResponse?.feeQuote
      })

      setIsSendingTxn(false)
      setTransactionRequest(undefined)

      return response
    })
  }, [])

  useEffect(() => {
    if (txnFeeOptions && txnFeeOptions.length > 0) {
      checkTokenBalancesForFeeOptions()
    }
  }, [txnFeeOptions])

  const checkTokenBalancesForFeeOptions = async () => {
    setIsRefreshingBalance(true)
    if (!requestChainId) {
      throw new Error('No chainId set for request')
    }

    if (authState.status !== 'signedIn') {
      throw new Error('User not signed in')
    }

    // const indexerClient = getIndexerClient()
    // const tokenBalances = await indexerClient.getTokenBalances({
    //   accountAddress: authState.address
    // })

    const balances =
      txnFeeOptions?.map(option => {
        if (option.token.contractAddress === null) {
          return {
            tokenName: option.token.name,
            decimals: option.token.decimals || 0,
            // TODO: update balance with new gateway response
            // balance: nativeTokenBalance.balance.balanceWei
             balance: "0"
          }
        } else {
          return {
            tokenName: option.token.name,
            decimals: option.token.decimals || 0,
            // TODO: update balance with new gateway response
            // balance:
            //   tokenBalances.balances.find(
            //     b => b.contractAddress.toLowerCase() === option.token.contractAddress?.toLowerCase()
            //   )?.balance || '0'
            balance: "0"
          }
        }
      }) || []

    setFeeOptionBalances(balances)
    setIsRefreshingBalance(false)
  }

  const handleApproveTxn = () => {
    if (txnConfirmationPromiseRef.current) {
      const option = txnFeeOptions?.find(
        option => (option.token.contractAddress ?? ZeroAddress) === selectedFeeOptionAddress
      )
      feeOptionSelectionPromiseRef.current?.resolve(option)
      txnConfirmationPromiseRef.current.resolve(true)
    }
  }

  const handleRejectTxn = () => {
    if (txnConfirmationPromiseRef.current) {
      feeOptionSelectionPromiseRef.current?.resolve(undefined)
      txnConfirmationPromiseRef.current.resolve(false)
      setTransactionRequest(undefined)
    }
  }

  return {
    transactionRequest,
    requestOrigin,
    requestChainId,
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
  }
}
