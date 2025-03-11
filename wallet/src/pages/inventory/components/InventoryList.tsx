import { useInventory } from '../helpers/useInventory'
import { InventoryListEmpty } from './InventoryListEmpty'
import { TokenType } from './TokenType'
import { Transition } from '@headlessui/react'
function inert(condition: boolean) {
  return {
    'data-inert': condition ? 'true' : undefined,
    inert: condition ? 'inert' : undefined
  }
}

export function InventoryGrid({ isActive }: { isActive: boolean }) {
  const { inventory, inventoryIsEmpty } = useInventory()

  return (
    <div
      className="isolate grid grid-cols-2 sm:grid-cols-4 gap-2  data-[inert]:opacity-0  data-[inert]:scale-95 data-[inert]:translate-y-2 transition-all"
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
  )
}

export function InventoryList({ isActive }: { isActive: boolean }) {
  const { inventory, inventoryIsEmpty } = useInventory()

  return (
    <div
      className="isolate flex flex-col gap-2 data-[inert]:opacity-0 data-[inert]:scale-95 data-[inert]:translate-y-2 transition-all"
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
  )
}
