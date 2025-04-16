import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useAddress } from './use-address'
import { useConfig } from '../../../hooks/useConfig'
import { getTokenBalancesDetails } from '../../../utils/balance'
import { TIME } from '../../../utils/time.const'
import { INDEXER_CLIENT_GATEWAY } from '../../../utils/indexer'
import { normalizeBalances } from '../../../utils/normalize-balances'
import { TokenRecord } from '../types'

export function useFetchInventory() {
  const location = useLocation()
  const address = useAddress()

  const { contractStatus, networkType } = useConfig()

  // Get inventory details
  const args = {
    omitMetadata: false,
    networkType,
    filter: {
      omitNativeBalances: false,
      accountAddresses: address ? [address] : [],
      contractStatus,
      contractWhitelist: [],
      contractBlacklist: []
    }
  }

  const records = useQuery({
    queryKey: ['tokenBalancesDetails', args],
    queryFn: async () => {
      const data = await getTokenBalancesDetails(INDEXER_CLIENT_GATEWAY, args)

      return normalizeBalances(data) as TokenRecord[]
    },
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0],
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  // Refresh inventory details on navigate
  useEffect(() => {
    if (!records.isLoading) {
      const timeSinceLastFetch = Date.now() - records.dataUpdatedAt
      if (location.pathname === '/inventory' && timeSinceLastFetch > 10000) {
        records.refetch()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return records
}
