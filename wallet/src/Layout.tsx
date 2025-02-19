import { Image } from '@0xsequence/design-system'
import { Link, NavLink, Outlet } from 'react-router'

import { AccountMenu } from './components/AccountMenu'
// import { PoweredBySequence } from './components/PoweredBySequence'
import { PrivateRoute } from './components/PrivateRoute'
import { ExploreIcon, InventoryIcon, MarketplaceIcon } from './design-system-patch/icons'
import { ROUTES } from './routes'

const PROJECT_SMALL_LOGO = import.meta.env.VITE_PROJECT_SMALL_LOGO

const AppHeader = () => {
  return (
    <div className="bg-background-raised backdrop-blur-md w-full border-b border-black/20 text-black">
      <header className="flex flex-row gap-4 px-6  items-center justify-between min-h-[4.5rem] text-style-normal font-bold w-full max-w-screen-xl mx-auto">
        {PROJECT_SMALL_LOGO && (
          <Link to={ROUTES.HOME}>
            <Image src={PROJECT_SMALL_LOGO} className="max-w-[128px]" />
          </Link>
        )}
        <nav className="flex-row gap-10 h-full justify-center md:flex hidden mx-auto flex-shrink-0 absolute left-[50%] translate-x-[-50%] -mb-[2px]">
          <NavLink
            to={ROUTES.HOME}
            className="flex items-center gap-2 border-b-3 border-b-transparent aria-[current='page']:border-b-black self-stretch "
          >
            <InventoryIcon className="size-4.5" />
            Inventory
          </NavLink>
          <NavLink
            to={ROUTES.DISCOVER}
            className="flex items-center gap-2 border-b-3 border-b-transparent aria-[current='page']:border-b-black self-stretch "
          >
            <ExploreIcon className="size-4.5" />
            Discover
          </NavLink>
          <NavLink
            to={ROUTES.MARKET}
            className="flex items-center gap-2 border-b-3 border-b-transparent aria-[current='page']:border-b-black self-stretch "
          >
            <MarketplaceIcon className="size-4.5" />
            Market
          </NavLink>
        </nav>
        <AccountMenu />
      </header>
    </div>
  )
}

export const AppLayout = ({ showHeader = false }: { showHeader?: boolean }) => {
  const style = {
    '--background': `url(${import.meta.env.VITE_PROJECT_BACKGROUND})`
  } as React.CSSProperties

  return (
    <div
      className="flex flex-col flex-1 [background-image:var(--background)] bg-cover bg-no-repeat"
      style={style}
    >
      {showHeader && <AppHeader />}
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export const ProtectedLayout = () => {
  return (
    <PrivateRoute>
      <AppLayout showHeader />
    </PrivateRoute>
  )
}
