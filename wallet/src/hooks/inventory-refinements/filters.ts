import { chain } from './filter-chain'
import { contract } from './filter-contract'
import { tokenId } from './filter-token-id'
import { type } from './filter-type'
import { TokenRecords } from '../../pages/InventoryRoutes/types'
import { uuid } from './filter-uuid'
import { group } from './filter-group'
export type TokenType = 'ERC20' | 'ERC1155' | 'ERC721' | 'NATIVE' | 'COIN' | 'COLLECTIBLE' | 'GROUP'

export type FilterArgs = {
  type: TokenType
  chain: string | number | (string | number)[]
  contract: string | string[]
  tokenId: string | string[]
  group: string | string[]
  uuid: string | string[]
}
export type FilterKeys = keyof FilterArgs
export type FilterFns = {
  [K in keyof FilterArgs]: (values?: TokenRecords, args?: FilterArgs[K]) => TokenRecords
}

export const filter: FilterFns = {
  type,
  tokenId,
  chain,
  contract,
  group,
  uuid
}
