import { Token } from '@0xsequence/api'
import {
  Card,
  compareAddress,
  GradientAvatar,
  nativeTokenImageUrl,
  NetworkImage,
  TokenImage
} from '@0xsequence/design-system'
import { Transaction, TxnTransfer } from '@0xsequence/indexer'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { useConfig } from '../../hooks/useConfig'
import { useCoinPrices, useExchangeRate } from '../../hooks/useCoinPrices'
import { networks, ChainId } from '@0xsequence/network'
import { CopyButton } from '../../components/CopyButton'
import { formatDisplay, truncateAtMiddle } from '../../utils/helpers'
import { useCollectiblePrices } from '../../hooks/useCollectiblePrices'
import { ArrowRightIcon } from '../../design-system-patch/icons'

function useCoinsAndCollectables(transaction: Transaction) {
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

  return [coins, collectibles]
}

interface TransactionDetailProps {
  transaction: Transaction
}

function useNativeToken(transaction: TransactionDetailProps['transaction']) {
  const { nativeToken, blockExplorer } = networks[transaction.chainId as ChainId]
  return {
    logoURI: nativeTokenImageUrl(transaction.chainId),
    symbol: nativeToken.symbol,
    decimals: nativeToken.decimals,
    blockExplorerUrl: blockExplorer?.rootUrl,
    blockExplorerName: blockExplorer?.name
  }
}

export const TransactionDetails = ({ transaction }: TransactionDetailProps) => {
  const nativeTokenInfo = useNativeToken(transaction)

  const date = dayjs(transaction.timestamp).format('ddd MMM DD YYYY, hh:mm:ss a')

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full flex max-md:flex-col max-md:items-start justify-between text-start items-center bg-black/10 p-4 rounded-md">
        <dt className="text-style-sm font-bold">Date</dt>
        <dd>{date}</dd>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 w-full p-4 bg-black/10 rounded-md">
        <div className="w-full flex gap-1 flex-row items-center justify-start">
          <NetworkImage chainId={transaction.chainId} className="size-5" />
          <span className="text-style-sm font-bold">
            {transaction?.transfers && transaction?.transfers?.length < 2 ? 'Transfer' : 'Transfers'}
          </span>
        </div>

        {transaction.transfers?.map((transfer, index) => (
          <div key={`transfer-${index}`} className="w-full flex flex-col justify-center items-center gap-4">
            <Transfer transfer={transfer} transaction={transaction} nativeTokenInfo={nativeTokenInfo} />
          </div>
        ))}
      </div>

      <dl className="w-full flex gap-4 max-md:flex-col">
        <div className="w-full flex flex-col items-start bg-black/10 p-4 rounded-md">
          <dt className="text-style-sm font-bold">Status</dt>
          <dd>Complete</dd>
        </div>

        <div className="w-full flex flex-col items-start bg-black/10 p-4 rounded-md">
          <dt className="text-style-sm font-bold">Transaction Hash</dt>
          <dd className="flex items-center gap-2 text-style-normal text-black font-medium break-words">
            {`0x${truncateAtMiddle(transaction.txnHash.substring(2), 20)}`}
            <CopyButton buttonVariant="with-label" text={transaction.txnHash} />
          </dd>
        </div>
      </dl>
      <a
        href={`${nativeTokenInfo.blockExplorerUrl}/tx/${transaction.txnHash}`}
        className="w-full rounded-md bg-black/10 text-black flex items-center justify-between p-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>View on {nativeTokenInfo.blockExplorerName}</span>
      </a>
    </div>
  )
}

interface TransferProps {
  transfer: TxnTransfer
  transaction: Transaction
  nativeTokenInfo: ReturnType<typeof useNativeToken>
}

const Transfer = ({ transfer, transaction, nativeTokenInfo }: TransferProps) => {
  const { fiatCurrency } = useConfig()

  const [coins, collectibles] = useCoinsAndCollectables(transaction)

  const { data: coinPricesData, isPending: isPendingCoinPrices } = useCoinPrices(coins)

  const { data: collectiblePricesData, isPending: isPendingCollectiblePrices } =
    useCollectiblePrices(collectibles)

  const exchangeRate = useExchangeRate(fiatCurrency.symbol)

  const arePricesLoading =
    (coins.length > 0 && isPendingCoinPrices) ||
    (collectibles.length > 0 && isPendingCollectiblePrices) ||
    exchangeRate.isPending

  const recipientAddress = transfer.to
  const recipientAddressFormatted =
    recipientAddress.substring(0, 10) +
    '...' +
    recipientAddress.substring(transfer.to.length - 4, transfer.to.length)
  const isNativeToken = compareAddress(transfer?.contractInfo?.address || '', ethers.ZeroAddress)
  const logoURI = isNativeToken ? nativeTokenInfo.logoURI : transfer?.contractInfo?.logoURI
  const symbol = isNativeToken ? nativeTokenInfo.symbol : transfer?.contractInfo?.symbol || ''

  const amounts = transfer.amounts?.map((amount, index) => {
    const isCollectible = transfer.contractType === 'ERC721' || transfer.contractType === 'ERC1155'
    const tokenId = transfer.tokenIds?.[index] || '0'
    const collectibleDecimals = transfer?.tokenMetadata?.[tokenId]?.decimals || 0
    const coinDecimals = isNativeToken ? nativeTokenInfo.decimals : transfer?.contractInfo?.decimals || 0
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

    const fiatValue = (parseFloat(formattedBalance) * ((exchangeRate.data || 1) * (fiatPrice || 0))).toFixed(
      2
    )

    return { balanceDisplayed, fiatPrice, fiatValue }
  })

  return (
    <>
      {amounts.map(({ balanceDisplayed, fiatValue, fiatPrice }, index) => (
        <div key={index} className="w-full flex max-md:flex-col gap-2 justify-between items-center">
          <Card className="w-full flex flex-row items-center rounded-md min-h-[3rem] px-3 py-2 bg-black/10">
            <div className="flex justify-center items-center gap-2">
              <TokenImage src={logoURI} symbol={symbol} className="size-5" />
              <div className="flex flex-col leading-tight items-start justify-center">
                <span className="text-black">{`${balanceDisplayed} ${symbol}`}</span>

                {arePricesLoading ? (
                  '--'
                ) : (
                  <span className="text-style-xs">{fiatPrice ? `${fiatCurrency.sign}${fiatValue}` : ''}</span>
                )}
              </div>
            </div>
          </Card>
          <ArrowRightIcon className="size-4 max-md:rotate-90" />
          <Card className="w-full flex flex-row items-center rounded-md min-h-[3rem] px-3 py-2 bg-black/10">
            <div className="flex justify-between gap-2 w-full">
              <div className="flex justify-center items-center gap-2 flex-1">
                <GradientAvatar address={recipientAddress} className="size-5" />
                <span className="text-black">{recipientAddressFormatted}</span>
                <CopyButton text={recipientAddress} className="ml-auto mr-0"></CopyButton>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  )
}
