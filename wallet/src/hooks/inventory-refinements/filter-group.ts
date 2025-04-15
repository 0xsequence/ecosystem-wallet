import { TokenTypeProps } from '../../pages/InventoryRoutes/types'

export function group(values?: TokenTypeProps[], arg?: string | string[]) {
  if (!values || !arg) {
    return values
  }

  const args = Array.isArray(arg) ? [...arg] : [arg]

  return values.filter(item => args.includes(item?.group?.group))
}
