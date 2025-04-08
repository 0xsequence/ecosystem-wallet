import { useFavoriteTokens } from '../../../hooks/useFavoriteTokens'
import { TokenTypeProps } from '../types'
import { CoinGroup } from './useFetchInventory'

export function useSortByFavorites(inventory?: (CoinGroup | TokenTypeProps | null)[]) {
  const { has } = useFavoriteTokens()
  if (!inventory) return []
  return inventory.sort((a, b) => {
    const uuidA = `${a?.chainId}::${a?.contractAddress}::${a?.tokenID}`
    const uuidB = `${b?.chainId}::${b?.contractAddress}::${b?.tokenID}`

    if (has(uuidA) && !has(uuidB)) return -1
    if (!has(uuidA) && has(uuidB)) return 1
    return 0
  })
}
