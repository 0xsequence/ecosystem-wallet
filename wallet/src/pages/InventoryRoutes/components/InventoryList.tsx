import { useEffect, useMemo, useState } from 'react'
import { inert } from '../../../utils/inert'
import { useInventory } from '../helpers/use-inventory'
import { InventoryListEmpty, InventoryGridEmpty } from './InventoryListEmpty'
import { TokenType } from './TokenType'
import { Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@0xsequence/design-system'
import { Link } from 'react-router'
import { TokenTypeProps } from '../types'
import { InventoryCoinList } from './InventoryCoin'
import { useSortByFavorites } from '../helpers/useSortByFavorites'
import { useCollectiblesByContract } from '../../../hooks/useCollectiblesByContract'
import { useSearchFilter } from '../../../hooks/useSearch'
import { padArray } from '../../../utils/pad-array'

export function InventoryGrid({ inventory, isActive }: { isActive: boolean }) {
  // const { inventory, coinGroups, inventoryIsEmpty } = useInventory()

  const { hasNoResults, filterResults } = useSearchFilter()
  // const dunkeroo = useInventory()

  // useEffect(() => {
  //   console.log(dunkeroo.items)
  //   setTimeout(() => {
  //     dunkeroo.set(view => view.filterBy.type('ERC20'))
  //     console.log(dunkeroo.items)
  //   }, 1000)
  // }, [])

  // const favorites = useSortByFavorites(
  //   filterResults([...coinGroups, ...inventory.filter(item => !item?.group)])
  // )

  // const items = padArray(inventory, null, 12) as (TokenTypeProps | null)[]
  return (
    <Transition show={isActive}>
      {hasNoResults ? (
        <NoResults />
      ) : (
        <div
          className="isolate grid grid-cols-2 sm:grid-cols-4 gap-2  data-[closed]:opacity-0  data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all"
          {...inert(!isActive)}
        >
          {inventory.items.length < 1 ? (
            // <InventoryGridEmpty />
            <>No</>
          ) : (
            <>
              {inventory.items.map((item, index) => (
                <TokenType key={index} item={item} />
              ))}
            </>
          )}
        </div>
      )}
    </Transition>
  )
}

export function InventoryList({ inventory, isActive }: { isActive: boolean }) {
  const coins = useMemo(() => inventory.get(view => view.filterBy.type('coins')), [inventory])
  const collectibles = useMemo(
    () => inventory.get(view => view.filterBy.type('collectibles').groupBy.contracts()),
    [inventory]
  )

  const { hasNoResults, filterResults } = useSearchFilter()

  const inventoryIsEmpty = !coins || !collectibles || coins.length < 1 || collectibles.length < 1

  // const filteredCoins = filterResults(coinInventory)
  // const filteredCollectibles = filterResults(collectibleInventory)

  // const inventoryByContract = useCollectiblesByContract(filteredCollectibles)

  const [showAllCoins, setShowAllCoins] = useState(false)

  function toggleShowAllCoins() {
    setShowAllCoins(!showAllCoins)
  }

  return (
    <Transition show={isActive}>
      {hasNoResults ? (
        <NoResults />
      ) : (
        <div className="isolate flex flex-col gap-2 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all">
          {inventoryIsEmpty ? (
            <InventoryListEmpty isLoading={inventory.query.isLoading} />
          ) : (
            <>
              <div className="isolate flex flex-col gap-2">
                {coins
                  .slice(0, 6)
                  .map((item, index) => (!item ? null : <InventoryCoinList {...item} key={item.uuid} />))}
                {coins.length > 6 ? (
                  <>
                    <button
                      type="button"
                      onClick={toggleShowAllCoins}
                      className="rounded-md overflow-clip bg-background-secondary/50 backdrop-blur-2xl cursor-pointer p-4 sm:py-3 px-4  gap-3 text-sm text-primary focus:opactiy-80 hover:opacity-80 textfit-body flex items-center justify-between"
                    >
                      {showAllCoins ? 'Show Fewer Coins' : 'Show All Coins'}
                      <ChevronRightIcon
                        className="data-[open='true']:rotate-90 transition-transform"
                        data-open={showAllCoins}
                      />
                    </button>

                    <div
                      className="grid grid-rows-[1fr] inert:grid-rows-[0fr] transition-all group/card inert:overflow-clip"
                      {...inert(!showAllCoins)}
                    >
                      <div className="isolate flex flex-col gap-2 min-h-0">
                        {coins.slice(6, coins.length).map((item, index) => (
                          <TokenType key={index} item={item} displayMode="list" />
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="isolate flex flex-col sm:grid-cols-4 gap-2  ">
                {Object.values(collectibles).map(item => (
                  <ContractCollectibles items={item} key={item?.[0]?.contractInfo?.address} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Transition>
  )
}

function ContractCollectibles({ items }: { items: TokenTypeProps[] }) {
  const contract = items?.[0]?.contractInfo
  if (!contract) return null

  const collectibles = items.length <= 7 ? items : items?.slice(0, 7)

  return (
    <div className="mt-6">
      <Link to={`${contract.chainId}/${contract.address}`} className="flex justify-between items-center py-4">
        <span className="flex items-center gap-2">
          {contract?.logoURI ? (
            <span className="size-6 md:size-10">
              <img
                src={contract.logoURI}
                alt=""
                width="32"
                height="32"
                className="size-full object-cover rounded-sm"
              />
            </span>
          ) : null}
          <span className="textfit-title leading-tight md:text-xl font-bold">{contract?.name}</span>
        </span>
        <span className="text-xs md:text-sm font-bold flex gap-1 items-center whitespace-nowrap">
          All ({items.length}) <ChevronRightIcon />
        </span>
      </Link>
      <div className={`isolate grid grid-cols-2 sm:grid-cols-4 gap-2`}>
        {collectibles.slice(0, 7).map((item, index) => (
          <TokenType key={index} item={item} />
        ))}
        {items.length > collectibles.length ? (
          <Link
            to={`${contract.chainId}/${contract.address}`}
            className="flex justify-center items-center py-4 aspect-square bg-background-secondary backdrop-blur-2xl rounded-md focus:opacity-80 hover:opacity-80"
          >
            + {items.length - collectibles.length} more
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function NoResults() {
  const { query, setQuery } = useSearchFilter()

  return (
    <div className="text-center text-primary bg-background-muted w-full px-4 max-sm:py-12 sm:aspect-video rounded-lg flex items-center justify-center flex-col pointer-events-auto gap-4">
      <span>No results found for "{query}"</span>
      <button
        type="button"
        className="cursor-pointer hover:opacity-80 focus:opacity-80 bg-button-glass px-3 py-1 rounded-sm text-sm font-medium textfit-body"
        onClick={() => setQuery('')}
      >
        Clear
      </button>
    </div>
  )
}
