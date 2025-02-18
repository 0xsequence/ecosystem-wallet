import {
  AddIcon,
  Button,
  Card,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  GradientAvatar,
  NumericInput,
  Spinner,
  SubtractIcon,
  Text,
  TextInput
} from '@0xsequence/design-system'
import { TokenBalance } from '@0xsequence/indexer'
import { ChainId, networks } from '@0xsequence/network'
import {
  MaySentTransactionResponse,
  SentTransactionResponse,
  isSentTransactionResponse
} from '@0xsequence/waas'
import { ethers } from 'ethers'
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import { truncateAtMiddle } from '../utils/helpers'
import { isEthAddress, limitDecimals } from '../utils/helpers'
import { TransactionFeeOptionsResult } from '../utils/txn'

import { useAuth } from '../context/AuthContext'

import { checkTransactionFeeOptions } from '../hooks/useTransactionHandler'

import { ERC_721_ABI, ERC_1155_ABI } from '../constants'
import { sequenceWaas } from '../waasSetup'

import { SendItemInfo } from './SendItemInfo'
import { TransactionConfirmation } from './TransactionConfirmation'

interface SendCollectibleProps {
  chainId: number
  balance: TokenBalance
  onSuccess: (txnResponse: SentTransactionResponse) => void
}

export const SendCollectible = ({ chainId, balance: tokenBalance, onSuccess }: SendCollectibleProps) => {
  const { address: accountAddress } = useAuth()
  const amountInputRef = useRef<HTMLInputElement>(null)
  const [amount, setAmount] = useState<string>('0')
  const [toAddress, setToAddress] = useState<string>('')
  const [showAmountControls, setShowAmountControls] = useState<boolean>(false)
  const [isSendTxnPending, setIsSendTxnPending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isCheckingFeeOptions, setIsCheckingFeeOptions] = useState(false)
  const [selectedFeeTokenAddress, setSelectedFeeTokenAddress] = useState<string | null>(null)

  const { name: nativeTokenName = 'Native Token' } = networks[chainId as ChainId].nativeToken
  const { contractType } = tokenBalance
  const decimals = tokenBalance?.tokenMetadata?.decimals || 0
  const name = tokenBalance?.tokenMetadata?.name || 'Unknown'
  const imageUrl = tokenBalance?.tokenMetadata?.image || tokenBalance?.contractInfo?.logoURI || ''
  const amountToSendFormatted = amount === '' ? '0' : amount
  const amountRaw = ethers.parseUnits(amountToSendFormatted, decimals)

  const [feeOptions, setFeeOptions] = useState<TransactionFeeOptionsResult>()
  const transactionsFeeOption = feeOptions?.feeOptions?.find(feeOption => {
    if (selectedFeeTokenAddress === ethers.ZeroAddress && feeOption.token.contractAddress === null)
      return true

    return feeOption.token.contractAddress === selectedFeeTokenAddress
  })

  useEffect(() => {
    if (tokenBalance) {
      if (contractType === 'ERC721') {
        setAmount('1')
        setShowAmountControls(false)
      } else if (contractType === 'ERC1155') {
        if (Number(ethers.formatUnits(tokenBalance?.balance || 0, decimals)) >= 1) {
          setAmount('1')
        }
        setShowAmountControls(true)
      }
    }
  }, [contractType, decimals, tokenBalance])

  const insufficientFunds = amountRaw > BigInt(tokenBalance?.balance || '0')
  const isNonZeroAmount = amountRaw > 0n

  const handleChangeAmount = (ev: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = limitDecimals(ev.target.value, decimals)

    setAmount(formattedValue)
  }

  const handleSubtractOne = () => {
    amountInputRef.current?.focus()
    const decrementedAmount = Number(amount) - 1

    const newAmount = Math.max(decrementedAmount, 0).toString()
    setAmount(newAmount)
  }

  const handleAddOne = () => {
    amountInputRef.current?.focus()
    const incrementedAmount = Number(amount) + 1
    const maxAmount = Number(ethers.formatUnits(tokenBalance?.balance || 0, decimals))

    const newAmount = Math.min(incrementedAmount, maxAmount).toString()

    setAmount(newAmount)
  }

  const handleMax = () => {
    amountInputRef.current?.focus()
    const maxAmount = ethers.formatUnits(tokenBalance?.balance || 0, decimals).toString()

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

    switch (contractType) {
      case 'ERC721':
        transaction = {
          to: (tokenBalance as TokenBalance).contractAddress as `0x${string}`,
          data: new ethers.Interface(ERC_721_ABI).encodeFunctionData('safeTransferFrom', [
            accountAddress,
            toAddress,
            tokenBalance.tokenID
          ]) as `0x${string}`
        }
        break
      case 'ERC1155':
      default:
        transaction = {
          to: (tokenBalance as TokenBalance).contractAddress as `0x${string}`,
          data: new ethers.Interface(ERC_1155_ABI).encodeFunctionData('safeBatchTransferFrom', [
            accountAddress,
            toAddress,
            [tokenBalance.tokenID],
            [ethers.toQuantity(sendAmount)],
            new Uint8Array()
          ]) as `0x${string}`
        }
    }

    // Check fee options before showing confirmation
    const feeOptionsResult = await checkTransactionFeeOptions({
      transactions: [transaction],
      chainId
    })

    setFeeOptions(feeOptionsResult)

    setShowConfirmation(true)
    setIsCheckingFeeOptions(false)
  }

  const executeTransaction = async () => {
    try {
      setIsSendTxnPending(true)
      const sendAmount = ethers.parseUnits(amountToSendFormatted, decimals)

      let txResponse: MaySentTransactionResponse | undefined

      if (contractType === 'ERC721') {
        txResponse = await sequenceWaas.sendERC721({
          to: toAddress,
          data: new ethers.Interface(ERC_721_ABI).encodeFunctionData('safeTransferFrom', [
            accountAddress,
            toAddress,
            tokenBalance.tokenID
          ]),
          token: tokenBalance.contractAddress,
          id: tokenBalance.tokenID || '',
          network: chainId,
          transactionsFeeOption,
          transactionsFeeQuote: feeOptions?.feeQuote
        })
      } else {
        txResponse = await sequenceWaas.sendERC1155({
          to: toAddress,
          data: new ethers.Interface(ERC_1155_ABI).encodeFunctionData('safeBatchTransferFrom', [
            accountAddress,
            toAddress,
            [tokenBalance.tokenID],
            [ethers.toQuantity(sendAmount)],
            new Uint8Array()
          ]) as `0x${string}`,
          values: [{ id: tokenBalance.tokenID || '', amount: ethers.toQuantity(sendAmount) }],
          token: tokenBalance.contractAddress,
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

  const maxAmount = ethers.formatUnits(tokenBalance?.balance || 0, decimals).toString()

  const isMinimum = Number(amount) === 0
  const isMaximum = Number(amount) >= Number(maxAmount)

  return (
    <form
      className={`grid gap-5 py-3 ${isSendTxnPending ? 'pointer-events-none' : 'pointer-events-auto'}`}
      onSubmit={handleSendClick}
    >
      {!showConfirmation && (
        <>
          <Card className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
            <SendItemInfo
              imageUrl={imageUrl}
              showSquareImage
              decimals={decimals}
              name={name}
              symbol={''}
              balance={tokenBalance?.balance || '0'}
              chainId={chainId}
            />
            <NumericInput
              ref={amountInputRef}
              className="text-xl font-bold"
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
              disabled={!showAmountControls}
              controls={
                <>
                  {showAmountControls && (
                    <div className="flex gap-2">
                      <Button
                        disabled={isMinimum}
                        size="xs"
                        onClick={handleSubtractOne}
                        leftIcon={SubtractIcon}
                      />
                      <Button disabled={isMaximum} size="xs" onClick={handleAddOne} leftIcon={AddIcon} />
                      <Button
                        size="xs"
                        shape="square"
                        label="Max"
                        onClick={handleMax}
                        data-id="maxCoin"
                        className="shrink-0"
                      />
                    </div>
                  )}
                </>
              }
            />
            {insufficientFunds && (
              <Text as="div" variant="normal" color="negative" marginTop="2">
                Insufficient Balance
              </Text>
            )}
          </Card>
          <div className="grid gap-2 p-4 rounded-md bg-background-secondary">
            <Text variant="normal" color="text50">
              To
            </Text>
            {isEthAddress(toAddress) ? (
              <Card
                className="flex items-center justify-between"
                clickable
                width="full"
                onClick={handleToAddressClear}
                style={{ height: '52px' }}
              >
                <div className="flex justify-center items-center gap-2">
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
                    leftIcon={CopyIcon}
                    className="shrink-0"
                  />
                }
              />
            )}
          </div>

          <div className="flex justify-center items-center h-12">
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
          symbol={''}
          imageUrl={imageUrl}
          amount={amountToSendFormatted}
          toAddress={toAddress}
          showSquareImage={true}
          chainId={chainId}
          balance={tokenBalance?.balance || '0'}
          decimals={decimals}
          feeOptions={{ chainId, options: feeOptions?.feeOptions || [] }}
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
