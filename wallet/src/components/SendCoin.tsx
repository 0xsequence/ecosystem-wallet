import {
  Button,
  Card,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  GradientAvatar,
  NumericInput,
  Spinner,
  Text,
  TextInput,
  nativeTokenImageUrl
} from '@0xsequence/design-system'
import { NativeTokenBalance, TokenBalance } from '@0xsequence/indexer'
import { ChainId, networks } from '@0xsequence/network'
import {
  MaySentTransactionResponse,
  SentTransactionResponse,
  Transaction,
  isSentTransactionResponse
} from '@0xsequence/waas'
import { ethers } from 'ethers'
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react'

import { computeBalanceFiat, isNativeCoinBalance } from '../utils/balance'
import { isEthAddress, limitDecimals, truncateAtMiddle } from '../utils/helpers'
import { TransactionFeeOptionsResult } from '../utils/txn'

import { useAuth } from '../context/AuthContext'

import { useCoinPrices, useExchangeRate } from '../hooks/useCoinPrices'
import { useConfig } from '../hooks/useConfig'
import { checkTransactionFeeOptions } from '../hooks/useTransactionHandler'

import { ERC_20_ABI } from '../constants'
import { sequenceWaas } from '../waasSetup'

import { SendItemInfo } from './SendItemInfo'
import { TransactionConfirmation } from './TransactionConfirmation'

interface SendCoinProps {
  chainId: number
  balance: NativeTokenBalance | TokenBalance
  onSuccess: (txnResponse: SentTransactionResponse) => void
}

