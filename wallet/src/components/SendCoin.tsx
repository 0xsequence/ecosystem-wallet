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
  compareAddress,
  nativeTokenImageUrl
} from '@0xsequence/design-system'
import { NativeTokenBalance, TokenBalance } from '@0xsequence/indexer'
import { ChainId } from '@0xsequence/network'
import { FeeOption, isSentTransactionResponse } from '@0xsequence/waas'
import { ethers } from 'ethers'
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react'

import { computeBalanceFiat } from '../utils/balance'
import { checkTransactionFeeOptions } from '../utils/feeOptions'
import { isEthAddress, limitDecimals, truncateAtMiddle } from '../utils/helpers'

import { useAuth } from '../context/AuthContext'

import { useCoinPrices, useExchangeRate } from '../hooks/useCoinPrices'
import { useConfig } from '../hooks/useConfig'

import { ERC_20_ABI } from '../constants'
import { sequenceWaas } from '../waasSetup'

// import { SendItemInfo } from './SendItemInfo'
// import { TransactionConfirmation } from './TransactionConfirmation'

interface SendCoinProps {
  chainId: number
  balance: NativeTokenBalance | TokenBalance
}

export const isNativeCoinBalance = (
  balance: NativeTokenBalance | TokenBalance
): balance is NativeTokenBalance => {
  return compareAddress(balance.accountAddress, ethers.ZeroAddress)
}

