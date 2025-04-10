import { formatUnits } from 'ethers'
import { useCoinPrices } from '../../../../hooks/useCoinPrices'
import { formatDisplay } from '../../../../utils/helpers'
import { useLocalStore } from '../../../../utils/local-store'
import { inert } from '../../../../utils/inert'
import { ChainId } from '@0xsequence/network'

export type CoinFiatValueProps = {
  chainId: ChainId
  contractAddress: string
  balance: string
  decimals: number
}

export function CoinFiatValue(props: CoinFiatValueProps) {
  const { chainId, balance, contractAddress, decimals } = props

  const { data = [], isPending } = useCoinPrices([
    {
      chainId,
      contractAddress
    }
  ])
  const units = formatUnits(balance, decimals)
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
