import { GetTokenBalancesSummaryArgs } from '@0xsequence/indexer'
import { useQuery } from '@tanstack/react-query'

import { getTokenBalancesSummary } from '../utils/balance'
import { TIME } from '../utils/time.const'
import { INDEXER_CLIENT_GATEWAY } from '../utils/indexer'

export const useTokenBalancesSummary = ({ ...args }: GetTokenBalancesSummaryArgs) => {
  return useQuery({
    queryKey: ['tokenBalancesSummary', args],
    queryFn: () => getTokenBalancesSummary(INDEXER_CLIENT_GATEWAY, args),
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0],
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
}
