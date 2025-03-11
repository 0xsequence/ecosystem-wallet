import { useCoinPrices, useExchangeRate } from '../hooks/useCoinPrices'
import { formatUnits } from 'ethers'
import { EyeIcon, HiddenIcon } from '../design-system-patch/icons'

import { useLocalStore } from '../utils/local-store'
import { inert } from '../utils/inert'
import { CurrencySelector } from './CurrencySelector'
import { TokenPrice } from '@0xsequence/api'
import { useInventory } from '../pages/inventory/helpers/useInventory'
import { UserPreferenceLocalStore } from '../pages/inventory/types'

function useTotalCoinBalance() {
  const { inventoryByTokenClass } = useInventory()
  const coins = [...inventoryByTokenClass.nativeBalances, ...inventoryByTokenClass.erc20Inventory].map(
    chain => {
      const chainId = chain.chainId || chain?.chain?.chainId
      const contractAddress = chain.contractAddress
      const decimals = chain?.nativeToken?.decimals || chain?.contractInfo?.decimals
      const balance = chain?.balance
      const name = chain?.name || chain?.contractInfo?.name
      const units = formatUnits(balance, decimals)

      return {
        units,
        name,
        chainId,
        contractAddress
      }
    }
  )
  /* @ts-expect-error FIXME */
  const { data: coinPriceData = [], isPending } = useCoinPrices(coins)

  const total = coinPriceData.reduce((acc: number, chain: TokenPrice) => {
    if (!chain || !chain.price || !chain.price.value) return acc

    const chainId = chain.token.chainId

    const current = coins?.find(coin => coin.chainId === chainId)
    if (!current) return acc

    const value = Number(current.units) * chain.price.value

    acc = acc + value
    return acc
  }, 0)

  const [prefs, setPrefs] = useLocalStore<UserPreferenceLocalStore>('userPrefs')

  const { data: exchangeRate } = useExchangeRate(prefs?.currency || 'USD')
  const totalCoinBalance = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: prefs?.currency || 'USD'
  }).format(total * (exchangeRate || 0))

  return {
    totalCoinBalancePending: isPending,
    totalCoinBalance,
    prefs,
    setPrefs
  }
}

export function WalletsTotalBalance() {
  const { totalCoinBalance, totalCoinBalancePending, prefs, setPrefs } = useTotalCoinBalance()

  return (
    <dl className="max-w-[256px] w-full pb-16 flex flex-col gap-0.25">
      <dt className="text-style-sm font-semibold text-white/80">
        Total Balance <CurrencySelector />
      </dt>
      <dd className="text-2xl font-bold flex gap-2">
        <button
          type="button"
          onClick={() => setPrefs({ hideBalance: !prefs?.hideBalance })}
          className="flex items-center gap-2 justify-between cursor-pointer group"
        >
          <span className="grid grid-cols-1 grid-rows-1 transition-all overflow-clip items-start justify-content-start text-left [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="transition-all data-[inert]:translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0 opacity-24"
              {...inert(!totalCoinBalancePending)}
            >
              $
            </span>

            <span
              className="transition-all data-[inert]:translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0"
              {...inert(totalCoinBalancePending || prefs?.hideBalance)}
            >
              {totalCoinBalance}
            </span>
            <span
              className="transition-all data-[inert]:-translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0"
              {...inert(totalCoinBalancePending || !prefs?.hideBalance)}
            >
              $••••••••
            </span>
          </span>
          <span className="grid grid-cols-1 grid-rows-1 bg-button-glass rounded-sm px-1 py-0.5 flex-shrink-0 overflow-clip group-hover:bg-button-glass/80 [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="self-center data-[inert]:scale-90 data-[inert]:translate-y-4 data-[inert]:opacity-0 transition-all"
              {...inert(prefs?.hideBalance)}
            >
              <HiddenIcon className="size-5 transition-all" />
            </span>

            <span
              className="self-center data-[inert]:scale-90 data-[inert]:-translate-y-4 data-[inert]:opacity-0 transition-all"
              {...inert(!prefs?.hideBalance)}
            >
              <EyeIcon className="size-5 transition-all" />
            </span>
          </span>
        </button>
      </dd>
    </dl>
  )
}