export const SendCoin = ({ chainId, balance }: SendCoinProps) => {
  const { fiatCurrency } = useConfig()
  const { address: accountAddress = '' } = useAuth()
  const amountInputRef = useRef<HTMLInputElement>(null)
  const [amount, setAmount] = useState<string>('0')
  const [toAddress, setToAddress] = useState<string>('')
  const [isSendTxnPending, setIsSendTxnPending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [feeOptions, setFeeOptions] = useState<{ chainId: ChainId; options: FeeOption[] }>()
  const [isCheckingFeeOptions, setIsCheckingFeeOptions] = useState(false)
  const isNativeCoin = isNativeCoinBalance(balance)

  // const nativeTokenInfo = getNativeTokenInfoByChainId(chainId, chains)
  const tokenBalance = balance.balance
  // const tokenBalance = (balances).find(b => b.results .contractAddress === contractAddress)
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

  // Handle fee option confirmation when pendingFeeOption is available
  // useEffect(() => {
  //   if (pendingFeeOption && selectedFeeTokenAddress !== null) {
  //     confirmFeeOption(pendingFeeOption.id, selectedFeeTokenAddress)
  //   }
  // }, [pendingFeeOption, selectedFeeTokenAddress])

  if (isPending) {
    return null
  }

  const decimals = isNativeCoin ? 18 : balance?.contractInfo?.decimals || 18
  const name = isNativeCoin ? 'TODO name' : balance?.contractInfo?.name || ''
  const imageUrl = isNativeCoin ? nativeTokenImageUrl(chainId) : balance?.contractInfo?.logoURI
  const symbol = isNativeCoin ? 'TODO symbol' : balance?.contractInfo?.symbol || ''
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
    const { value } = ev.target

    // Prevent value from having more decimals than the token supports
    const formattedValue = limitDecimals(value, decimals)

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

  const handleToAddressClear = () => {
    setToAddress('')
  }

  const handleSendClick = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsCheckingFeeOptions(true)

    const sendAmount = ethers.parseUnits(amountToSendFormatted, decimals)
    let transaction

    if (isNativeCoin) {
      transaction = {
        to: toAddress as `0x${string}`,
        value: BigInt(sendAmount.toString())
      }
    } else {
      transaction = {
        to: tokenBalance?.contractAddress as `0x${string}`,
        data: new ethers.Interface(ERC_20_ABI).encodeFunctionData('transfer', [
          toAddress,
          ethers.toQuantity(sendAmount)
        ]) as `0x${string}`
      }
    }

    // Check fee options before showing confirmation
    const feeOptionsResult = await checkTransactionFeeOptions({ transactions: [transaction] })

    setFeeOptions(
      feeOptionsResult?.feeOptions
        ? {
            options: feeOptionsResult.feeOptions,
            chainId
          }
        : undefined
    )

    setShowConfirmation(true)

    setIsCheckingFeeOptions(false)
  }

  const executeTransaction = async () => {
    setIsSendTxnPending(true)
    const sendAmount = ethers.parseUnits(amountToSendFormatted, decimals)

    if (isNativeCoin) {
      const tx = await sequenceWaas.sendTransaction({
        transactions: [
          {
            to: toAddress,
            value: ethers.parseEther(amount)
          }
        ],
        network: ChainId.SONEIUM,
        transactionsFeeOption: feeOption
        // transactionsFeeQuote: feeQuote
      })
    } else {
      const tx = await sequenceWaas.sendERC20({
        token: accountAddress,
        to: toAddress,
        value: sendAmount,
        // TODO check network
        network: ChainId.SONEIUM,
        transactionsFeeOption: feeOption
        // transactionsFeeQuote: feeQuote
      })
      if (isSentTransactionResponse(tx)) {
        // setTransactionHash(tx.data.txHash)
      } else {
        // setError(tx.data.error)
      }
    }
    setIsSendTxnPending(false)
  }

  return (
    <form
      className={`p-5 pt-3 gap-2 flex flex-col ${isSendTxnPending ? 'pointer-events-none' : 'pointer-events-auto'}`}
      onSubmit={handleSendClick}
    >
      {!showConfirmation && (
        <>
          <div className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
            {/* <SendItemInfo */}
            {/*   imageUrl={imageUrl} */}
            {/*   decimals={decimals} */}
            {/*   name={name} */}
            {/*   symbol={symbol} */}
            {/*   balance={tokenBalance?.balance || '0'} */}
            {/*   fiatValue={computeBalanceFiat({ */}
            {/*     balance: tokenBalance as TokenBalance, */}
            {/*     prices: coinPrices, */}
            {/*     conversionRate, */}
            {/*     decimals */}
            {/*   })} */}
            {/*   chainId={chainId} */}
            {/* /> */}
            <NumericInput
              ref={amountInputRef}
              // style={{ fontSize: vars.fontSizes.xlarge, fontWeight: vars.fontWeights.bold }}
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
              controls={
                <>
                  <Text variant="small" color="text50" whiteSpace="nowrap">
                    {`~${fiatCurrency.sign}${amountToSendFiat}`}
                  </Text>
                  <Button
                    size="xs"
                    shape="square"
                    label="Max"
                    onClick={handleMax}
                    data-id="maxCoin"
                    flexShrink="0"
                  />
                  <Text variant="xlarge" fontWeight="bold" color="text100">
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
          </div>
          <div className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
            <Text variant="normal" color="text50">
              To
            </Text>
            {isEthAddress(toAddress) ? (
              <Card
                clickable
                width="full"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                onClick={handleToAddressClear}
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
                placeholder={`TODO Address (0x...)`}
                // placeholder={`${nativeTokenInfo.name} Address (0x...)`}
                name="to-address"
                data-1p-ignore
                controls={
                  <Button
                    size="xs"
                    shape="square"
                    label="Paste"
                    onClick={handlePaste}
                    data-id="to-address"
                    flexShrink="0"
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
                className="h-14 rounded-md"
                color="text100"
                marginTop="3"
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

      {/* {showConfirmation && ( */}
      {/*   <TransactionConfirmation */}
      {/*     name={name} */}
      {/*     symbol={symbol} */}
      {/*     imageUrl={imageUrl} */}
      {/*     amount={amountToSendFormatted} */}
      {/*     toAddress={toAddress} */}
      {/*     chainId={chainId} */}
      {/*     balance={tokenBalance?.balance || '0'} */}
      {/*     decimals={decimals} */}
      {/*     fiatValue={amountToSendFiat} */}
      {/*     feeOptions={{ options: feeOptions || [], chainId }} */}
      {/*     onSelectFeeOption={feeTokenAddress => { */}
      {/*       setSelectedFeeTokenAddress(feeTokenAddress) */}
      {/*     }} */}
      {/*     isLoading={isSendTxnPending} */}
      {/*     onConfirm={executeTransaction} */}
      {/*     onCancel={() => { */}
      {/*       setShowConfirmation(false) */}
      {/*     }} */}
      {/*   /> */}
      {/* )} */}
    </form>
  )
}
