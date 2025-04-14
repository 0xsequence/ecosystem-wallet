import { TokenTypeProps } from '../../pages/InventoryRoutes/types'

export function tokenId(values?: TokenTypeProps[], tokenId?: string | string[]) {
  if (!tokenId || !values) {
    return values
  }

  const tokenIds = Array.isArray(tokenId) ? tokenId : [tokenId]

  return values.filter(item =>
    item.tokenMetadata?.tokenId ? tokenIds.includes(item.tokenMetadata.tokenId) : false
  )
}
