import { createContext, useState } from 'react'
import { type TokenTypeProps } from '../types'

import { useFetchInventory } from './use-fetch-inventory'
import { ZeroAddress } from 'ethers'

type InventoryContext = {
  showInventoryItem: { contractAddress: string; tokenId?: string } | false
  setShowInventoryItem: (show: { contractAddress: string; tokenId?: string } | false) => void
  contractInfo: (contractAddress: string, tokenId?: string) => TokenTypeProps | null
  inventory: (TokenTypeProps | null)[]
  inventoryIsEmpty: boolean
  status: { isLoading: boolean }
}

export const Inventory = createContext<InventoryContext | null>(null)

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [showInventoryItem, setShowInventoryItem] = useState<
    { contractAddress: string; tokenId?: string } | false
  >(false)

  const { inventory, inventoryIsEmpty, status } = useFetchInventory()

  function contractInfo(contractAddress: string, tokenId?: string) {
    const result = inventory.find(item => {
      if (contractAddress && tokenId && item?.tokenClass !== 'nativeBalance') {
        if (item?.contractAddress === contractAddress && item?.tokenID === tokenId) {
          return item
        }
      }

      if (!tokenId) {
        if (item?.contractAddress === contractAddress || item?.contractAddress === ZeroAddress) {
          return item
        }
      }
    })

    return result as TokenTypeProps
  }

  return (
    <Inventory.Provider
      value={{ showInventoryItem, setShowInventoryItem, contractInfo, inventory, inventoryIsEmpty, status }}
    >
      {children}
    </Inventory.Provider>
  )
}
