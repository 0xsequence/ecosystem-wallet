import { cn } from '@0xsequence/design-system'
import { ComponentProps } from 'react'
import { ChainId } from '@0xsequence/network'
import { Link, useLocation } from 'react-router'

export function TokenTile(
  props: {
    children: React.ReactNode
    chainId: ChainId
    contractAddress: string
    tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
    tokenId?: string
  } & ComponentProps<'a'>
) {
  const { children, chainId, contractAddress, tokenId, className = '', ...rest } = props

  const location = useLocation()
  const referer = location.pathname

  return (
    <Link
      to={`/inventory/${chainId}/${contractAddress}/${tokenId || '0'}`}
      state={{ modal: true, referer }}
      className={cn(
        'aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:scale-102 hover:-translate-y-0.5 transition-transform relative',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

export function TokenListItem(
  props: {
    children: React.ReactNode
    chainId: ChainId
    contractAddress: string
    tokenClass: 'erc20' | 'collectable' | 'nativeBalance'
    tokenId?: string
  } & ComponentProps<'a'>
) {
  const { children, chainId, contractAddress, tokenId, className = '', ...rest } = props
  const location = useLocation()
  const referer = location.pathname
  return (
    <Link
      to={`/inventory/${chainId}/${contractAddress}/${tokenId || '0'}`}
      state={{ modal: true, referer }}
      className={cn(
        'rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:scale-102 hover:-translate-y-0.5 transition-transform',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
