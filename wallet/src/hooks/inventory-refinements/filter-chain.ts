import { isTokenGroupRecord, TokenRecords } from '../../pages/InventoryRoutes/types'

export function chain(values?: TokenRecords, chain?: string | number | (string | number)[]) {
  if (!chain || !values) {
    return []
  }

  const chains = (Array.isArray(chain) ? chain : [chain]).map(item => item.toString())

  return values.filter(item => {
    if (isTokenGroupRecord(item)) {
      return false
    }

    return chains.includes(item?.chainId?.toString())
  })
}
