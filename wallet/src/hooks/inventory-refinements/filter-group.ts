import { TokenRecord } from '../../pages/InventoryRoutes/types'

/**
 * Filters inventory values by group name(s).
 *
 * @param values - Inventory list to filter.
 * @param arg - A single group name or an array of group names.
 * @returns Filtered list of inventory items matching the group(s). Returns the original list if no arg is provided.
 */
export function group(values?: TokenRecord[], arg?: string | string[]): TokenRecord[] {
  if (!values || !arg) {
    return []
  }

  const args = Array.isArray(arg) ? arg : [arg]

  return values.filter(item => {
    const groupName = item?.group?.group
    return typeof groupName === 'string' && args.includes(groupName)
  })
}
