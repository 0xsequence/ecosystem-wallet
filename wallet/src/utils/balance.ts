import { ContractType, GetTokenBalancesSummaryArgs, SequenceIndexer, TokenBalance } from '@0xsequence/indexer'
import { zeroAddress } from 'viem'

export const getTokenBalancesSummary = async (
  indexerClient: SequenceIndexer,
  args: GetTokenBalancesSummaryArgs
) => {
  const res = await indexerClient.getTokenBalancesSummary(args)
  return res?.balances || []
}

export const getNativeTokenBalance = async (
  indexerClient: SequenceIndexer,
  chainId: number,
  accountAddress: string
) => {
  const res = await indexerClient.getNativeTokenBalance({ accountAddress })

  const tokenBalance: TokenBalance = {
    chainId,
    contractAddress: zeroAddress,
    accountAddress,
    balance: res?.balance.balance || '0',
    contractType: ContractType.UNKNOWN,
    blockHash: '',
    blockNumber: 0,
    tokenID: '',
    uniqueCollectibles: '',
    isSummary: false
  }

  return tokenBalance
}
