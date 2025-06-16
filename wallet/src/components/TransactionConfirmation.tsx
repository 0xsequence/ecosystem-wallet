import { Button, Card, ChevronRightIcon, GradientAvatar, Spinner } from '@0xsequence/design-system'
import { FeeOption } from '@0xsequence/waas'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { truncateAtMiddle } from '../utils/helpers'
import { INDEXER_CLIENT_GATEWAY } from '../utils/indexer'

import { useAuth } from '../context/AuthContext'

import { FeeOptionSelector } from './FeeOptionSelector'
import { SendItemInfo } from './SendItemInfo'

interface TransactionConfirmationProps {
  name: string
  symbol: string
  imageUrl?: string
  amount: string
  toAddress: string
  showSquareImage?: boolean
  fiatValue?: string
  chainId: number
  balance: string
  decimals: number
  feeOptions?: {
    options: FeeOption[]
    chainId: number
  }
  onSelectFeeOption?: (feeTokenAddress: string | null) => void
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const useFeeOptionBalances = (feeOptions: TransactionConfirmationProps['feeOptions'], chainId: number) => {
  const { address: accountAddress = '' } = useAuth()

  return useQuery({
    queryKey: ['feeOptionBalances', chainId, accountAddress, feeOptions?.options?.length],
    queryFn: async () => {
      if (!feeOptions?.options || !accountAddress) return []

      const nativeTokenBalance = await INDEXER_CLIENT_GATEWAY.getNativeTokenBalance({
        accountAddress
      })

      const tokenBalances = await INDEXER_CLIENT_GATEWAY.getTokenBalances({
        accountAddress
      })

      return feeOptions.options.map(option => {
        if (option.token.contractAddress === null) {
          return {
            tokenName: option.token.name,
            decimals: option.token.decimals || 0,
            balance: nativeTokenBalance.balances.find(b => b.chainId === chainId)?.result.balance || '0'
          }
        } else {
          return {
            tokenName: option.token.name,
            decimals: option.token.decimals || 0,
            balance:
              tokenBalances.balances
                .find(b => b.chainId === chainId)
                ?.results.find(
                  result =>
                    result.contractAddress.toLowerCase() === option.token.contractAddress?.toLowerCase()
                )?.balance || '0'
          }
        }
      })
    },
    enabled: Boolean(feeOptions?.options && accountAddress),
    refetchInterval: 10000,
    staleTime: 10000
  })
}

export const TransactionConfirmation = ({
  name,
  symbol,
  imageUrl,
  amount,
  toAddress,
  showSquareImage,
  fiatValue,
  chainId,
  balance,
  decimals,
  feeOptions,
  onSelectFeeOption,
  isLoading,
  onConfirm,
  onCancel
}: TransactionConfirmationProps) => {
  const [selectedFeeOptionAddress, setSelectedFeeOptionAddress] = useState<string>()
  const { data: feeOptionBalances = [] } = useFeeOptionBalances(feeOptions, chainId)

  const handleFeeOptionSelect = (address: string) => {
    setSelectedFeeOptionAddress(address)
    onSelectFeeOption?.(address)
  }

  const isFeeSelectionRequired = Boolean(feeOptions?.options?.length)
  const isConfirmDisabled = isFeeSelectionRequired && !selectedFeeOptionAddress

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-2 w-full">
        <div className=" rounded-md p-4 pb-3 flex flex-col gap-4 ">
          <SendItemInfo
            imageUrl={imageUrl}
            showSquareImage={showSquareImage}
            name={name}
            symbol={symbol}
            chainId={chainId}
            balance={balance}
            decimals={decimals}
          />

          <div className=" flex flex-col gap-1 ">
            <span className=" text-sm font-bold">Amount</span>
            <Card className="w-full flex flex-row items-center rounded-md min-h-[3rem] px-4 py-3 bg-background-secondary">
              <div className="flex flex-row items-center gap-2 w-full justify-between">
                <span className="text-sm font-bold">
                  {amount} {symbol}
                </span>
                {fiatValue && <span className="text-sm font-bold">~${fiatValue}</span>}
              </div>
            </Card>
          </div>
          <div className=" flex flex-col gap-1">
            <span className=" text-sm font-bold">To</span>

            <Card className="w-full flex flex-row items-center rounded-md min-h-[3rem] px-3 py-2 bg-background-secondary">
              <div className="flex justify-center items-center gap-2">
                <GradientAvatar address={toAddress} className="size-5" />
                <span className="">{`0x${truncateAtMiddle(toAddress.substring(2), 10)}`}</span>
              </div>
            </Card>
          </div>

          {isFeeSelectionRequired && feeOptions?.options && (
            <div className=" flex flex-col gap-1">
              <FeeOptionSelector
                txnFeeOptions={feeOptions.options}
                feeOptionBalances={feeOptionBalances}
                selectedFeeOptionAddress={selectedFeeOptionAddress}
                setSelectedFeeOptionAddress={handleFeeOptionSelect}
              />
            </div>
          )}
        </div>

        <div className="flex mt-auto mb-0 gap-2 w-full sticky bottom-0 p-4 shadow-[0_-1px_3px_-1.5px_theme(color.black/10%)]">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <Button
                className="flex-1 rounded-md"
                onClick={onConfirm}
                label="Confirm"
                variant="primary"
                rightIcon={ChevronRightIcon}
                disabled={isConfirmDisabled}
              />
              <Button className="bg-button-glass rounded-md " onClick={onCancel} label="Cancel" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
