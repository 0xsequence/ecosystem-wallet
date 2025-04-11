import { cn } from '@0xsequence/design-system'
import { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router'

export function TokenTile(
  props: {
    children: React.ReactNode
    path: string
  } & ComponentProps<'a'>
) {
  const { children, path, className = '', ...rest } = props

  const location = useLocation()
  const referer = location.pathname

  return (
    <Link
      to={`/inventory${path}`}
      state={{ modal: true, referer }}
      className={cn(
        'aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:opacity-80 focus:opacity-80 transition-opacity relative',
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
    path: string
  } & ComponentProps<'a'>
) {
  const { children, path, className = '', ...rest } = props
  const location = useLocation()
  const referer = location.pathname
  return (
    <Link
      to={`/inventory${path}`}
      state={{ modal: true, referer }}
      className={cn(
        'rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:opacity-80 focus:opacity-80 transition-opacity',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
