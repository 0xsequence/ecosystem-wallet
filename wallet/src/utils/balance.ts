import { TokenPrice } from '@0xsequence/api'
import { compareAddress } from '@0xsequence/design-system'
import {
  ContractType,
  GetTokenBalancesDetailsArgs,
  GetTokenBalancesSummaryArgs,
  SequenceIndexer,
  TokenBalance
} from '@0xsequence/indexer'
import { ethers } from 'ethers'
import { zeroAddress } from 'viem'

export const getTokenBalancesDetails = async (
  indexerClient: SequenceIndexer,
  args: GetTokenBalancesDetailsArgs
) => {
  const res = await indexerClient.getTokenBalancesDetails(args)
  return res?.balances || []
}

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

interface ComputeBalanceFiat {
  balance: TokenBalance
  prices: TokenPrice[]
  decimals: number
  conversionRate: number
}

export const computeBalanceFiat = ({
  balance,
  prices,
  decimals,
  conversionRate
}: ComputeBalanceFiat): string => {
  let totalUsd = 0

  const priceForToken = prices.find(p => compareAddress(p.token.contractAddress, balance.contractAddress))
  if (!priceForToken) {
    return '0.00'
  }
  const priceFiat = priceForToken.price?.value || 0
  const valueFormatted = ethers.formatUnits(balance.balance, decimals)
  const usdValue = parseFloat(valueFormatted) * priceFiat
  totalUsd += usdValue

  const fiatValue = totalUsd * conversionRate

  return `${fiatValue.toFixed(2)}`
}
