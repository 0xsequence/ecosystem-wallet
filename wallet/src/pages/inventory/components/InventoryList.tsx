import { useInventory } from '../helpers/useInventory'
import { TokenType } from './TokenType'

export function InventoryList() {
  const { inventory } = useInventory()

  return inventory.map((item, index) => <TokenType key={index} item={item} />)
}
