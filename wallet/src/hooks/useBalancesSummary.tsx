import { ContractVerificationStatus, GetTokenBalancesSummaryArgs, SequenceIndexer } from "@0xsequence/indexer"
import { useIndexerClients } from "./useIndexerClients"
import { getNativeTokenBalance, getTokenBalancesSummary } from "../utils/balance"
import { useQuery } from "@tanstack/react-query"
import { TIME } from "../utils/time.const"
import { useAuth } from "../context/AuthContext"
import { compareAddress } from "@0xsequence/design-system"
import { zeroAddress } from "viem"
import { ChainId } from "@0xsequence/network"

export const getBalancesSummary = async (indexerClient: SequenceIndexer, chainId: number, args: GetTokenBalancesSummaryArgs) => {
  if (!args.filter.accountAddresses[0]) {
    return []
  }

  const balances = (
    await Promise.allSettled([
      getNativeTokenBalance(indexerClient, chainId, args.filter.accountAddresses[0]),
      getTokenBalancesSummary(indexerClient, args)
    ])
  )
    .map(res => (res.status === 'fulfilled' ? res.value : []))
    .flat()

  return balances
}

interface UseBalancesSummaryArgs extends GetTokenBalancesSummaryArgs {
  chainIds: number[]
}

export const useBalancesSummary = ({ chainIds, ...args }: UseBalancesSummaryArgs) => {
  const indexerClients = useIndexerClients(chainIds)

  return useQuery({
    queryKey: ['balancesSummary', chainIds, args],
    queryFn: async () => {
      const res = (
        await Promise.all(
          Array.from(indexerClients.entries()).map(([chainId, indexerClient]) => getBalancesSummary(indexerClient, chainId, args))
        )
      ).flat()

      return res
    },
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: chainIds.length > 0 && !!args.filter.accountAddresses[0]
  })
}

export const useAssetBalance =  () => {
   const { authState } = useAuth()
  const accountAddress = authState.status === 'signedIn' ? authState.address : undefined
  const hideUnlistedTokens = true
  const { data: tokenBalancesData, ...rest} = useBalancesSummary({
    // TODO: add other chainIds 
    chainIds: [ChainId.POLYGON],
    filter: {
      accountAddresses: accountAddress ? [accountAddress] : [],
      contractStatus: hideUnlistedTokens ? ContractVerificationStatus.VERIFIED : ContractVerificationStatus.ALL,
      contractWhitelist: [],
      contractBlacklist: []
    }
  }) 
  const coinBalancesUnordered =
    tokenBalancesData?.filter(b => b.contractType === 'ERC20' || compareAddress(b.contractAddress, zeroAddress)) || []
  const coinBalances = coinBalancesUnordered.sort((a, b) => { return Number(b.balance) - Number(a.balance) })

  const collectionBalancesUnordered =
    tokenBalancesData?.filter(b => b.contractType === 'ERC721' || b.contractType === 'ERC1155') || []
  const collectionBalances = collectionBalancesUnordered.sort((a, b) => {
    return Number(b.balance) - Number(a.balance)
  })

  return ({ data: { coinBalances, collectionBalances },...rest })
}
