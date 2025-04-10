import { GetTokenBalancesDetailsArgs } from '@0xsequence/indexer'
import { useQuery } from '@tanstack/react-query'

import { getTokenBalancesDetails } from '../utils/balance'
import { TIME } from '../utils/time.const'
import { INDEXER_CLIENT_GATEWAY } from '../utils/indexer'

type TokenBalance = {}

function normalizeInventory(data: Awaited<ReturnType<typeof getTokenBalancesDetails>>) {
  function omitNullBalances(data) {
    const balances = data.balances.filter(chain => chain.results.length > 0)
    const nativeBalances = data.nativeBalances.filter(chain => chain.results?.[0].balance !== '0')

    return { balances, nativeBalances }
  }

  function flatten(data) {
    const set = new Set()

    const arrays = [data.balances, data.nativeBalances]
    arrays
      .flatMap(chain => chain) // flattens one level (chain arrays)
      .flatMap(item => item.results) // flattens results from each item
      .forEach(token => set.add(token))

    return Array.from(set)
  }

  let records = omitNullBalances(data)
  records = flatten(records)

  return records as TokenBalance[]
}

export const useTokenBalancesDetails = ({ ...args }: GetTokenBalancesDetailsArgs) => {
  return useQuery({
    queryKey: ['tokenBalancesDetails', args],
    queryFn: async () => {
      const data = await getTokenBalancesDetails(INDEXER_CLIENT_GATEWAY, args)

      return normalizeInventory(data)
    },
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0],
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
}
