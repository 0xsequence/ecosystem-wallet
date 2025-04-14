import { TokenTypeProps } from '../../pages/InventoryRoutes/types'

export function contract(values?: TokenTypeProps[], contractAddress?: string | string[]) {
  if (!contractAddress || !values) {
    return values
  }

  const contractAddresses = Array.isArray(contractAddress) ? contractAddress : [contractAddress]

  return values.filter(item => contractAddresses.includes(item?.contractAddress))
}
