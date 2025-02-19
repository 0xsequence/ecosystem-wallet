import { useInventory } from '../helpers/use-inventory'
import { TokenType } from './token-type'

export function InventoryList() {
  const { inventory } = useInventory()

  return inventory.map((item, index) => <TokenType key={index} item={item} />)
}
