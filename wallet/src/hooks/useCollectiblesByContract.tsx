import { TokenRecord } from '../pages/InventoryRoutes/types'

export function useCollectiblesByContract(inventory: (TokenRecord | null)[]) {
  return inventory.reduce((acc, item) => {
    if (!item) {
      return acc
    }

    if (item.tokenClass === 'collectable') {
      if (!acc[item.contractAddress]) {
        acc[item.contractAddress] = []
      }
      acc[item.contractAddress].push(item)
    }
    return acc
  }, {} as Record<string, TokenRecord[]>)
}
