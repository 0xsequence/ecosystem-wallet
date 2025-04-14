import { useCoinPrices } from '../hooks/useCoinPrices'

import { formatUnits } from 'ethers'
import { EyeIcon, HiddenIcon } from '../design-system-patch/icons'

import { useLocalStore } from '../utils/local-store'
import { inert } from '../utils/inert'
import { TokenPrice } from '@0xsequence/api'

import { UserPreferenceLocalStore } from '../pages/InventoryRoutes/types'
import { useExchangeRate } from '../hooks/useExchangeRate'
import { Text } from '@0xsequence/design-system'
import { useFetchInventory } from '../pages/InventoryRoutes/helpers/useFetchInventory'
import { useInventory } from '../hooks/use-inventory'

function useTotalCoinBalance() {
  const query = useFetchInventory()

  const { records } = useInventory(query?.data, { filters: { type: ['COIN'] } })

  const coins = records.map(chain => {
    const chainId = chain.chainId
    const contractAddress = chain.contractAddress
    const decimals = chain?.nativeToken?.decimals || chain?.contractInfo?.decimals
    const balance = chain?.balance
    const name = chain?.name || chain?.contractInfo?.name
    const units = formatUnits(balance || '0', decimals)

    return {
      units,
      name,
      chainId,
      contractAddress
    }
  })

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
    <dl className="w-full flex flex-col gap-0.25 px-3 py-2.5 border border-border-normal rounded-sm">
      <Text asChild variant="small" fontWeight="semibold" color="primary">
        <dt>Total Balance (USD)</dt>
      </Text>
      <dd className="text-xl font-bold flex gap-2">
        <button
          type="button"
          onClick={() => setPrefs({ hideBalance: !prefs?.hideBalance })}
          className="flex items-center gap-2 justify-between w-full cursor-pointer group"
        >
          <span className="grid grid-cols-1 grid-rows-1 transition-all overflow-clip items-start justify-content-start text-left [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0 opacity-24"
              {...inert(!totalCoinBalancePending)}
            >
              $
            </span>

            <span
              className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0"
              {...inert(totalCoinBalancePending || prefs?.hideBalance)}
            >
              {totalCoinBalance}
            </span>
            <span
              className="transition-all inert:-translate-y-4 inert:scale-90 inert:opacity-0"
              {...inert(totalCoinBalancePending || !prefs?.hideBalance)}
            >
              $••••••••
            </span>
          </span>
          <span className="grid grid-cols-1 grid-rows-1 bg-button-glass rounded-sm px-1 py-0.5 flex-shrink-0 overflow-clip group-hover:bg-button-glass/80 [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="self-center inert:scale-90 inert:translate-y-4 inert:opacity-0 transition-all"
              {...inert(prefs?.hideBalance)}
            >
              <HiddenIcon className="size-5 transition-all" />
            </span>

            <span
              className="self-center inert:scale-90 inert:-translate-y-4 inert:opacity-0 transition-all"
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
