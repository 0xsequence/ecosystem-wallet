import { Button, Card, ChevronRightIcon, GradientAvatar, Spinner, Text } from '@0xsequence/design-system'
import { FeeOption } from '@0xsequence/waas'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { truncateAtMiddle } from '../utils/helpers'
import { getIndexerClient } from '../utils/indexer'

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
  const indexerClient = getIndexerClient()

  return useQuery({
    queryKey: ['feeOptionBalances', chainId, accountAddress, feeOptions?.options?.length],
    queryFn: async () => {
      if (!feeOptions?.options || !accountAddress || !indexerClient) return []

      const nativeTokenBalance = await indexerClient.getNativeTokenBalance({
        accountAddress
      })

      const tokenBalances = await indexerClient.getTokenBalances({
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
                ?.results.find(result => result.contractAddress === option.token.contractAddress)?.balance ||
              '0'
          }
        }
      })
    },
    enabled: Boolean(feeOptions?.options && accountAddress && indexerClient),
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
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="flex flex-col gap-2 bg-black w-full">
        <div className="bg-background-secondary rounded-md p-4 pb-3 flex flex-col gap-2">
          <SendItemInfo
            imageUrl={imageUrl}
            showSquareImage={showSquareImage}
            name={name}
            symbol={symbol}
            chainId={chainId}
            balance={balance}
            decimals={decimals}
          />

          <div className="mt-2 flex flex-col gap-1">
            <Text variant="small" color="text50">
              Amount
            </Text>
            <div className="flex flex-row items-center gap-2">
              <Text variant="normal" color="text100">
                {amount} {symbol}
              </Text>
              {fiatValue && (
                <Text variant="small" color="text50">
                  ~${fiatValue}
                </Text>
              )}
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <Text variant="small" color="text50">
              To
            </Text>
            <Card className="w-full flex flex-row items-center" style={{ height: '52px' }}>
              <div className="flex flex-row items-center justify-center gap-2">
                <GradientAvatar address={toAddress} style={{ width: '20px' }} />
                <Text
                  color="text100"
                  variant="normal"
                >{`0x${truncateAtMiddle(toAddress.substring(2), 10)}`}</Text>
              </div>
            </Card>
          </div>

          {isFeeSelectionRequired && feeOptions?.options && (
            <FeeOptionSelector
              txnFeeOptions={feeOptions.options}
              feeOptionBalances={feeOptionBalances}
              selectedFeeOptionAddress={selectedFeeOptionAddress}
              setSelectedFeeOptionAddress={handleFeeOptionSelect}
            />
          )}
        </div>

        <div className="mt-3 flex gap-2">
          {isLoading ? (
            <div className="w-full flex items-center justify-center" style={{ height: '52px' }}>
              <Spinner />
            </div>
          ) : (
            <>
              <Button
                className="w-full"
                variant="primary"
                onClick={onConfirm}
                label="Confirm"
                rightIcon={ChevronRightIcon}
                disabled={isConfirmDisabled}
                style={{ height: '52px', borderRadius: '0.375rem' }}
              />
              <Button
                className="w-full"
                variant="glass"
                onClick={onCancel}
                label="Cancel"
                style={{ height: '52px', borderRadius: '0.375rem' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
