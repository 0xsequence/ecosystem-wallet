import { TokenListItem } from './TokenTile'
import { nativeTokenImageUrl, NetworkImage, Text, TokenImage } from '@0xsequence/design-system'
import { formatUnits } from 'ethers'

import type { TokenTypeProps } from '../types'
import { formatDisplay, limitDecimals } from '../../../utils/helpers'
import { inert } from '../../../utils/inert'
import { useLocalStore } from '../../../utils/local-store'
import { useFavoriteTokens } from '../../../hooks/useFavoriteTokens'
import SvgHeartIcon from '../../../design-system-patch/icons/HeartIcon'
import { useCoinPrices } from '../../../hooks/useCoinPrices'
import { CoinGroup } from '../helpers/useFetchInventory'
import { Link } from 'react-router'

export function InventoryCoinGroup(props: CoinGroup) {
  const { balance, decimals, symbol, imageUrl, chains } = props
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')
  const { has } = useFavoriteTokens()
  const uuid = ''
  const isFavorite = has(uuid)

  return (
    <Link
      to=""
      // state={{ modal: true, referer }}
      className="aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:opacity-80 focus:opacity-80 transition-transform relative p-4 sm:p-6 flex flex-col items-start gap-3"
    >
      {props.testnet ? (
        <span className="rounded-full inline-flex px-1.5 py-0.5 bg-background-contrast absolute top-2 right-2">
          <Text variant="xsmall" color="muted">
            Testnet
          </Text>
        </span>
      ) : null}
      <>
        {isFavorite ? (
          <div className="flex items-center justify-center absolute bottom-4 right-4 bg-button-glass p-2 rounded-full backdrop-blur-2xl">
            <SvgHeartIcon />
          </div>
        ) : null}
      </>
      <div className="w-[50%] max-w-20">
        <TokenImage src={imageUrl} size="xl" className="size-full bg-button-glass rounded-full" />
      </div>
      <div className="flex flex-col flex-1 justify-end items-start text-start gap-3">
        <span className="grid grid-cols-1 grid-rows-1 transition-all items-start justify-content-start text-md sm:text-lg font-bold text-start leading-[0] [&>span]:col-start-1 [&>span]:row-start-1">
          <span
            className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0"
            {...inert(prefs?.hideBalance)}
          >
            {limitDecimals(formatDisplay(formatUnits(balance, decimals)), 5)}
            {' '}

            <Text variant="normal" color="primary">
              {symbol}
            </Text>
          </span>
          <span
            className="transition-all inert:-translate-y-4 inert:scale-90 inert:opacity-0"
            {...inert(!prefs?.hideBalance)}
          >
            •••{' '}
            <Text variant="normal" color="primary">
              {symbol}
            </Text>
          </span>
        </span>
        {chains.length ? (
          <div className="flex items-center gap-0.75">
            {chains.map(chain => (
              <NetworkImage chainId={chain.chainId} size="sm" />
            ))}
            {chains.length === 1 ? (
              <Text variant="small" color="secondary" className="ml-1 leading-[1.05]">
                {chains[0].title}
              </Text>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export function InventoryCoinList(props: TokenTypeProps) {
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
            className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0 whitespace-nowrap"
            {...inert(prefs?.hideBalance)}
          >
            {limitDecimals(formatDisplay(formatUnits(balance, decimals)), 5)}
            {' '}
            <span className="text-xs sm:text-sm font-normal">{symbol}</span>
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
        <div className="flex items-center justify-center bg-button-glass p-1.25 rounded-full backdrop-blur-2xl">
          <SvgHeartIcon className="size-4" />
        </div>
      ) : null}
    </TokenListItem>
  )
}

function CoinValue(props: TokenTypeProps) {
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
      className="grid grid-rows-[1fr_1fr] group inert:grid-rows-[0fr_1fr] text-end overflow-clip transition-all items-center"
      {...inert(prefs?.hideBalance)}
    >
      <span className="min-h-0 overflow-hidden group-inert:opacity-0 transition-all leading-[1.1] self-end">
        {priceText}
      </span>

      <span
        className="data-[trending='down']:text-negative text-positive text-xs leading-[1.1]"
        data-trending={trending}
      >
        {priceChangeText}
      </span>
    </div>
  )
}
