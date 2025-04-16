import {
  AddIcon,
  Button,
  Card,
  CloseIcon,
  CopyIcon,
  GradientAvatar,
  NumericInput,
  Spinner,
  SubtractIcon,
  TextInput,
  useToast
} from '@0xsequence/design-system'
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
import { SendIcon } from '../design-system-patch/icons'
import { WrappedInput } from './wrapped-input'
import { TIME } from '../utils/time.const'
import { TokenRecord } from '../pages/InventoryRoutes/types'

interface SendCollectibleProps {
  chainId: number
  balance: TokenRecord
  onSuccess: (txnResponse: SentTransactionResponse) => void
}

export const SendCollectible = ({ chainId, balance: tokenBalance, onSuccess }: SendCollectibleProps) => {
  const { address: accountAddress } = useAuth()
  const toast = useToast()
  const amountInputRef = useRef<HTMLInputElement>(null)
  const [amount, setAmount] = useState<string>('0')
  const [toAddress, setToAddress] = useState<string>('')
  const [showAmountControls, setShowAmountControls] = useState<boolean>(false)
  const [isSendTxnPending, setIsSendTxnPending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isCheckingFeeOptions, setIsCheckingFeeOptions] = useState(false)
  const [selectedFeeTokenAddress, setSelectedFeeTokenAddress] = useState<string | null>(null)

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
          to: tokenBalance.contractAddress as `0x${string}`,
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
          to: tokenBalance.contractAddress as `0x${string}`,
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
      chainId: chainId
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

        toast({
          title: 'Transaction successful',
          variant: 'success',
          duration: TIME.SECOND * 1.5
        })
      } else {
        toast({
          title: 'Transaction failed',
          variant: 'error',
          duration: TIME.SECOND * 1.5
        })
      }
    } catch {
      toast({
        title: 'Transaction failed',
        variant: 'error',
        duration: TIME.SECOND * 1.5
      })
    } finally {
      setIsSendTxnPending(false)
    }
  }

  // const maxAmount = ethers.formatUnits(tokenBalance?.balance || 0, decimals).toString()

  // const isMinimum = Number(amount) === 0
  // const isMaximum = Number(amount) >= Number(maxAmount)

  return (
    <form
      className={`grid gap-2  ${isSendTxnPending ? 'pointer-events-none' : 'pointer-events-auto'}`}
      onSubmit={handleSendClick}
    >
      {!showConfirmation && (
        <div className="p-4 gap-2 flex flex-col">
          <Card className="bg-background-secondary  rounded-md p-4 gap-2 flex flex-col">
            <SendItemInfo
              imageUrl={imageUrl}
              showSquareImage
              decimals={decimals}
              name={name}
              symbol={''}
              balance={tokenBalance?.balance || '0'}
              chainId={chainId}
            />
            <WrappedInput>
              <NumericInput
                ref={amountInputRef}
                className="text-xl font-bold "
                name="amount"
                value={amount}
                onChange={handleChangeAmount}
                disabled={!showAmountControls}
                controls={
                  <>
                    {showAmountControls && (
                      <div className="flex gap-2">
                        <Button
                          size="xs"
                          className=" flex-shrin-0 bg-black/20"
                          onClick={handleSubtractOne}
                          leftIcon={SubtractIcon}
                        />
                        <Button
                          className=" flex-shrin-0 bg-black/20"
                          size="xs"
                          onClick={handleAddOne}
                          leftIcon={AddIcon}
                        />
                        <Button
                          size="xs"
                          shape="square"
                          label="Max"
                          onClick={handleMax}
                          data-id="maxCoin"
                          className="shrink-0  bg-black/20"
                        />
                      </div>
                    )}
                  </>
                }
              />
            </WrappedInput>
            {insufficientFunds && <span className="text-seq-red-700">Insufficient Balance</span>}
          </Card>
          <div className="bg-background-secondary rounded-md p-4 gap-2 flex flex-col">
            <span className=" text-sm font-bold">To</span>

            {isEthAddress(toAddress) ? (
              <Card
                className="w-full flex flex-row items-center rounded-md min-h-[3rem] px-3 py-2 bg-background-secondary justify-between"
                clickable
                width="full"
                onClick={handleToAddressClear}
                style={{ height: '52px' }}
              >
                <div className="flex justify-center items-center gap-2">
                  <GradientAvatar address={toAddress} style={{ width: '20px' }} />
                  <span className="">{`0x${truncateAtMiddle(toAddress.substring(2), 10)}`}</span>
                </div>
                <CloseIcon size="sm" color="black" />
              </Card>
            ) : (
              <WrappedInput>
                <TextInput
                  value={toAddress}
                  onChange={(ev: SyntheticEvent) => setToAddress((ev.target as HTMLInputElement).value)}
                  className=""
                  placeholder="Ethereum Address (0x...)"
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
                      className="shrink-0  bg-black/5"
                    />
                  }
                />
              </WrappedInput>
            )}
          </div>

          <div className="grid grid-cols-1 grid-rows-1 justify-center items-center min-h-[3rem]">
            {isCheckingFeeOptions ? (
              <div className="flex-shrink-0 rounded-md bg-black/50 flex items-center justify-center w-full col-start-1 row-start-1  min-h-[3rem]">
                <Spinner />
              </div>
            ) : (
              <Button
                className="flex-shrink-0 rounded-md w-full col-start-1 row-start-1  min-h-[3rem]"
                width="full"
                variant="primary"
                type="submit"
                disabled={!isNonZeroAmount || !isEthAddress(toAddress) || insufficientFunds}
                label="Send"
                leftIcon={SendIcon}
              />
            )}
          </div>
        </div>
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
