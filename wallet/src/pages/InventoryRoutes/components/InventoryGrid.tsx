import { inert } from '../../../utils/inert'
import { useInventory } from '../../../hooks/use-inventory'
import { InventoryGridEmpty } from './InventoryListEmpty'
import { TokenType } from './TokenType'
import { Transition } from '@headlessui/react'
import { NoSearchResults } from './partials/no-search-results'

export function InventoryGrid({
  inventory,
  isActive,
  isLoading
}: {
  inventory: ReturnType<typeof useInventory>
  isActive: boolean
  isLoading: boolean
}) {
  const hasNoResults = inventory.records.length < 1 && !isLoading && inventory.active.searchTerm

  return (
    <Transition show={isActive}>
      {hasNoResults ? (
        <div>
          <NoSearchResults term={inventory.active.searchTerm} clear={() => inventory.refiners.search('')} />
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
