import { isTokenGroupRecord, TokenRecords } from '../../pages/InventoryRoutes/types'
import { groupContractsAcrossNetworks } from './organize-group-contracts-across-networks'

/**
 * Filters inventory values by group name(s).
 *
 * @param values - Inventory list to filter.
 * @param arg - A single group name or an array of group names.
 * @returns Filtered list of inventory items matching the group(s). Returns the original list if no arg is provided.
 */
export function group(values?: TokenRecords, arg?: string | string[]): TokenRecords {
  if (!values || !arg) {
    return []
  }

  const args = Array.isArray(arg) ? arg : [arg]

  const groups = groupContractsAcrossNetworks(values, { minGroupSize: 2 })

  return groups
    .filter(item => isTokenGroupRecord(item))
    .filter(item => {
      const groupName = item?.group

      return typeof groupName === 'string' && args.includes(groupName)
    })
}
