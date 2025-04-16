import { isTokenRecord, TokenRecords } from '../../pages/InventoryRoutes/types'

export function contract(values?: TokenRecords, contractAddress?: string | string[]) {
  if (!contractAddress || !values) {
    return []
  }

  const contractAddresses = Array.isArray(contractAddress) ? contractAddress : [contractAddress]

  return values
    .filter(item => isTokenRecord(item))
    .filter(item => contractAddresses.includes(item?.contractAddress))
}
