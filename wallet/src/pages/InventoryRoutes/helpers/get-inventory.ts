import type { NativeTokenBalance, GatewayNativeTokenBalances, GatewayTokenBalance } from '@0xsequence/indexer'
import { networks, type ChainId } from '@0xsequence/network'
import { createNativeTokenBalance } from '../../../utils/balance'
import { useFavoriteTokens } from '../../../hooks/useFavoriteTokens'

// Helper functions to tidy up the data and remove empty chains
function tidyBalances(data?: GatewayTokenBalance[]) {
  if (!data) return []

  return data
    .filter(balance => balance?.results?.length > 0)
    .flatMap(balance => balance.results)
    .map(item => {
      const chain = networks[item.chainId as ChainId]

      const contractInfo = item.contractInfo

      let contract = {}
      if (contractInfo) {
        const token = {
          name: contractInfo.name,
          symbol: contractInfo.symbol,
          decimals: contractInfo.decimals,
          logoURI: contractInfo.logoURI
        }

        const contractType = contractInfo.type

        const extensions = contractInfo.extensions

        contract = { token, contractType, extensions }
      }

      return { ...item, isNative: false, ...chain, ...contract }
    })
}

// Get ERC20 token balances
export function useErc20Inventory(data?: { balances: GatewayTokenBalance[] }) {
  const { has } = useFavoriteTokens()
  if (!data) return []

  const balances = tidyBalances(data.balances)

  // Get ERC20 contracts
  const withValues = balances
    .filter(({ balance, contractType }) => contractType === 'ERC20' && balance !== '0')
    .map(item => ({
      ...item,
      tokenClass: 'erc20',
      uuid: `${item.chainId}::${item.contractAddress}::${item.tokenID}`
    }))
    .sort((a, b) => {
      // Sort by name

      const nameA = a.tokenMetadata?.name || ''
      const nameB = b.tokenMetadata?.name || ''

      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
    .sort((a, b) => {
      // Sort by favorites

      const uuidA = `${a.chainId}::${a.contractAddress}::${a.tokenID}`
      const uuidB = `${b.chainId}::${b.contractAddress}::${b.tokenID}`

      if (has(uuidA) && !has(uuidB)) return -1
      if (!has(uuidA) && has(uuidB)) return 1
      return 0
    })

  return withValues
}

// Get collectibles
export function useCollectibleInventory(data?: { balances: GatewayTokenBalance[] }) {
  const { has } = useFavoriteTokens()

  if (!data) return []

  const balances = tidyBalances(data?.balances)

  // Get ERC721 & ERC1155 contracts
  return balances
    .filter(({ balance, contractType }) => ['ERC721', 'ERC1155'].includes(contractType) && balance !== '0')
    .map(item => ({
      ...item,
      tokenClass: 'collectable',
      uuid: `${item.chainId}::${item.contractAddress}::${item.tokenID}`
    }))
    .sort((a, b) => {
      const nameA = a.tokenMetadata?.name || ''
      const nameB = b.tokenMetadata?.name || ''

      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
    .sort((a, b) => {
      const uuidA = `${a.chainId}::${a.contractAddress}::${a.tokenID}`
      const uuidB = `${b.chainId}::${b.contractAddress}::${b.tokenID}`

      if (has(uuidA) && !has(uuidB)) return -1
      if (!has(uuidA) && has(uuidB)) return 1
      return 0
    })
}

// Get native token balances
export function useNativeInventory(address: string, data?: { nativeBalances: GatewayNativeTokenBalances[] }) {
  const { has } = useFavoriteTokens()
  if (!data || !data?.nativeBalances) return []

  const withBalances = data.nativeBalances
    .filter(balance => balance.results?.length > 0 && balance.results[0].balance !== '0')
    .flatMap(balance => balance.results as (NativeTokenBalance & { chainId: ChainId })[])
    .map(balance => {
      const chain = networks[balance.chainId]
      const nativeTokenBalance = createNativeTokenBalance(balance.chainId, address, balance.balance)
      const token = { ...chain.nativeToken }
      const uuid = `${balance.chainId}::${nativeTokenBalance.contractAddress}::${nativeTokenBalance.tokenID}`
      const isNative = true
      return { ...chain, isNative, token, ...nativeTokenBalance, uuid, tokenClass: 'nativeBalance' }
    })
    .sort((a, b) => {
      const balanceA = Number(a.balance)
      const balanceB = Number(b.balance)

      if (balanceA < balanceB) return -1
      if (balanceA > balanceB) return 1
      return 0
    })
    .sort((a, b) => {
      const uuidA = `${a.chainId}::${a.contractAddress}::${a.tokenID}`
      const uuidB = `${b.chainId}::${b.contractAddress}::${b.tokenID}`

      if (has(uuidA) && !has(uuidB)) return -1
      if (!has(uuidA) && has(uuidB)) return 1
      return 0
    })

  return withBalances
}
