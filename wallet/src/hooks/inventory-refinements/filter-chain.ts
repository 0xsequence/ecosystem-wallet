import { TokenTypeProps } from '../../pages/InventoryRoutes/types'

export function chain(values?: TokenTypeProps[], chain?: string | number | (string | number)[]) {
  if (!chain || !values) {
    return values
  }

  const chains = (Array.isArray(chain) ? chain : [chain]).map(item => item.toString())

  return values.filter(item => chains.includes(item?.chainId?.toString()))
}
