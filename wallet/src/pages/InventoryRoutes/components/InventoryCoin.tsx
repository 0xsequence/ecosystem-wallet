import { TokenListItem, TokenTile } from './TokenTile'
import { nativeTokenImageUrl, TokenImage } from '@0xsequence/design-system'
import { formatUnits } from 'ethers'

import type { TokenTileProps } from '../types'
import { formatDisplay, limitDecimals } from '../../../utils/helpers'
import { inert } from '../../../utils/inert'
import { useLocalStore } from '../../../utils/local-store'
import { useFavoriteTokens } from '../../../hooks/useFavoriteTokens'
import SvgHeartIcon from '../../../design-system-patch/icons/HeartIcon'
import { useCoinPrices } from '../../../hooks/useCoinPrices'

export function InventoryCoinTile(props: TokenTileProps) {
  const { chainId, contractAddress, tokenID, title, contractType, balance, token, uuid } = props
  const { symbol = '', decimals = 18 } = token || {}
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')
  const { has } = useFavoriteTokens()

  const isFavorite = has(uuid)

  return (
    <TokenTile
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="nativeBalance"
      className="p-4 sm:p-6 flex flex-col items-start gap-3 relative"
    >
      <>
        {isFavorite ? (
          <div className="flex items-center justify-center absolute bottom-4 right-4 bg-button-glass p-2 rounded-full backdrop-blur-2xl">
            <SvgHeartIcon />
          </div>
        ) : null}
      </>
      <div className="w-[50%] max-w-20">
        {contractType === 'ERC20' ? (
          <TokenImage
            src={token.logoURI}
            size="xl"
            className="size-full bg-button-glass rounded-full"
            withNetwork={chainId}
          />
        ) : (
          <TokenImage
            src={nativeTokenImageUrl(chainId, 'lg')}
            size="xl"
            className="size-full bg-button-glass rounded-full"
            withNetwork={chainId}
          />
        )}
      </div>
      <div className="flex flex-col flex-1 justify-end items-start text-start">
        <span className="text-xs sm:text-sm font-medium text-seq-grey-500 leading-tight text-start mb-0.5">
          {title}
        </span>
        <span className="grid grid-cols-1 grid-rows-1 transition-all items-start justify-content-start text-md sm:text-lg font-bold text-start leading-[0] [&>span]:col-start-1 [&>span]:row-start-1">
          <span
            className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0"
            {...inert(prefs?.hideBalance)}
          >
            {limitDecimals(formatDisplay(formatUnits(balance, decimals)), 5)}
            {' '}
            <span className="text-sm font-normal">{symbol}</span>
          </span>
          <span
            className="transition-all inert:-translate-y-4 inert:scale-90 inert:opacity-0"
            {...inert(!prefs?.hideBalance)}
          >
            •••{' '}
            <span className="text-sm font-normal">{symbol}</span>
          </span>
        </span>
      </div>
    </TokenTile>
  )
}

export function InventoryCoinList(props: TokenTileProps) {
  const { chainId, title, balance, contractType, contractAddress, tokenID, token, uuid } = props

  const { symbol = '', decimals = 18 } = token || {}
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')
  const { has } = useFavoriteTokens()
  return (
    <TokenListItem
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="nativeBalance"
      className="p-4 sm:py-3 px-4 flex items-center gap-3 relative trasition-all"
    >
      <div className="size-8">
        {contractType === 'ERC20' ? (
          <TokenImage
            src={token.logoURI}
            size="xl"
            className="size-full bg-button-glass rounded-full"
            withNetwork={chainId}
          />
        ) : (
          <TokenImage
            src={nativeTokenImageUrl(chainId, 'lg')}
            size="xl"
            className="size-full bg-button-glass rounded-full"
            withNetwork={chainId}
          />
        )}
      </div>
      <div className="flex flex-col flex-1 justify-end items-start text-start">
        <span className="text-xs sm:text-sm font-medium text-seq-grey-500 leading-tight text-start mb-0.5">
          {title}
        </span>

        <span className="grid grid-cols-1 grid-rows-1 transition-all items-start justify-content-start text-md sm:text-lg font-bold text-start leading-[0] [&>span]:col-start-1 [&>span]:row-start-1">
          <span
            className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0"
            {...inert(prefs?.hideBalance)}
          >
            {limitDecimals(formatDisplay(formatUnits(balance, decimals)), 5)}
            {' '}
            <span className="text-sm font-normal">{symbol}</span>
          </span>
          <span
            className="transition-all inert:-translate-y-4 inert:scale-90 inert:opacity-0"
            {...inert(!prefs?.hideBalance)}
          >
            •••{' '}
            <span className="text-sm font-normal">{symbol}</span>
          </span>
        </span>
      </div>

      <CoinValue {...props} />
      {has(uuid) ? (
        <div className="flex items-center justify-center bg-button-glass p-2 rounded-full backdrop-blur-2xl">
          <SvgHeartIcon />
        </div>
      ) : null}
    </TokenListItem>
  )
}

function CoinValue(props: any) {
  const { chainId, balance, contractAddress, token } = props

  const { data = [], isPending } = useCoinPrices([
    {
      chainId,
      contractAddress
    }
  ])
  const units = formatUnits(balance, token.decimals)
  // const diplayedBalance = formatDisplay(units)
  const { price, price24hChange } = data[0] || {}
  const priceText = price
    ? `${formatDisplay(price.value * Number(units), {
        disableScientificNotation: true,
        significantDigits: 2,
        maximumFractionDigits: 3,
        currency: 'USD'
      })}`
    : ''
  const priceChangeText = price24hChange
    ? `${price24hChange.value > 0 ? '+' : ''}${formatDisplay(price24hChange.value, {
        disableScientificNotation: true,
        significantDigits: 2
      })}%`
    : ''

  const trending = priceChangeText.startsWith('-') ? 'down' : 'up'
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')
  if (isPending) {
    return <>...</>
  }

  return (
    <div
      className="grid grid-rows-[1fr_1fr] inert:grid-rows-[0fr_1fr] text-end overflow-clip transition-all items-center"
      {...inert(prefs?.hideBalance)}
    >
      <span className="min-h-0 overflow-hidden inert:opacity-0 transition-all" {...inert(prefs?.hideBalance)}>
        {priceText}
      </span>

      <span className="data-[trending='down']:text-red-400 text-green-400 text-xs" data-trending={trending}>
        {priceChangeText}
      </span>
    </div>
  )
}
