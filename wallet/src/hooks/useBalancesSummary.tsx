import { compareAddress } from '@0xsequence/design-system'
import { ContractVerificationStatus, GetTokenBalancesSummaryArgs } from '@0xsequence/indexer'
import { useQuery } from '@tanstack/react-query'
import { zeroAddress } from 'viem'

import { getTokenBalancesDetails, getTokenBalancesSummary } from '../utils/balance'
import { TIME } from '../utils/time.const'

import { useAuth } from '../context/AuthContext'

import { useConfig } from './useConfig'
import { useIndexerClients } from './useIndexerClients'

interface UseBalancesSummaryArgs extends GetTokenBalancesSummaryArgs {
  chainIds: number[]
}

export const useBalancesSummary = ({ ...args }: UseBalancesSummaryArgs) => {
  const indexerClients = useIndexerClients()

  return useQuery({
    queryKey: ['balancesSummary', args],
    queryFn: async () => {
      const res = (
        await Promise.all(
          Array.from(indexerClients.values()).map(indexerClient =>
            getTokenBalancesSummary(indexerClient, args)
          )
        )
      ).flat()

      return res
    },
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0]
  })
}

export const useAssetBalance = () => {
  const { address: accountAddress } = useAuth()
  const { chainIds, hideUnlistedTokens } = useConfig()
  const { data: tokenBalancesData, ...rest } = useBalancesSummary({
    chainIds,
    omitMetadata: false,
    filter: {
      omitNativeBalances: false,
      accountAddresses: accountAddress ? [accountAddress] : [],
      contractStatus: hideUnlistedTokens
        ? ContractVerificationStatus.VERIFIED
        : ContractVerificationStatus.ALL,
      contractWhitelist: [],
      contractBlacklist: []
    }
  })
  const coinBalancesUnordered =
    tokenBalancesData?.filter(
      b => b.contractType === 'ERC20' || compareAddress(b.contractAddress, zeroAddress)
    ) || []
  const coinBalances = coinBalancesUnordered.sort((a, b) => {
    return Number(b.balance) - Number(a.balance)
  })

  const collectionBalancesUnordered =
    tokenBalancesData?.filter(b => b.contractType === 'ERC721' || b.contractType === 'ERC1155') || []
  const collectionBalances = collectionBalancesUnordered.sort((a, b) => {
    return Number(b.balance) - Number(a.balance)
  })

  return { data: { coinBalances, collectionBalances }, ...rest }
}

export const useTokenBalancesDetails = ({ ...args }: UseBalancesSummaryArgs) => {
  const indexerClients = useIndexerClients()

  return useQuery({
    queryKey: ['tokenBalancesDetails', args],
    queryFn: async () => {
      const res = (
        await Promise.all(
          Array.from(indexerClients.values()).map(indexerClient =>
            getTokenBalancesDetails(indexerClient, args)
          )
        )
      ).flat()

      return res
    },
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: !!args.filter.accountAddresses[0]
  })
}
