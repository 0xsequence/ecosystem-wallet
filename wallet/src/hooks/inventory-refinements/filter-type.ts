import { ContractType } from '@0xsequence/indexer'
import { TokenRecords } from '../../pages/InventoryRoutes/types'
import { TokenType } from './filters'

export function type(
  values?: TokenRecords,
  args?: ContractType | TokenType | (ContractType | TokenType)[]
): TokenRecords {
  if (!values || !args) return [] // <- fix here

  const types: (typeof args)[] = Array.isArray(args) ? [...args] : [args]

  return values.filter(item => types.includes(item?.contractType) || types.includes(item?.type))
}
