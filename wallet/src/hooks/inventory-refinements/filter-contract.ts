import { TokenRecord } from '../../pages/InventoryRoutes/types'

export function contract(values?: TokenRecord[], contractAddress?: string | string[]) {
  if (!contractAddress || !values) {
    return []
  }

  const contractAddresses = Array.isArray(contractAddress) ? contractAddress : [contractAddress]

  return values.filter(item => contractAddresses.includes(item?.contractAddress))
}
