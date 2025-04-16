import { groupContractsAcrossNetworks } from './organize-group-contracts-across-networks'
import { TokenRecord } from '../../pages/InventoryRoutes/types'

/**
 * Arguments accepted by each organizer function.
 */
export type OrganizeArgs = {
  groupContractsAcrossNetworks: {
    minGroupSize?: number
  }
}

/**
 * Organizer function definitions. Each function returns a new organized TokenRecord[] list.
 */
export type OrganizeFns = {
  [K in keyof OrganizeArgs]: (values?: TokenRecord[], args?: OrganizeArgs[K]) => TokenRecord[]
}

export type OrganizeKeys = keyof OrganizeArgs

export const organize: OrganizeFns = {
  groupContractsAcrossNetworks
}
