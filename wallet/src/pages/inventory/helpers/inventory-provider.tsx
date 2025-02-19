import { createContext, useState } from 'react'
import { type TokenTypeProps } from '../types'

import { useFetchInventory } from './use-fetch-inventory'
import { ZeroAddress } from 'ethers'
import { ChainId } from '@0xsequence/network'

type InventoryItemIdentifier = {
  chainId: ChainId
  contractAddress: string
  tokenId?: string
}

type ShowInventoryItem = InventoryItemIdentifier | false

type InventoryContext = {
  showInventoryItem: ShowInventoryItem
  setShowInventoryItem: (show: ShowInventoryItem) => void
  contractInfo: (info: InventoryItemIdentifier) => TokenTypeProps | null
  inventory: (TokenTypeProps | null)[]
  inventoryIsEmpty: boolean
  status: { isLoading: boolean }
}

export const Inventory = createContext<InventoryContext | null>(null)

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [showInventoryItem, setShowInventoryItem] = useState<ShowInventoryItem>(false)

  const { inventory, inventoryIsEmpty, status } = useFetchInventory()

  function contractInfo({ chainId, contractAddress, tokenId }: InventoryItemIdentifier) {
    const result = inventory.find(item => {
      if (contractAddress && tokenId && item?.tokenClass !== 'nativeBalance') {
        if (item?.contractAddress === contractAddress && item?.tokenID === tokenId) {
          return item
        }
      }

      if (!tokenId) {
        if (
          chainId === item?.chainId &&
          (item?.contractAddress === contractAddress || item?.contractAddress === ZeroAddress)
        ) {
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
