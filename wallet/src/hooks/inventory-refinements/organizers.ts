import { groupContractsAcrossNetworks } from './organize-group-contracts-across-networks'
import { TokenRecords } from '../../pages/InventoryRoutes/types'

/**
 * Arguments accepted by each organizer function.
 */
export type OrganizeArgs = {
  groupContractsAcrossNetworks: {
    minGroupSize?: number
  }
}

/**
 * Organizer function definitions. Each function returns a new organized TokenRecords list.
 */
export type OrganizeFns = {
  [K in keyof OrganizeArgs]: (values?: TokenRecords, args?: OrganizeArgs[K]) => TokenRecords
}

export type OrganizeKeys = keyof OrganizeArgs

export const organize: OrganizeFns = {
  groupContractsAcrossNetworks
}
