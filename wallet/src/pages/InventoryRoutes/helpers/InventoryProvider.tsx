import { createContext, useState } from 'react'
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

  const {
    inventory,
    coinInventory,
    coinGroups,
    collectibleInventory,
    inventoryByTokenClass,
    inventoryIsEmpty,
    status,
    refetchInventory
  } = useFetchInventory()

  function contractInfo({ chainId, contractAddress, tokenId }: InventoryItemIdentifier) {
    // console.log(chainId, contractAddress, tokenId)

    const chain = parseInt(chainId as string)

    const result = inventory.find(item => {
      if (contractAddress === ZeroAddress && tokenId === '0') {
        if (item?.chainId === chain && item?.contractAddress === ZeroAddress) {
          return item
        }
      }

      if (contractAddress && tokenId) {
        if (item?.contractAddress === contractAddress && item?.tokenID === tokenId) {
          return item
        }
      }

      if (tokenId === '0') {
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
