import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { ContractVerificationStatus } from '@0xsequence/indexer'
import { useAuth } from '../../../context/AuthContext'
import { useConfig } from '../../../hooks/useConfig'
import { useTokenBalancesDetails } from '../../../hooks/useTokenBalancesDetails'
import { useErc20Inventory, useCollectibleInventory, useNativeInventory } from './get-inventory'

import { TokenTypeProps } from '../types'
import { useSortByFavorites } from './useSortByFavorites'
import { useLocalStore } from '../../../utils/local-store'
import { currencyDefinition, networksMap } from '../../../utils/currencyGroups/networks'

export type CoinGroup = currencyDefinition & {
  balance: string
  chains: { name?: string; title?: string; chainId: number }[]
  tokenClass: 'group'
  testnet: boolean
}

function useRefreshInventoryOnNavigate(records: ReturnType<typeof useTokenBalancesDetails>) {
  const { isLoading, refetch, dataUpdatedAt } = records

  const location = useLocation()
  useEffect(() => {
    if (!isLoading) {
      const timeSinceLastFetch = Date.now() - dataUpdatedAt
      if (location.pathname === '/inventory' && timeSinceLastFetch > 10000) {
        refetch()
      }
    }
  }, [location])
}

function useAddress() {
  const [altAddress] = useLocalStore<string>('address')

  const { address = '' } = useAuth()

  return altAddress && altAddress.length > 0 ? altAddress : address
}

export function useFetchInventory() {
  const { hideUnlistedTokens } = useConfig()

  const address = useAddress()

  // QUERY for inventory data
  const records = useTokenBalancesDetails({
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

  const { data, isLoading, refetch } = records

  useRefreshInventoryOnNavigate(records)

  const erc20Inventory = useErc20Inventory(records.data)
  const collectibleInventory = useCollectibleInventory(records.data)
  const nativeBalances = useNativeInventory(address, records.data)

  const coinInventory = useSortByFavorites([...nativeBalances, ...erc20Inventory] as TokenTypeProps[])

  const groups = coinInventory.reduce((acc, coin) => {
    if (!coin) return acc

    const chainId = coin.chainId
    const network = networksMap[chainId]

    if (network?.currencies) {
      const record = network.currencies.find(
        currency => currency.contractAddress.toLowerCase() === coin.contractAddress.toLowerCase()
      )

      let balance = '0'
      if (coin.balance && typeof coin.balance === 'string') {
        balance = coin.balance
      }

      if (record && record.group) {
        coin.group = record.group
        if (!acc[record.group]) {
          acc[record.group] = {
            ...record,
            balance: '0',
            chains: [],
            tokenClass: 'group',
            testnet: record.group.includes('testnet')
          }
        }

        acc[record.group].balance = (BigInt(acc[record.group].balance) + BigInt(balance)).toString()

        acc[record.group].chains.push({
          name: coin.name,
          title: coin.title,
          chainId: coin.chainId
        })
      }
    }
    return acc
  }, {} as Record<string, CoinGroup>)

  const coinGroups = Object.entries(groups).map(([key, value]) => {
    return { key, ...value }
  })

  const inventoryIsEmpty = !nativeBalances?.length && !erc20Inventory?.length && !collectibleInventory?.length
  // Merge & Pad to 12 items
  const inventory = [
    ...nativeBalances,
    ...erc20Inventory,
    ...collectibleInventory
  ] as (TokenTypeProps | null)[]

  return {
    refetchInventory: refetch,
    inventory,
    inventoryIsEmpty,
    raw: { data },
    status: { isLoading },
    coinInventory,
    coinGroups,
    collectibleInventory,
    inventoryByTokenClass: { nativeBalances, erc20Inventory, collectibleInventory }
  }
}
