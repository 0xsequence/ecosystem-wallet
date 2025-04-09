import { formatDisplay, limitDecimals } from '../../../../utils/helpers'
import { inert } from '../../../../utils/inert'
import { useLocalStore } from '../../../../utils/local-store'
import { formatUnits } from 'ethers'

type CoinBalanceProps = {
  balance: string
  symbol: string
  decimals: number
}

export function CoinBalance(props: CoinBalanceProps) {
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')

  const { balance, decimals, symbol } = props

  if (!balance || !decimals || !symbol) return null

  return (
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
  )
}
