import { TokenPrice } from '@0xsequence/api'
import {
  Image,
  NetworkImage,
  Skeleton,
  Text,
  compareAddress,
  nativeTokenImageUrl
} from '@0xsequence/design-system'
import { Transaction, TxnTransfer, TxnTransferType } from '@0xsequence/indexer'
import { ChainId, networks } from '@0xsequence/network'
import dayjs from 'dayjs'
import { ethers } from 'ethers'

import { useCoinPrices, useExchangeRate } from '../../hooks/useCoinPrices'
import { useConfig, FiatCurrency } from '../../hooks/useConfig'
import { formatDisplay } from '../../utils/helpers'
import { getTransactionLabelByType } from './helpers/getTransactionLabelByType'
import { TransactionIconByType } from './TransactionIconByType'
import { useState } from 'react'
import { TransactionDetails } from './TransactionDetails'
import { ChevronDownIcon } from '../../design-system-patch/icons'

interface TransactionHistoryItemProps {
  transaction: Transaction
  onClickTransaction: (transaction: Transaction) => void
}

export const TransactionHistoryItem = ({ transaction }: TransactionHistoryItemProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const { fiatCurrency } = useConfig()

  const tokenContractAddresses: string[] = []

  transaction.transfers?.forEach(transfer => {
    const tokenContractAddress = transfer.contractAddress
    if (!tokenContractAddresses.includes(tokenContractAddress)) {
      tokenContractAddresses.push(tokenContractAddress)
    }
  })

  const { data: coinPrices = [], isPending: isPendingCoinPrices } = useCoinPrices(
    tokenContractAddresses.map(contractAddress => ({
      contractAddress,
      chainId: transaction.chainId
    }))
  )

  const { data: conversionRate = 1, isPending: isPendingConversionRate } = useExchangeRate(
    fiatCurrency.symbol
  )

  const isPending = isPendingCoinPrices || isPendingConversionRate

  const { transfers } = transaction

  function toggleTransactionDetails() {
    setShowDetails(current => !current)
  }

  return (
    <div className="bg-background-secondary backdrop-blur-2xl rounded-md justify-center grid grid-cols-1 focus-within:ring-2">
      <div className="flex flex-col px-4 pt-4 cursor-pointer" onClick={toggleTransactionDetails}>
        {transfers?.map((transfer, position) => {
          return (
            <div key={`${transaction.txnHash}-${position}`} className="w-full">
              <Transfer
                isPending={isPending}
                fiatCurrency={fiatCurrency}
                conversionRate={conversionRate}
                coinPrices={coinPrices}
                transaction={transaction}
                transfer={transfer}
                isFirstItem={position === 0}
              />
            </div>
          )
        })}
      </div>
      <button
        onClick={toggleTransactionDetails}
        type="button"
        className="self-start text-left  p-4 cursor-pointer flex justify-between gap-2 items-center  font-body text-sm leading-5 tracking-wide font-medium"
        aria-controls={`transaction-details-${transaction.txnHash}`}
        aria-expanded={showDetails}
      >
        <span>Details</span>
        <ChevronDownIcon
          className="size-4 transition-transform -rotate-90 data-[expanded='true']:rotate-0"
          data-expanded={showDetails}
        />
      </button>
      <div
        id={`transaction-details-${transaction.txnHash}`}
        aria-hidden={!showDetails}
        className="grid aria-hidden:grid-rows-[0fr] grid-rows-[1fr] overflow-hidden transition-all duration-300"
        data-inert={!showDetails}
        /** @ts-expect-error - inert unknown */
        inert={showDetails ? undefined : ''}
      >
        <div className="min-h-0">
          <div
            aria-hidden={!showDetails}
            className="aria-hidden:scale-90 transition-all aria-hidden:translate-y-2 aria-hidden:opacity-0 duration-300 px-4 pb-4"
          >
            <TransactionDetails transaction={transaction} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface TransferProps {
  isPending: boolean
  fiatCurrency: FiatCurrency
  conversionRate: number
  coinPrices: TokenPrice[]
  transaction: Transaction
  transfer: TxnTransfer
  isFirstItem: boolean
}
function Transfer({
  isPending,
  fiatCurrency,
  conversionRate,
  coinPrices,
  transaction,
  transfer,
  isFirstItem
}: TransferProps) {
  const { amounts } = transfer
  const date = dayjs(transaction.timestamp).format('MMM DD, YYYY')
  return (
    <div className="flex flex-col gap-2 w-full justify-between">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-1 justify-center items-center ">
          <TransactionIconByType transferType={transfer.transferType} />
          <Text variant="normal" fontWeight="medium" className="">
            {getTransactionLabelByType(transfer.transferType)}
          </Text>
          <NetworkImage chainId={transaction.chainId} size="xs" />
        </div>
        {isFirstItem && <span className="font-body text-sm leading-5 tracking-wide font-medium">{date}</span>}
      </div>
      {amounts.map((amount, index) => {
        const { symbol: nativeTokenSymbol = '???', decimals: nativeTokenDecimals = 18 } =
          networks[transaction.chainId as ChainId].nativeToken
        const isNativeToken = compareAddress(transfer.contractAddress, ethers.ZeroAddress)
        const isCollectible =
          transfer.contractInfo?.type === 'ERC721' || transfer.contractInfo?.type === 'ERC1155'
        let decimals
        const tokenId = transfer.tokenIds?.[index]
        if (isCollectible && tokenId) {
          decimals = transfer.tokenMetadata?.[tokenId]?.decimals || 0
        } else {
          decimals = isNativeToken ? nativeTokenDecimals : transfer.contractInfo?.decimals
        }
        const amountValue = ethers.formatUnits(amount, decimals)
        const symbol = isNativeToken ? nativeTokenSymbol : transfer.contractInfo?.symbol || ''
        const tokenLogoUri = isNativeToken
          ? nativeTokenImageUrl(transaction.chainId)
          : transfer.contractInfo?.logoURI

        const fiatConversionRate = coinPrices.find((coinPrice: TokenPrice) =>
          compareAddress(coinPrice.token.contractAddress, transfer.contractAddress)
        )?.price?.value

        return (
          <div key={index} className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 justify-center items-center">
              {tokenLogoUri && <Image src={tokenLogoUri} className="size-6" alt="token logo" />}
              <TransferAmountLabel
                amount={formatDisplay(amountValue)}
                symbol={symbol}
                transferType={transfer.transferType}
              />
            </div>
            {isPending && <Skeleton className="w-9 h-5" />}
            {fiatConversionRate && (
              <Text variant="normal" fontWeight="medium" className="">
                {`${fiatCurrency.sign}${(Number(amountValue) * fiatConversionRate * conversionRate).toFixed(
                  2
                )}`}
              </Text>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TransferAmountLabel({
  amount,
  symbol,
  transferType
}: {
  amount: string
  symbol: string
  transferType: TxnTransferType
}) {
  let sign = ''
  if (transferType === TxnTransferType.SEND) {
    sign = '-'
  } else if (transferType === TxnTransferType.RECEIVE) {
    sign = '+'
  }

  return (
    <span
      data-transfer-type={transferType}
      className="data-[transfer-type='SEND']:text-red-500  data-[transfer-type='RECEIVE']:text-green-700 font-body text-sm leading-5 tracking-wide font-medium"
    >{`${sign}${amount} ${symbol}`}</span>
  )
}
