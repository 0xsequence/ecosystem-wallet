import { chain } from './filter-chain'
import { contract } from './filter-contract'
import { tokenId } from './filter-token-id'
import { type } from './filter-type'
import { TokenTypeProps } from '../../pages/InventoryRoutes/types'
import { uuid } from './filter-uuid'
import { group } from './filter-group'

type FilterArgs = {
  type:
    | 'ERC20'
    | 'ERC1155'
    | 'ERC721'
    | 'NATIVE'
    | 'COIN'
    | 'COLLECTIBLE'
    | ('ERC20' | 'ERC1155' | 'ERC721' | 'NATIVE' | 'COIN' | 'COLLECTIBLE')[]
  chain: string | number | (string | number)[]
  contract: string | string[]
}

type FilterFns = {
  [K in keyof FilterArgs]: (values?: TokenTypeProps[], args?: FilterArgs[K]) => TokenTypeProps[]
}

export const filter: FilterFns = {
  type,
  tokenId,
  chain,
  contract,
  group,
  uuid
}
