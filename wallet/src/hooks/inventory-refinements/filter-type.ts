import { TokenRecord } from '../../pages/InventoryRoutes/types'
import { TokenType } from './filters'

export function type(values?: TokenRecord[], args?: TokenType | TokenType[]): TokenRecord[] {
  if (!values || !args) return [] // <- fix here

  const types: (typeof args)[] = Array.isArray(args) ? [...args] : [args]

  return values.filter(item => types.includes(item?.contractType) || types.includes(item?.type))
}
