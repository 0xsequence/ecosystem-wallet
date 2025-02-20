import { Token } from '@0xsequence/api'
import {
  ArrowRightIcon,
  Button,
  compareAddress,
  Divider,
  GradientAvatar,
  LinkIcon,
  nativeTokenImageUrl,
  NetworkImage,
  Skeleton,
  Text,
  TokenImage
} from '@0xsequence/design-system'
import { Transaction, TxnTransfer } from '@0xsequence/indexer'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { useConfig } from '../../hooks/useConfig'
import { useCoinPrices, useExchangeRate } from '../../hooks/useCoinPrices'
import { networks, ChainId } from '@0xsequence/network'
import { CopyButton } from '../CopyButton'
import { formatDisplay, truncateAtMiddle } from '../../utils/helpers'
import { useCollectiblePrices } from '../../hooks/useCollectiblePrices'

interface TransactionDetailProps {
  transaction: Transaction
}

export const TransactionDetails = ({ transaction }: TransactionDetailProps) => {
  const { fiatCurrency } = useConfig()

  const coins: Token[] = []
  const collectibles: Token[] = []
  transaction.transfers?.forEach(transfer => {
    if (transfer.contractInfo?.type === 'ERC721' || transfer.contractInfo?.type === 'ERC1155') {
      transfer.tokenIds?.forEach(tokenId => {
        const foundCollectible = collectibles.find(
          collectible =>
            collectible.chainId === transaction.chainId &&
            compareAddress(collectible.contractAddress, transfer.contractInfo?.address || '') &&
            collectible.tokenId === tokenId
        )
        if (!foundCollectible) {
          collectibles.push({
            chainId: transaction.chainId,
            contractAddress: transfer.contractInfo?.address || '',
            tokenId
          })
        }
      })
    } else {
      const contractAddress = transfer?.contractInfo?.address || ethers.ZeroAddress
      const foundCoin = coins.find(
        coin => coin.chainId === transaction.chainId && compareAddress(coin.contractAddress, contractAddress)
      )
      if (!foundCoin) {
        coins.push({
          chainId: transaction.chainId,
          contractAddress
        })
      }
    }
  })

  const { data: coinPricesData, isPending: isPendingCoinPrices } = useCoinPrices(coins)

  const { data: collectiblePricesData, isPending: isPendingCollectiblePrices } =
    useCollectiblePrices(collectibles)

  const { data: conversionRate = 1, isPending: isPendingConversionRate } = useExchangeRate(
    fiatCurrency.symbol
  )

  const arePricesLoading =
    (coins.length > 0 && isPendingCoinPrices) ||
    (collectibles.length > 0 && isPendingCollectiblePrices) ||
    isPendingConversionRate

  const { nativeToken, blockExplorer } = networks[transaction.chainId as ChainId]
  const nativeTokenInfo = {
    logoURI: nativeTokenImageUrl(transaction.chainId),
    symbol: nativeToken.symbol,
    decimals: nativeToken.decimals,
    blockExplorerUrl: blockExplorer?.rootUrl,
    blockExplorerName: blockExplorer?.name
  }

  const date = dayjs(transaction.timestamp).format('ddd MMM DD YYYY, h:m:s a')

  const onClickBlockExplorer = () => {
    if (typeof window !== 'undefined') {
      window.open(`${nativeTokenInfo.blockExplorerUrl}/tx/${transaction.txnHash}`, '_blank')
    }
  }

  interface TransferProps {
    transfer: TxnTransfer
  }
  const Transfer = ({ transfer }: TransferProps) => {
    const recipientAddress = transfer.to
    const recipientAddressFormatted =
      recipientAddress.substring(0, 10) +
      '...' +
      recipientAddress.substring(transfer.to.length - 4, transfer.to.length)
    const isNativeToken = compareAddress(transfer?.contractInfo?.address || '', ethers.ZeroAddress)
    const logoURI = isNativeToken ? nativeTokenInfo.logoURI : transfer?.contractInfo?.logoURI
    const symbol = isNativeToken ? nativeTokenInfo.symbol : transfer?.contractInfo?.symbol || ''

    return (
      <>
        {transfer.amounts?.map((amount, index) => {
          const isCollectible = transfer.contractType === 'ERC721' || transfer.contractType === 'ERC1155'
          const tokenId = transfer.tokenIds?.[index] || '0'
          const collectibleDecimals = transfer?.tokenMetadata?.[tokenId]?.decimals || 0
          const coinDecimals = isNativeToken
            ? nativeTokenInfo.decimals
            : transfer?.contractInfo?.decimals || 0
          const decimals = isCollectible ? collectibleDecimals : coinDecimals
          const formattedBalance = ethers.formatUnits(amount, decimals)
          const balanceDisplayed = formatDisplay(formattedBalance)
          const fiatPrice = isCollectible
            ? collectiblePricesData?.find(
                collectible =>
                  compareAddress(collectible.token.contractAddress, transfer.contractInfo?.address || '') &&
                  collectible.token.tokenId === transfer.tokenIds?.[index] &&
                  collectible.token.chainId === transaction.chainId
              )?.price?.value
            : coinPricesData?.find(
                coin =>
                  compareAddress(
                    coin.token.contractAddress,
                    transfer.contractInfo?.address || ethers.ZeroAddress
                  ) && coin.token.chainId === transaction.chainId
              )?.price?.value

          const fiatValue = (parseFloat(formattedBalance) * (conversionRate * (fiatPrice || 0))).toFixed(2)

          return (
            <div key={index} className="w-full flex flex-row gap-2 justify-between items-center">
              <div className="flex flex-row justify-start items-center gap-2 h-12 rounded-md bg-button-glass p-2 basis-full">
                <TokenImage src={logoURI} symbol={symbol} size="sm" />
                <div className="flex flex-col gap-0.5 items-start justify-center">
                  <Text variant="xsmall" fontWeight="bold" color="text100">
                    {`${balanceDisplayed} ${symbol}`}
                  </Text>
                  {arePricesLoading ? (
                    <Skeleton style={{ width: '44px', height: '12px' }} />
                  ) : (
                    <Text variant="xsmall" fontWeight="bold" color="text50">
                      {fiatPrice ? `${fiatCurrency.sign}${fiatValue}` : ''}
                    </Text>
                  )}
                </div>
              </div>
              <ArrowRightIcon color="text50" style={{ width: '16px' }} />
              <div className="flex flex-row justify-start items-center gap-2 h-12 rounded-md bg-button-glass p-2 basis-full">
                <GradientAvatar address={recipientAddress} style={{ width: '20px' }} />
                <Text variant="xsmall" fontWeight="bold" color="text100">
                  {recipientAddressFormatted}
                </Text>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className="bg-background-secondary p-5 pt-3 flex flex-col items-center justify-center gap-10 mt-5 rounded-md">
      <div className="mt-6 flex flex-col justify-center items-center gap-1 text-black">
        <span className="text-style-normal font-medium">Transaction details</span>
        <Text variant="small" className="mb-1 font-medium text-text50">
          {date}
        </Text>
        <NetworkImage chainId={transaction.chainId} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full p-4 bg-background-secondary rounded-md">
        <div className="w-full flex gap-1 flex-row items-center justify-start">
          <Text variant="normal" fontWeight="medium" color="text50">
            Transfer
          </Text>
          <NetworkImage chainId={transaction.chainId} size="xs" />
        </div>
        {transaction.transfers?.map((transfer, index) => (
          <div key={`transfer-${index}`} className="w-full flex flex-col justify-center items-center gap-4">
            <Transfer transfer={transfer} />
          </div>
        ))}
      </div>

      <Button
        onClick={onClickBlockExplorer}
        className="w-full rounded-md text-button-emphasis"
        rightIcon={LinkIcon}
        label={`View on ${nativeTokenInfo.blockExplorerName}`}
      />
      <div className="w-full">
        <div className="w-full flex flex-col gap-2 justify-center items-start">
          <Divider className="w-full m-1" />
          <Text variant="normal" className="text-black font-bold">
            Status
          </Text>
          <Text variant="normal" className="font-medium text-black">
            Complete
          </Text>
        </div>
        <div className="w-full flex flex-col gap-2 justify-center items-start">
          <Divider className="w-full m-1" />
          <Text variant="normal" className="text-black font-bold">
            Transaction Hash
          </Text>
          <div className="flex items-center gap-2">
            <span className="text-style-normal text-black font-medium break-words">
              {`0x${truncateAtMiddle(transaction.txnHash.substring(2), 20)}`}
            </span>
            <CopyButton buttonVariant="with-label" text={transaction.txnHash} />
          </div>
        </div>
      </div>
    </div>
  )
}
