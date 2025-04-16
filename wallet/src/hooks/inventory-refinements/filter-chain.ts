import { TokenRecord } from '../../pages/InventoryRoutes/types'

export function chain(values?: TokenRecord[], chain?: string | number | (string | number)[]) {
  if (!chain || !values) {
    return []
  }

  const chains = (Array.isArray(chain) ? chain : [chain]).map(item => item.toString())

  return values.filter(item => chains.includes(item?.chainId?.toString()))
}
