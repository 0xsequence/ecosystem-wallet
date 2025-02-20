import { Page, SequenceIndexer, Transaction } from "@0xsequence/indexer"
import { useQuery } from "@tanstack/react-query"
import { TIME } from "../utils/time.const"
import { useIndexerClients } from "./useIndexerClients"

export interface GetTransactionHistoryArgs {
  accountAddress: string
  contractAddress?: string
  tokenId?: string
  page?: Page
}


export const getTransactionHistory = async (
  indexerClient: SequenceIndexer,
  { contractAddress, accountAddress, tokenId, page }: GetTransactionHistoryArgs
) => {
  const res = indexerClient.getTransactionHistory({
    includeMetadata: true,
    page,
    filter: {
      accountAddress,
      contractAddress,
      tokenID: tokenId
    }
  })

  return res
}

interface GetTransactionHistorySummaryArgs {
  chainIds: number[]
  accountAddress: string
}

const getTransactionHistorySummary = async (
  indexerClients: Map<number, SequenceIndexer>,
  { accountAddress }: GetTransactionHistorySummaryArgs
): Promise<Transaction[]> => {
  const histories = await Promise.all(
    Array.from(indexerClients.values()).map(indexerClient =>
      getTransactionHistory(indexerClient, {
        accountAddress,
        page: { page: 1 }
      })
    )
  )

  const unorderedTransactions = histories.map(history => history.transactions).flat()
  const orderedTransactions = unorderedTransactions.sort((a, b) => {
    const firstDate = new Date(a.timestamp).getTime()
    const secondDate = new Date(b.timestamp).getTime()
    return secondDate - firstDate
  })

  return orderedTransactions
}

export const useTransactionHistorySummary = (args: GetTransactionHistorySummaryArgs) => {
  const indexerClients = useIndexerClients(args.chainIds)

  return useQuery({
    queryKey: ['transactionHistorySummary', args],
    queryFn: () => getTransactionHistorySummary(indexerClients, args),
    retry: true,
    staleTime: TIME.SECOND,
    refetchOnMount: true,
    enabled: args.chainIds.length > 0 && !!args.accountAddress
  })
}
