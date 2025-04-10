import { createContext, useCallback, useMemo, useState } from 'react'
import type { TokenTypeProps } from '../types'

import { CoinGroup, useFetchInventory } from './useFetchInventory'
import { ZeroAddress } from 'ethers'
import { ChainId } from '@0xsequence/network'

type InventoryItemIdentifier = {
  chainId: string | ChainId
  contractAddress: string
  tokenClass?: 'erc20' | 'collectable' | 'nativeBalance'
  tokenId?: string
}

type ShowInventoryItem = InventoryItemIdentifier | false

type InventoryContext = {
  showSendModal: boolean
  setShowSendModal: (show: boolean) => void
  showInventoryItem: ShowInventoryItem
  setShowInventoryItem: (show: ShowInventoryItem) => void
  contractInfo: (info: InventoryItemIdentifier) => TokenTypeProps | null
  inventory: (TokenTypeProps | null)[]
  inventoryByTokenClass: {
    nativeBalances: TokenTypeProps[]
    erc20Inventory: TokenTypeProps[]
    collectibleInventory: TokenTypeProps[]
  }
  coinInventory: TokenTypeProps[]
  coinGroups: CoinGroup[]
  collectibleInventory: TokenTypeProps[]
  inventoryIsEmpty: boolean
  status: { isLoading: boolean }
  refetchInventory: () => void
}

export const Inventory = createContext<InventoryContext | null>(null)

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [showSendModal, setShowSendModal] = useState<boolean>(false)
  const [showInventoryItem, setShowInventoryItem] = useState<ShowInventoryItem>(false)

  const records = useFetchInventory()

  const inventory = useCallback(records => (records ? new InventoryClass(records) : null), [records])

  const results = inventory(records)?.filter.byChain(1).filter.byType('erc20').sort.byBalance().records
  console.log('>>?', inventory(results)?.filter.byType('erc20').sort.byBalance().records)

  return <Inventory.Provider value={{}}>{children}</Inventory.Provider>

  return (
    <Inventory.Provider
      value={{
        showSendModal,
        setShowSendModal,
        showInventoryItem,
        setShowInventoryItem,
        contractInfo,
        inventory,
        /* @ts-expect-error FIXME */
        inventoryByTokenClass,
        /* @ts-expect-error FIXME */
        coinInventory,

        coinGroups,
        /* @ts-expect-error FIXME */
        collectibleInventory,
        inventoryIsEmpty,
        status,
        refetchInventory
      }}
    >
      {children}
    </Inventory.Provider>
  )
}
