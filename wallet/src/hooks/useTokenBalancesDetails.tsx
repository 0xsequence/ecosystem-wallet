import { GetTokenBalancesDetailsArgs } from '@0xsequence/indexer'
import { useQuery } from '@tanstack/react-query'

import { getTokenBalancesDetails } from '../utils/balance'
import { getIndexerClient } from '../utils/indexer'
import { TIME } from '../utils/time.const'

export const useTokenBalancesDetails = ({ ...args }: GetTokenBalancesDetailsArgs) => {
  const indexerClient = getIndexerClient()
  return useQuery({
    queryKey: ['tokenBalancesDetails', args],
    queryFn: () => getTokenBalancesDetails(indexerClient, args),
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0]
  })
}
