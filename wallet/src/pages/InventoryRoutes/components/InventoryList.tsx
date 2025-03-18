import { useState } from 'react'
import { inert } from '../../../utils/inert'
import { useInventory } from '../helpers/useInventory'
import { InventoryListEmpty } from './InventoryListEmpty'
import { TokenType } from './TokenType'
import { Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@0xsequence/design-system'
import { Link } from 'react-router'
import { TokenTypeProps } from '../types'
import { InventoryCoinList } from './InventoryCoin'
import { useSortByFavorites } from '../helpers/useSortByFavorites'

export function InventoryGrid({ isActive }: { isActive: boolean }) {
  const { inventory, inventoryIsEmpty } = useInventory()

  const favorites = useSortByFavorites(inventory)

  return (
    <Transition show={isActive}>
      <div
        className="isolate grid grid-cols-2 sm:grid-cols-4 gap-2  data-[closed]:opacity-0  data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all"
        {...inert(!isActive)}
      >
        {inventoryIsEmpty ? (
          <InventoryListEmpty />
        ) : (
          <>
            {favorites.map((item, index) => (
              <TokenType key={index} item={item} />
            ))}
          </>
        )}
      </div>
    </Transition>
  )
}

function useCollectiblesByContract(inventory: TokenTypeProps[]) {
  return inventory.reduce((acc, item) => {
    if (item.tokenClass === 'collectable') {
      if (!acc[item.contractAddress]) {
        acc[item.contractAddress] = []
      }
      acc[item.contractAddress].push(item)
    }
    return acc
  }, {} as Record<string, TokenTypeProps[]>)
}

export function InventoryList({ isActive }: { isActive: boolean }) {
  const { coinInventory, collectibleInventory, inventoryIsEmpty } = useInventory()

  const inventoryByContract = useCollectiblesByContract(collectibleInventory)

  const [showAllCoins, setShowAllCoins] = useState(false)

  function toggleShowAllCoins() {
    setShowAllCoins(!showAllCoins)
  }

  if (inventoryIsEmpty) {
    return <InventoryListEmpty />
  }
  return (
    <Transition show={isActive}>
      <div className="isolate flex flex-col gap-2 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all">
        <div className="isolate flex flex-col gap-2">
          {coinInventory.slice(0, 6).map((item, index) => (
            <InventoryCoinList {...item} key={index} />
          ))}
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
              {coinInventory.slice(6, coinInventory.length).map((item, index) => (
                <TokenType key={index} item={item} displayMode="list" />
              ))}
            </div>
          </div>
        </div>
        <div className="isolate flex flex-col sm:grid-cols-4 gap-2  ">
          {Object.values(inventoryByContract).map(item => (
            <ContractCollectibles items={item} key={item?.[0]?.contractInfo?.address} />
          ))}
        </div>
      </div>
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
            <span className="size-10">
              <img
                src={contract.logoURI}
                alt=""
                width="32"
                height="32"
                className="size-full object-cover rounded-sm"
              />
            </span>
          ) : null}
          <span className=" textfit-title text-xl font-bold">{contract?.name}</span>
        </span>
        <span className="text-sm font-bold flex gap-1 items-center">
          All ({items.length}) <ChevronRightIcon />
        </span>
      </Link>
      <div className={`isolate grid grid-cols-4 gap-2`}>
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
