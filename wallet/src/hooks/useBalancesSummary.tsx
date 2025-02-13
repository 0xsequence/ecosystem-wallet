import { GetTokenBalancesDetailsArgs } from '@0xsequence/indexer'
import { useQuery } from '@tanstack/react-query'

import { getTokenBalancesDetails } from '../utils/balance'
import { getIndexerClient } from '../utils/indexer'
import { TIME } from '../utils/time.const'

// interface UseBalancesSummaryArgs extends GetTokenBalancesSummaryArgs {
//   chainIds: number[]
// }

// export const useBalancesSummary = ({ ...args }: UseBalancesSummaryArgs) => {
//   const indexerClient = getIndexerClient()

//   return useQuery({
//     queryKey: ['balancesSummary', args],
//     queryFn: () =>  getTokenBalancesSummary(indexerClient, args),
//     retry: true,
//     staleTime: 30 * TIME.SECOND,
//     enabled: !!args.filter.accountAddresses[0]
//   })
// }

// export const useAssetBalance = () => {
//   const { address: accountAddress } = useAuth()
//   const { chainIds, hideUnlistedTokens } = useConfig()
//   const { data: tokenBalancesData, ...rest } = useBalancesSummary({
//     chainIds,
//     omitMetadata: false,
//     filter: {
//       omitNativeBalances: false,
//       accountAddresses: accountAddress ? [accountAddress] : [],
//       contractStatus: hideUnlistedTokens
//         ? ContractVerificationStatus.VERIFIED
//         : ContractVerificationStatus.ALL,
//       contractWhitelist: [],
//       contractBlacklist: []
//     }
//   })
//   const coinBalancesUnordered =
//     tokenBalancesData?.filter(
//       b => b.contractType === 'ERC20' || compareAddress(b.contractAddress, zeroAddress)
//     ) || []
//   const coinBalances = coinBalancesUnordered.sort((a, b) => {
//     return Number(b.balance) - Number(a.balance)
//   })

//   const collectionBalancesUnordered =
//     tokenBalancesData?.filter(b => b.contractType === 'ERC721' || b.contractType === 'ERC1155') || []
//   const collectionBalances = collectionBalancesUnordered.sort((a, b) => {
//     return Number(b.balance) - Number(a.balance)
//   })

//   return { data: { coinBalances, collectionBalances }, ...rest }
// }

export const useTokenBalancesDetails = ({ ...args }: GetTokenBalancesDetailsArgs) => {
  const indexerClient = getIndexerClient()

  return useQuery({
    queryKey: ['tokenBalancesDetails', args],
    queryFn: () => getTokenBalancesDetails(indexerClient, args),
    // select(data) {
    //   const { balances, nativeBalances, ...rest } = data

    //   return {
    //     balances: balances.filter(balance => balance.results.length > 0).map(balance => balance.results),
    //     nativeBalances: nativeBalances
    //       .filter(balance => balance.results.length > 0)
    //       .map(balance => balance.results),
    //     ...rest
    //   }
    // },
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0]
  })
}
