import type { NativeTokenBalance, GatewayNativeTokenBalances, GatewayTokenBalance } from '@0xsequence/indexer'
import { networks, type NetworkMetadata, type ChainId } from '@0xsequence/network'

// Helper functions to tidy up the data and remove empty chains
function tidyBalances(data?: GatewayTokenBalance[]) {
  if (!data) return []

  return data
    .filter(balance => balance?.results?.length > 0)
    .flatMap(balance => balance.results)
    .map(item => {
      /* @ts-expect-error WIP */
      const chain = networks[item.chainId] as NetworkMetadata
      return { ...item, chain }
    })
}

// Get ERC20 token balances
export function getErc20Inventory(data?: { balances: GatewayTokenBalance[] }) {
  if (!data) return []

  const balances = tidyBalances(data.balances)

  // Get ERC20 contracts
  return balances
    .filter(({ balance, contractType }) => contractType === 'ERC20' && balance !== '0')
    .map(item => ({ ...item, tokenClass: 'erc20' }))
}

// Get collectibles
export function getCollectibleInventory(data?: { balances: GatewayTokenBalance[] }) {
  if (!data) return []

  const balances = tidyBalances(data?.balances)

  // Get ERC721 & ERC1155 contracts
  return balances
    .filter(({ balance, contractType }) => ['ERC721', 'ERC1155'].includes(contractType) && balance !== '0')
    .map(item => ({ ...item, tokenClass: 'collectable' }))
}

// Get native token balances
export function getNativeInventory(data?: { nativeBalances: GatewayNativeTokenBalances[] }) {
  if (!data || !data?.nativeBalances) return []

  return data.nativeBalances
    .filter(balance => balance.results?.length > 0 && balance.results[0].balance !== '0')
    .flatMap(balance => balance.results as (NativeTokenBalance & { chainId: ChainId })[])
    .map(balance => {
      const chain = networks[balance.chainId] as NetworkMetadata
      return { ...balance, ...chain, tokenClass: 'nativeBalance' }
    })
}
