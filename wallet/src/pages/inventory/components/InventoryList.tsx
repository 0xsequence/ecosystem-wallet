import { inert } from '../../../utils/inert'
import { useInventory } from '../helpers/useInventory'
import { InventoryListEmpty } from './InventoryListEmpty'
import { TokenType } from './TokenType'
import { Transition } from '@headlessui/react'

export function InventoryGrid({ isActive }: { isActive: boolean }) {
  const { inventory, inventoryIsEmpty } = useInventory()

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
            {inventory.map((item, index) => (
              <TokenType key={index} item={item} />
            ))}
          </>
        )}
      </div>
    </Transition>
  )
}

export function InventoryList({ isActive }: { isActive: boolean }) {
  const { inventory, inventoryIsEmpty } = useInventory()

  return (
    <Transition show={isActive}>
      <div
        className="isolate flex flex-col gap-2 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:translate-y-2 transition-all"
        {...inert(!isActive)}
      >
        {inventoryIsEmpty ? (
          <InventoryListEmpty />
        ) : (
          <>
            {inventory.map((item, index) => (
              <TokenType key={index} item={item} displayMode="list" />
            ))}
          </>
        )}
      </div>
    </Transition>
  )
}
