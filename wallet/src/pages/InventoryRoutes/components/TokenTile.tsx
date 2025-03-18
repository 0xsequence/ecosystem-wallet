import { cn } from '@0xsequence/design-system'
import { useInventory } from '../helpers/useInventory'
import { ComponentProps } from 'react'
import { ChainId } from '@0xsequence/network'
import { Link } from 'react-router'

export function TokenTile(
  props: {
    children: React.ReactNode
    chainId: ChainId
    contractAddress: string
    tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
    tokenId?: string
  } & ComponentProps<'a'>
) {
  const { children, chainId, contractAddress, tokenClass, tokenId, className = '', ...rest } = props

  const { setShowInventoryItem } = useInventory()

  return (
    <Link
      to={`/inventory/${chainId}/${contractAddress}/${tokenId}`}
      // onClick={() => setShowInventoryItem({ chainId, contractAddress, tokenClass, tokenId })}
      className={cn(
        'aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:scale-102 hover:-translate-y-0.5 transition-transform',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )

  return (
    <button
      type="button"
      onClick={() => setShowInventoryItem({ chainId, contractAddress, tokenClass, tokenId })}
      className={cn(
        'aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:scale-102 hover:-translate-y-0.5 transition-transform',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function TokenListItem(
  props: {
    children: React.ReactNode
    chainId: ChainId
    contractAddress: string
    tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
    tokenId?: string
  } & ComponentProps<'button'>
) {
  const { children, chainId, contractAddress, tokenClass, tokenId, className = '', ...rest } = props

  const { setShowInventoryItem } = useInventory()

  return (
    <button
      type="button"
      onClick={() => setShowInventoryItem({ chainId, contractAddress, tokenClass, tokenId })}
      className={cn(
        'rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:scale-102 hover:-translate-y-0.5 transition-transform',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
