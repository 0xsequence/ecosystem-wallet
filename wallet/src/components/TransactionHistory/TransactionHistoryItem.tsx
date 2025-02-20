import { TokenPrice } from '@0xsequence/api'
import {
  ArrowRightIcon,
  Image,
  NetworkImage,
  Skeleton,
  Text,
  TransactionIcon,
  compareAddress,
  nativeTokenImageUrl
} from '@0xsequence/design-system'
import { Transaction, TxnTransfer, TxnTransferType } from '@0xsequence/indexer'
import { ChainId, networks } from '@0xsequence/network'
import dayjs from 'dayjs'
import { ethers } from 'ethers'

import { useCoinPrices, useExchangeRate } from '../../hooks/useCoinPrices'
import { useConfig } from '../../hooks/useConfig'
import { formatDisplay } from '../../utils/helpers'

interface TransactionHistoryItemProps {
  transaction: Transaction
  onClickTransaction: (transaction: Transaction) => void
}

export const TransactionHistoryItem = ({ transaction, onClickTransaction }: TransactionHistoryItemProps) => {
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

  const getTransactionIconByType = (transferType: TxnTransferType) => {
    switch (transferType) {
      case TxnTransferType.SEND:
        return (
          <ArrowRightIcon
            style={{
              transform: 'rotate(270deg)',
              width: '16px'
            }}
          />
        )
      case TxnTransferType.RECEIVE:
        return (
          <ArrowRightIcon
            style={{
              transform: 'rotate(90deg)',
              width: '16px'
            }}
          />
        )
      case TxnTransferType.UNKNOWN:
      default:
        return <TransactionIcon style={{ width: '14px' }} />
    }
  }

  const getTansactionLabelByType = (transferType: TxnTransferType) => {
    switch (transferType) {
      case TxnTransferType.SEND:
        return 'Sent'
      case TxnTransferType.RECEIVE:
        return 'Received'
      case TxnTransferType.UNKNOWN:
      default:
        return 'Transacted'
    }
  }

  const getTransferAmountLabel = (amount: string, symbol: string, transferType: TxnTransferType) => {
    let sign = ''
    if (transferType === TxnTransferType.SEND) {
      sign = '-'
    } else if (transferType === TxnTransferType.RECEIVE) {
      sign = '+'
    }

    let textColor = 'text-gray-500'
    if (transferType === TxnTransferType.SEND) {
      textColor = 'text-red-500'
    } else if (transferType === TxnTransferType.RECEIVE) {
      textColor = 'text-green-500'
    }

    return (
      <Text variant="normal" fontWeight="bold" className={textColor}>{`${sign}${amount} ${symbol}`}</Text>
    )
  }

  interface GetTransfer {
    transfer: TxnTransfer
    isFirstItem: boolean
  }

  const getTransfer = ({ transfer, isFirstItem }: GetTransfer) => {
    const { amounts } = transfer
    const date = dayjs(transaction.timestamp).format('MMM DD, YYYY')
    return (
      <div className="flex flex-col gap-2 w-full justify-between">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1 justify-center items-center text-gray-500">
            {getTransactionIconByType(transfer.transferType)}
            <Text variant="normal" fontWeight="medium" className="text-gray-900">
              {getTansactionLabelByType(transfer.transferType)}
            </Text>
            <NetworkImage chainId={transaction.chainId} size="xs" />
          </div>
          {isFirstItem && (
            <div>
              <Text variant="normal" fontWeight="medium" className="text-gray-500">
                {date}
              </Text>
            </div>
          )}
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
                {tokenLogoUri && <Image src={tokenLogoUri} width="5" alt="token logo" />}
                {getTransferAmountLabel(formatDisplay(amountValue), symbol, transfer.transferType)}
              </div>
              {isPending && <Skeleton className="w-9 h-5" />}
              {fiatConversionRate && (
                <Text variant="normal" fontWeight="medium" className="text-gray-500">
                  {`${fiatCurrency.sign}${(Number(amountValue) * fiatConversionRate * conversionRate).toFixed(2)}`}
                </Text>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className="bg-gray-100 rounded-md p-4 gap-2 items-center justify-center flex flex-col cursor-pointer hover:opacity-80"
      onClick={() => onClickTransaction(transaction)}
    >
      {transfers?.map((transfer, position) => {
        return (
          <div key={`${transaction.txnHash}-${position}`} className="w-full">
            {getTransfer({
              transfer,
              isFirstItem: position === 0
            })}
          </div>
        )
      })}
    </div>
  )
}
