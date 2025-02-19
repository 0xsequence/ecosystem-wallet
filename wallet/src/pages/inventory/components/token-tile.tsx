import { cn } from '@0xsequence/design-system'
import { useInventory } from '../helpers/use-inventory'
import { ComponentProps } from 'react'

export function TokenTile(
  props: { children: React.ReactNode; contractAddress: string; tokenId?: string } & ComponentProps<'button'>
) {
  const { children, contractAddress, tokenId, className = '', ...rest } = props

  const { setShowInventoryItem } = useInventory()

  return (
    <button
      type="button"
      onClick={() => setShowInventoryItem({ contractAddress, tokenId })}
      className={cn(
        'aspect-square rounded-md overflow-clip bg-black/20 text-black cursor-pointer hover:scale-102 hover:-translate-y-0.5 transition-transform',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
