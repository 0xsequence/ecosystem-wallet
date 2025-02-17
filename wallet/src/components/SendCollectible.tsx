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
import { FeeOption } from '@0xsequence/waas'
import { ethers } from 'ethers'
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import { truncateAtMiddle } from '../utils/helpers'
import { isEthAddress, limitDecimals } from '../utils/helpers'
import { checkTransactionFeeOptions } from '../utils/txn'

import { useAuth } from '../context/AuthContext'

import { ERC_721_ABI, ERC_1155_ABI } from '../constants'
import { sequenceWaas } from '../waasSetup'

import { SendItemInfo } from './SendItemInfo'
import { TransactionConfirmation } from './TransactionConfirmation'

interface SendCollectibleProps {
  chainId: number
  tokenId: string
  balance: TokenBalance
}

export const SendCollectible = ({ chainId, tokenId, balance: tokenBalance }: SendCollectibleProps) => {
  const { address: accountAddress } = useAuth()
  // const {
  //   transactionRequest,
  //   requestOrigin,
  //   requestChainId,
  //   isSendingTxn,
  //   txnFeeOptions,
  //   feeOptionBalances,
  //   selectedFeeOptionAddress,
  //   setSelectedFeeOptionAddress,
  //   hasCheckedFeeOptions,
  //   isRefreshingBalance,
  //   handleApproveTxn,
  //   handleRejectTxn,
  //   checkTokenBalancesForFeeOptions,
  //   isTransactionHandlerRegistered
  // } = useTransactionHandler()
  const amountInputRef = useRef<HTMLInputElement>(null)
  const [amount, setAmount] = useState<string>('0')
  const [toAddress, setToAddress] = useState<string>('')
  const [showAmountControls, setShowAmountControls] = useState<boolean>(false)
  const [isSendTxnPending, setIsSendTxnPending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [feeOptions, setFeeOptions] = useState<
    | {
        options: FeeOption[]
        chainId: number
      }
    | undefined
  >()
  const [isCheckingFeeOptions, setIsCheckingFeeOptions] = useState(false)
  const [selectedFeeTokenAddress, setSelectedFeeTokenAddress] = useState<string | null>(null)

  const { contractType } = tokenBalance
  const decimals = tokenBalance?.tokenMetadata?.decimals || 0
  const name = tokenBalance?.tokenMetadata?.name || 'Unknown'
  const imageUrl = tokenBalance?.tokenMetadata?.image || tokenBalance?.contractInfo?.logoURI || ''
  const amountToSendFormatted = amount === '' ? '0' : amount
  const amountRaw = ethers.parseUnits(amountToSendFormatted, decimals)

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

  // useEffect(() => {
  //   if (pendingFeeOption && selectedFeeTokenAddress !== null) {
  //     confirmFeeOption(pendingFeeOption.id, selectedFeeTokenAddress)
  //   }
  // }, [pendingFeeOption, selectedFeeTokenAddress])

  const insufficientFunds = amountRaw > BigInt(tokenBalance?.balance || '0')
  const isNonZeroAmount = amountRaw > 0n

  const handleChangeAmount = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target

    // Prevent value from having more decimals than the token supports
    const formattedValue = limitDecimals(value, decimals)

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
            tokenId
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
            [tokenId],
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
    const sendAmount = ethers.parseUnits(amountToSendFormatted, decimals)

    switch (contractType) {
      case 'ERC721':
        setIsSendTxnPending(true)
        // _from, _to, _id
        sequenceWaas.sendTransaction({
          to: (tokenBalance as TokenBalance).contractAddress as `0x${string}`,
          data: new ethers.Interface(ERC_721_ABI).encodeFunctionData('safeTransferFrom', [
            accountAddress,
            toAddress,
            tokenId
          ]) as `0x${string}`,
          gas: null
        })
        break
      case 'ERC1155':
      default:
        setIsSendTxnPending(true)
        // _from, _to, _ids, _amounts, _data
        sequenceWaas.sendTransaction({
          to: (tokenBalance as TokenBalance).contractAddress as `0x${string}`,
          data: new ethers.Interface(ERC_1155_ABI).encodeFunctionData('safeBatchTransferFrom', [
            accountAddress,
            toAddress,
            [tokenId],
            [ethers.toQuantity(sendAmount)],
            new Uint8Array()
          ]) as `0x${string}`,
          gas: null
        })
    }
  }

  const maxAmount = ethers.formatUnits(tokenBalance?.balance || 0, decimals).toString()

  const isMinimum = Number(amount) === 0
  const isMaximum = Number(amount) >= Number(maxAmount)

  return (
    <form
      className={`grid gap-5 p-5 pt-3 ${isSendTxnPending ? 'pointer-events-none' : 'pointer-events-auto'}`}
      onSubmit={handleSendClick}
    >
      {!showConfirmation && (
        <>
          <div className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
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
              // style={{ fontSize: vars.fontSizes.xlarge, fontWeight: vars.fontWeights.bold }}
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
              disabled={!showAmountControls}
              controls={
                <>
                  {showAmountControls && (
                    <div className="grid gap-2">
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
                        flexShrink="0"
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
          </div>
          <div className="grid gap-2 p-4 rounded-md bg-background-secondary">
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
                // placeholder={`${nativeTokenInfo.name} Address (0x...)`}
                placeholder={`TODO Address (0x...)`}
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

          <div className="flex justify-center items-center h-12">
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

      {showConfirmation && (
        <TransactionConfirmation
          name={name}
          symbol=""
          imageUrl={imageUrl}
          amount={amountToSendFormatted}
          toAddress={toAddress}
          showSquareImage={true}
          chainId={chainId}
          balance={tokenBalance?.balance || '0'}
          decimals={decimals}
          feeOptions={feeOptions}
          onSelectFeeOption={feeTokenAddress => {
            setSelectedFeeTokenAddress(feeTokenAddress)
          }}
          isLoading={isSendTxnPending}
          onConfirm={() => {
            executeTransaction()
          }}
          onCancel={() => {
            setShowConfirmation(false)
          }}
        />
      )}
    </form>
  )
}