export const SendCoin = ({ chainId, balance, onSuccess }: SendCoinProps) => {
  const { fiatCurrency } = useConfig()
  const { address: accountAddress = '' } = useAuth()
  const amountInputRef = useRef<HTMLInputElement>(null)
  const [amount, setAmount] = useState<string>('0')
  const [toAddress, setToAddress] = useState<string>('')
  const [isSendTxnPending, setIsSendTxnPending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [feeOptions, setFeeOptions] = useState<TransactionFeeOptionsResult>()
  const [isCheckingFeeOptions, setIsCheckingFeeOptions] = useState(false)
  const isNativeCoin = isNativeCoinBalance(balance)
  const [selectedFeeTokenAddress, setSelectedFeeTokenAddress] = useState<string | null>(null)

  console.log('SendCoinProps', { chainId, balance, onSuccess })

  const transactionsFeeOption = feeOptions?.feeOptions?.find(feeOption => {
    if (selectedFeeTokenAddress === ethers.ZeroAddress && feeOption.token.contractAddress === null)
      return true

    return feeOption.token.contractAddress === selectedFeeTokenAddress
  })

  const { data: coinPrices = [], isPending: isPendingCoinPrices } = useCoinPrices([
    {
      chainId,
      contractAddress: accountAddress
    }
  ])

  const { data: conversionRate = 1, isPending: isPendingConversionRate } = useExchangeRate(
    fiatCurrency.symbol
  )

  const isPending = isPendingCoinPrices || isPendingConversionRate

  if (isPending) {
    return null
  }

  const {
    name: nativeTokenName = 'Native Token',
    symbol: nativeTokenSymbol = '???',
    decimals: nativeTokenDecimals = 18
  } = networks[chainId as ChainId].nativeToken

  const decimals = isNativeCoin ? nativeTokenDecimals : balance?.contractInfo?.decimals || 18
  const name = isNativeCoin ? nativeTokenName : balance?.contractInfo?.name || ''
  const imageUrl = isNativeCoin ? nativeTokenImageUrl(chainId) : balance?.contractInfo?.logoURI
  const symbol = isNativeCoin ? nativeTokenSymbol : balance?.contractInfo?.symbol || ''
  const amountToSendFormatted = amount === '' ? '0' : amount
  const amountRaw = ethers.parseUnits(amountToSendFormatted, decimals)

  const amountToSendFiat = computeBalanceFiat({
    balance: {
      ...(balance as TokenBalance),
      balance: amountRaw.toString()
    },
    prices: coinPrices,
    conversionRate,
    decimals
  })

  const insufficientFunds = amountRaw > BigInt(balance.balance || '0')
  const isNonZeroAmount = amountRaw > 0n

  const handleChangeAmount = (ev: ChangeEvent<HTMLInputElement>) => {
    // Prevent value from having more decimals than the token supports
    const formattedValue = limitDecimals(ev.target.value, decimals)
    setAmount(formattedValue)
  }

  const handleMax = () => {
    amountInputRef.current?.focus()
    const maxAmount = ethers.formatUnits(balance.balance || 0, decimals).toString()

    setAmount(maxAmount)
  }

  const handlePaste = async () => {
    const result = await navigator.clipboard.readText()
    setToAddress(result)
  }

  const handleSendClick = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsCheckingFeeOptions(true)

      const sendAmount = ethers.parseUnits(amountToSendFormatted, decimals).toString()
      let transaction: Transaction

      if (isNativeCoin) {
        transaction = {
          to: toAddress,
          value: ethers.parseEther(amount)
        }
      } else {
        transaction = {
          to: balance?.accountAddress,
          data: new ethers.Interface(ERC_20_ABI).encodeFunctionData('transfer', [
            toAddress,
            ethers.toQuantity(sendAmount)
          ]) as `0x${string}`
        }
      }

      // Check fee options before showing confirmation
      const feeOptionsResult = await checkTransactionFeeOptions({ transactions: [transaction], chainId })

      setFeeOptions(feeOptionsResult)
      setShowConfirmation(true)
    } catch {
      // TODO error handling
    } finally {
      setIsCheckingFeeOptions(false)
    }
  }

  const executeTransaction = async () => {
    try {
      setIsSendTxnPending(true)

      let txResponse: MaySentTransactionResponse | undefined
      if (isNativeCoin) {
        txResponse = await sequenceWaas.sendTransaction({
          transactions: [
            {
              to: toAddress,
              value: ethers.parseEther(amount)
            }
          ],
          network: chainId,
          transactionsFeeOption,
          transactionsFeeQuote: feeOptions?.feeQuote
        })
      } else {
        txResponse = await sequenceWaas.sendERC20({
          token: balance.contractAddress,
          to: toAddress,
          value: ethers.parseUnits(amountToSendFormatted, decimals),
          network: chainId,
          transactionsFeeOption,
          transactionsFeeQuote: feeOptions?.feeQuote
        })
      }
      if (isSentTransactionResponse(txResponse)) {
        onSuccess(txResponse)
      } else {
        // TODO error handling
      }
    } catch {
      // TODO error handling
    } finally {
      setIsSendTxnPending(false)
    }
  }

  return (
    <form
      className={`py-3 gap-2 flex flex-col ${isSendTxnPending ? 'pointer-events-none' : 'pointer-events-auto'}`}
      onSubmit={handleSendClick}
    >
      {!showConfirmation && (
        <>
          <Card className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
            <SendItemInfo
              imageUrl={imageUrl}
              decimals={decimals}
              name={name}
              symbol={symbol}
              balance={balance?.balance || '0'}
              fiatValue={computeBalanceFiat({
                balance: balance as TokenBalance,
                prices: coinPrices,
                conversionRate,
                decimals
              })}
              chainId={chainId}
            />
            <NumericInput
              ref={amountInputRef}
              className="text-xl font-bold"
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
              controls={
                <>
                  <Text className="whitespace-nowrap text-style-sm" color="text50">
                    {`~${fiatCurrency.sign}${amountToSendFiat}`}
                  </Text>
                  <Button
                    className="shrink-0"
                    size="xs"
                    shape="square"
                    label="Max"
                    onClick={handleMax}
                    data-id="maxCoin"
                  />
                  <Text className="text-style-sm font-bold" color="text100">
                    {symbol}
                  </Text>
                </>
              }
            />
            {insufficientFunds && (
              <Text as="div" variant="normal" color="negative" marginTop="2">
                Insufficient Funds
              </Text>
            )}
          </Card>
          <div className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
            <Text variant="normal" color="text50">
              To
            </Text>
            {isEthAddress(toAddress) ? (
              <Card
                className="flex justify-between items-center"
                clickable
                width="full"
                onClick={() => setToAddress('')}
                style={{ height: '52px' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <GradientAvatar address={toAddress} style={{ width: '20px' }} />
                  <Text
                    color="text100"
                    variant="normal"
                  >{`0x${truncateAtMiddle(toAddress.substring(2), 10)}`}</Text>
                </div>
                <CloseIcon size="sm" color="white" />
              </Card>
            ) : (
              <TextInput
                value={toAddress}
                onChange={(ev: SyntheticEvent) => setToAddress((ev.target as HTMLInputElement).value)}
                placeholder={`${nativeTokenName} Address (0x...)`}
                name="to-address"
                data-1p-ignore
                controls={
                  <Button
                    size="xs"
                    shape="square"
                    label="Paste"
                    onClick={handlePaste}
                    data-id="to-address"
                    className="shrink-0"
                    leftIcon={CopyIcon}
                  />
                }
              />
            )}
          </div>

          <div className="h-14 flex items-center justify-center">
            {isCheckingFeeOptions ? (
              <Spinner />
            ) : (
              <Button
                className="h-14 rounded-md mt-3"
                color="text100"
                width="full"
                variant="primary"
                type="submit"
                disabled={!isNonZeroAmount || !isEthAddress(toAddress) || insufficientFunds}
                label="Send"
                rightIcon={ChevronRightIcon}
              />
            )}
          </div>
        </>
      )}

      {showConfirmation && (
        <TransactionConfirmation
          name={name}
          symbol={symbol}
          imageUrl={imageUrl}
          amount={amountToSendFormatted}
          toAddress={toAddress}
          chainId={chainId}
          balance={balance.balance || '0'}
          decimals={decimals}
          fiatValue={amountToSendFiat}
          feeOptions={{ options: feeOptions?.feeOptions || [], chainId }}
          onSelectFeeOption={setSelectedFeeTokenAddress}
          isLoading={isSendTxnPending}
          onConfirm={executeTransaction}
          onCancel={() => {
            setShowConfirmation(false)
          }}
        />
      )}
    </form>
  )
}
