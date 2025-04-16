import { TokenPrice } from '@0xsequence/api'
import { ZERO_ADDRESS, compareAddress } from '@0xsequence/design-system'
import {
  ContractType,
  GetTokenBalancesDetailsArgs,
  GetTokenBalancesSummaryArgs,
  SequenceIndexerGateway,
  TokenBalance
} from '@0xsequence/indexer'
import { ethers } from 'ethers'
import { TokenRecord } from '../pages/InventoryRoutes/types'

export const isNativeCoinBalance = (balance: TokenRecord): balance is TokenRecord => {
  return compareAddress((balance as TokenRecord).contractAddress, ethers.ZeroAddress)
}

export const getTokenBalancesDetails = async (
  indexerClient: SequenceIndexerGateway,
  args: GetTokenBalancesDetailsArgs
) => {
  const res = await indexerClient.getTokenBalancesDetails(args)
  return res || {}
}

export const getTokenBalancesSummary = async (
  indexerClient: SequenceIndexerGateway,
  args: GetTokenBalancesSummaryArgs
) => {
  const res = await indexerClient.getTokenBalancesSummary(args)
  return res?.balances || []
}

interface ComputeBalanceFiat {
  balance: TokenRecord
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
  const valueFormatted = ethers.formatUnits(balance.balance || '0', decimals)
  const usdValue = parseFloat(valueFormatted) * priceFiat
  totalUsd += usdValue

  const fiatValue = totalUsd * conversionRate

  return `${fiatValue.toFixed(2)}`
}

export const createNativeTokenBalance = (
  chainId: number,
  accountAddress: string,
  balance: string = '0'
): TokenBalance => {
  return {
    chainId,
    contractAddress: ZERO_ADDRESS,
    accountAddress,
    contractType: ContractType.UNKNOWN, // NATIVE
    balance,
    blockHash: '',
    blockNumber: 0,
    tokenID: '',
    isSummary: false,
    uniqueCollectibles: ''
  }
}
