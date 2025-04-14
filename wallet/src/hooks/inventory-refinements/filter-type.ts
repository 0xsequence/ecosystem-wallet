import { TokenTypeProps } from '../../pages/InventoryRoutes/types'

export function type(
  values?: TokenTypeProps[],
  args?: 'ERC20' | 'ERC1155' | 'ERC721' | 'NATIVE' | 'COIN' | 'COLLECTIBLE'
) {
  if (!values || !type) {
    return values
  }

  const types: (typeof args)[] = Array.isArray(args) ? [...args] : [args]

  return values.filter(item => types.includes(item?.contractType) || types.includes(item?.type))
}
