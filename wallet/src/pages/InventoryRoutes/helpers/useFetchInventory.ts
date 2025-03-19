import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { ContractVerificationStatus } from '@0xsequence/indexer'
import { useAuth } from '../../../context/AuthContext'
import { useConfig } from '../../../hooks/useConfig'
import { useTokenBalancesDetails } from '../../../hooks/useTokenBalancesDetails'
import { useErc20Inventory, useCollectibleInventory, useNativeInventory } from './get-inventory'
import { padArray } from '../../../utils/pad-array'
import { TokenTypeProps } from '../types'
import { useSortByFavorites } from './useSortByFavorites'

export function useFetchInventory() {
  const { hideUnlistedTokens } = useConfig()
  const { address = '' } = useAuth()

  const location = useLocation()
  const { data, dataUpdatedAt, isLoading, refetch } = useTokenBalancesDetails({
    omitMetadata: false,
    filter: {
      omitNativeBalances: false,
      accountAddresses: address ? [address] : [],
      contractStatus: hideUnlistedTokens
        ? ContractVerificationStatus.VERIFIED
        : ContractVerificationStatus.ALL,
      contractWhitelist: [],
      contractBlacklist: []
    }
  })

  // Refetch inventory if route changes to /inventory and last fetch was >10s ago
  useEffect(() => {
    if (!isLoading) {
      const timeSinceLastFetch = Date.now() - dataUpdatedAt
      if (location.pathname === '/inventory' && timeSinceLastFetch > 10000) {
        refetch()
      }
    }
  }, [location])

  const erc20Inventory = useErc20Inventory(data)
  const collectibleInventory = useCollectibleInventory(data)
  const nativeBalances = useNativeInventory(address, data)

  const coinInventory = useSortByFavorites([...nativeBalances, ...erc20Inventory] as TokenTypeProps[])

  const inventoryIsEmpty = !nativeBalances?.length && !erc20Inventory?.length && !collectibleInventory?.length
  // Merge & Pad to 12 items
  const inventory = padArray(
    [...nativeBalances, ...erc20Inventory, ...collectibleInventory],
    null,
    12
  ) as (TokenTypeProps | null)[]

  return {
    refetchInventory: refetch,
    inventory,
    inventoryIsEmpty,
    raw: { data },
    status: { isLoading },
    coinInventory,
    collectibleInventory,
    inventoryByTokenClass: { nativeBalances, erc20Inventory, collectibleInventory }
  }
}
