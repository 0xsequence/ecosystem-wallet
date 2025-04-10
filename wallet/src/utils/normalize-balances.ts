import { ChainId, networks } from '@0xsequence/network'
import { formatPrettyBalance } from './format-pretty-balance'
import { ZERO_ADDRESS } from '@0xsequence/design-system'
import { ContractInfo } from '@0xsequence/indexer'

export const CONTRACT_TYPES = {
  NATIVE: 'NATIVE',
  ERC20: 'ERC20',
  ERC1155: 'ERC1155',
  ERC721: 'ERC721'
} as const

export const TOKEN_TYPES = {
  COIN: 'COIN',
  COLLECTIBLE: 'COLLECTIBLE',
  GROUP: 'GROUP'
}

export function normalizeBalances(data: Awaited<ReturnType<typeof getTokenBalancesDetails>>) {
  const set = new Set()

  // Omit null balances
  const balances = data.balances.filter(chain => chain.results.length > 0)
  const nativeBalances = data.nativeBalances.filter(chain => chain.results?.[0].balance !== '0')

  // Flatten
  const arrays = [balances, nativeBalances]
  arrays
    .flatMap(chain => chain) // flattens one level (chain arrays)
    .flatMap(item => item.results) // flattens results from each item
    .forEach(token => set.add(token))

  let records = Array.from(set)

  records = normalizeTokens(records)

  return records as TokenBalance[]
}

export function normalizeTokens(balances) {
  if (!balances) return []

  return balances?.map(token => {
    // Assign native contract type to native balances
    if (!token.contractType) {
      token.contractType = CONTRACT_TYPES.NATIVE
    }

    const chainInfo = networks[token.chainId as ChainId]
    const testnet = chainInfo?.type?.toLowerCase() === 'testnet'

    switch (token.contractType) {
      case CONTRACT_TYPES.NATIVE:
        return {
          ...token,
          type: TOKEN_TYPES.COIN,
          uuid: `${token.chainId}::native`,
          path: `/${token.chainId}/native`,
          chainInfo,
          contractAddress: ZERO_ADDRESS,
          testnet,
          symbol: chainInfo?.nativeToken?.symbol,
          decimals: chainInfo?.nativeToken?.decimals,
          logoURI: chainInfo?.logoURI,
          prettyBalance: formatPrettyBalance(token.balance, chainInfo.nativeToken.decimals)
        }

      case CONTRACT_TYPES.ERC20:
        return {
          ...token,
          type: TOKEN_TYPES.COIN,
          uuid: `${token.chainId}::${token.contractAddress}`,
          path: `/${token.chainId}/${token.contractAddress}`,
          chainInfo,
          symbol: token.contractInfo.symbol,
          decimals: token.contractInfo.decimals,
          logoURI: token.contractInfo.logoURI,
          testnet,

          prettyBalance: formatPrettyBalance(token.balance, token.contractInfo?.decimals || undefined)
        }

      case CONTRACT_TYPES.ERC1155:
      case CONTRACT_TYPES.ERC721:
        return {
          ...token,
          type: TOKEN_TYPES.COLLECTIBLE,
          uuid: `${token.chainId}::${token.contractAddress}::${token.tokenID || 0}`,
          path: `/${token.chainId}/${token.contractAddress}/${token.tokenID || 0}`,
          chainInfo,
          testnet,
          prettyBalance: token.balance
        }
    }
  })
}
