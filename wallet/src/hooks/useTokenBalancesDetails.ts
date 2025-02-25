import { GetTokenBalancesDetailsArgs } from '@0xsequence/indexer'
import { useQuery } from '@tanstack/react-query'

import { getTokenBalancesDetails } from '../utils/balance'
import { TIME } from '../utils/time.const'
import { INDEXER_CLIENT_GATEWAY } from '../utils/indexer'

export const useTokenBalancesDetails = ({ ...args }: GetTokenBalancesDetailsArgs) => {
  return useQuery({
    queryKey: ['tokenBalancesDetails', args],
    queryFn: () => getTokenBalancesDetails(INDEXER_CLIENT_GATEWAY, args),
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0],
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
}
