import { TokenDetailModal } from './components/TokenDetailModal.tsx'
import { InventoryList } from './components/InventoryList.tsx'
import { InventoryProvider } from './helpers/inventory-provider.tsx'
import { useInventory } from './helpers/useInventory.ts'
import { InventoryListEmpty } from './components/InventoryListEmpty.tsx'
import { SendTokens } from './components/SendTokens.tsx'
import { useCoinPrices } from '../../hooks/useCoinPrices'
import { formatUnits } from 'ethers'
import { Suspense, useState } from 'react'
import { EyeIcon } from '../../design-system-patch/icons'
import { HiddenIcon } from '@0xsequence/design-system'
export const InventoryPage = () => {
  return (
    <InventoryProvider>
      <Inventory />
      <TokenDetailModal />
      <SendTokens />
    </InventoryProvider>
  )
}

function Inventory() {
  const { inventoryIsEmpty } = useInventory()

  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      <TotalCoinBalance />

      <div className="isolate grid  grid-cols-2 sm:grid-cols-4 gap-2 ">
        {!inventoryIsEmpty ? <InventoryList /> : <InventoryListEmpty />}
      </div>
    </div>
  )
}

// Import the ethers library

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

  const { data: coinPriceData = [], isPending } = useCoinPrices(coins)

  const total = coinPriceData.reduce((acc: number, chain: any) => {
    if (!chain || !chain.price || !chain.price.value) return acc

    const chainId = chain.token.chainId

    const current = coins?.find(coin => coin.chainId === chainId)
    if (!current) return acc

    const value = Number(current.units) * chain.price.value

    acc = acc + value
    return acc
  }, 0)

  const [hideBalance, setHideBalance] = useState(false)

  const totalCoinBalance = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total)

  return {
    totalCoinBalancePending: isPending,
    totalCoinBalance,
    hideBalance,
    setHideBalance
  }
}

function TotalCoinBalance() {
  const { totalCoinBalance, totalCoinBalancePending, hideBalance, setHideBalance } = useTotalCoinBalance()

  return (
    <dl className="max-w-[256px] w-full pb-16 flex flex-col gap-0.25">
      <dt className="text-style-sm font-semibold text-white/80">Total Balance (USD)</dt>
      <dd className="text-2xl font-bold flex gap-2">
        <button
          type="button"
          onClick={() => setHideBalance(c => !c)}
          className="flex items-center gap-2 justify-between cursor-pointer group"
        >
          <span className="grid grid-cols-1 grid-rows-1 transition-all overflow-clip items-start justify-content-start text-left">
            <span
              className="transition-all data-[inert]:translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0 col-start-1 row-start-1 opacity-24"
              data-inert={!totalCoinBalancePending ? 'true' : undefined}
              /* @ts-expect-error inert */
              inert={!totalCoinBalancePending ? 'inert' : undefined}
            >
              $
            </span>

            <span
              className="transition-all data-[inert]:translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0 col-start-1 row-start-1"
              data-inert={totalCoinBalancePending || hideBalance ? 'true' : undefined}
              /* @ts-expect-error inert */
              inert={totalCoinBalancePending || hideBalance ? 'inert' : undefined}
            >
              {totalCoinBalance}
            </span>
            <span
              className="transition-all data-[inert]:-translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0 col-start-1 row-start-1"
              data-inert={totalCoinBalancePending || !hideBalance ? 'true' : undefined}
              /* @ts-expect-error inert */
              inert={totalCoinBalancePending || !hideBalance ? 'inert' : undefined}
            >
              $••••••••
            </span>
          </span>
          <span className="grid grid-cols-1 grid-rows-1 bg-button-glass rounded-sm px-1 py-0.5 flex-shrink-0 overflow-clip group-hover:bg-button-glass/80">
            <span
              className="self-center row-start-1 col-start-1 data-[inert]:scale-90 data-[inert]:translate-y-4 data-[inert]:opacity-0 transition-all"
              data-inert={hideBalance ? 'true' : undefined}
              /* @ts-expect-error inert */
              inert={hideBalance ? 'inert' : undefined}
            >
              <HiddenIcon className="size-5 transition-all" />
            </span>

            <span
              className="self-center row-start-1 col-start-1 data-[inert]:scale-90 data-[inert]:-translate-y-4 data-[inert]:opacity-0 transition-all"
              data-inert={!hideBalance ? 'true' : undefined}
              /* @ts-expect-error inert */
              inert={!hideBalance ? 'inert' : undefined}
            >
              <EyeIcon className="size-5 transition-all" />
            </span>
          </span>
        </button>
      </dd>
    </dl>
  )
}
