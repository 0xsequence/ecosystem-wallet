import { useState } from 'react'
import { inert } from '../../../utils/inert'
import { useInventory } from '../../../hooks/use-inventory'
import { InventoryListEmpty, InventoryGridEmpty } from './InventoryListEmpty'
import { TokenType } from './TokenType'
import { Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@0xsequence/design-system'
import { Link } from 'react-router'
import { TokenRecord } from '../types'
import { InventoryCoinList } from './InventoryCoin'
import { ContractInfo } from '@0xsequence/indexer'
import { TOKEN_TYPES } from '../../../utils/normalize-balances'
import { InventoryCoinGroupList } from './InventoryCoinGroup'

export function InventoryGrid({
  inventory,
  isActive,
  isLoading
}: {
  inventory: ReturnType<typeof useInventory>
  isActive: boolean
  isLoading: boolean
}) {
  const hasNoResults = inventory.records.length < 1 && !isLoading && inventory.active.search

  return (
    <Transition show={isActive}>
      {hasNoResults ? (
        <div>
          <NoResults term={inventory.active.search} clear={() => inventory.refiners.search('')} />
        </div>
      ) : (
        <div
          className="isolate grid grid-cols-2 sm:grid-cols-4 gap-2  data-[closed]:opacity-0  data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all"
          {...inert(!isActive)}
        >
          {inventory.records.length < 1 ? (
            <InventoryGridEmpty isLoading={isLoading} />
          ) : (
            <>
              {inventory.records.map((item, index) => (
                <TokenType key={index} item={item} />
              ))}
            </>
          )}
        </div>
      )}
    </Transition>
  )
}

export function InventoryList({
  inventory,
  isActive,
  isLoading
}: {
  inventory: ReturnType<typeof useInventory>
  isActive: boolean
  isLoading: boolean
}) {
  const coins = inventory?.records?.filter(item => [TOKEN_TYPES.GROUP, TOKEN_TYPES.COIN].includes(item.type))
  const collectibles = inventory?.records?.filter(item => item.type === TOKEN_TYPES.COLLECTIBLE)

  const collectiblesByContract = collectibles?.reduce((acc, item) => {
    if (!acc[item.contractAddress]) {
      acc[item.contractAddress] = []
    }
    acc[item.contractAddress].push(item)

    return acc
  }, {} as Record<string, TokenRecord[]>)

  const hasNoResults = false

  const inventoryIsEmpty = false // !coins || !collectibles || coins.length < 1 || collectibles.length < 1

  const [showAllCoins, setShowAllCoins] = useState(false)

  function toggleShowAllCoins() {
    setShowAllCoins(!showAllCoins)
  }

  const coinListSize = 6
  const notRequired = coins.length === coinListSize + 1

  const coinsInitial = notRequired ? coins : coins?.slice(0, coinListSize)
  const coinsMore = coins?.slice(coinListSize, coins?.length)
  const showMore = coins ? coins.length > coinsInitial.length : null

  return (
    <Transition show={isActive}>
      {hasNoResults ? (
        <div>
          <NoResults term={inventory.active.search} clear={() => inventory.refiners.search('')} />
        </div>
      ) : (
        <div className="isolate flex flex-col gap-2 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all">
          {inventoryIsEmpty ? (
            <InventoryListEmpty isLoading={isLoading} />
          ) : (
            <>
              <div className="isolate flex flex-col gap-2">
                {coinsInitial?.map(item =>
                  !item ? null : item.type === TOKEN_TYPES.COIN ? (
                    <InventoryCoinList {...item} key={item.uuid} />
                  ) : (
                    <InventoryCoinGroupList {...item} key={item.uuid} />
                  )
                )}

                {showMore ? (
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
                        {coinsMore?.map(item => (
                          <InventoryCoinList {...item} key={item.uuid} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="isolate flex flex-col sm:grid-cols-4 gap-2  ">
                {collectiblesByContract &&
                  Object.values(collectiblesByContract).map(item => (
                    <ContractCollectibles
                      contract={item[0].contractInfo}
                      items={item}
                      key={item[0]?.uuid + '-group'}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </Transition>
  )
}

function ContractCollectibles({ contract, items }: { contract?: ContractInfo; items: TokenRecord[] }) {
  if (!contract) {
    return null
  }

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

function NoResults({ term, clear }: { term?: string | null; clear: () => void }) {
  return (
    <div className="text-center text-primary bg-background-muted w-full px-4 max-sm:py-12 sm:aspect-video rounded-lg flex items-center justify-center flex-col pointer-events-auto gap-4">
      <span>No results found for "{term}"</span>
      <button
        type="button"
        className="cursor-pointer hover:opacity-80 focus:opacity-80 bg-button-glass px-3 py-1 rounded-sm text-sm font-medium textfit-body"
        onClick={() => clear()}
      >
        Clear
      </button>
    </div>
  )
}
