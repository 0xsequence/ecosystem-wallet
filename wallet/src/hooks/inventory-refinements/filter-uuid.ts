import { TokenRecords } from '../../pages/InventoryRoutes/types'

/**
 * Filters inventory values by UUID(s).
 *
 * @param values - Inventory list to filter.
 * @param arg - A single UUID or an array of UUIDs.
 * @returns Filtered list of inventory items matching the UUID(s). Returns the original list if no arg is provided.
 */
export function uuid(values?: TokenRecords, arg?: string | string[]): TokenRecords {
  if (!values || !arg) {
    return values ?? []
  }

  const args = Array.isArray(arg) ? arg : [arg]

  return values.filter(item => typeof item?.uuid === 'string' && args.includes(item.uuid))
}
