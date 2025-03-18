import { Image } from '@0xsequence/design-system'
import { ExternalLinkIcon, HeartIcon } from '../../design-system-patch/icons'

import { useSnapshot } from 'valtio'
import { SessionTypes } from '@walletconnect/types'

import { Link } from 'react-router'
import { ROUTES } from '../../routes'

import { DISCOVER_ITEMS } from '../../data/discover_items'
import { inert } from '../../utils/inert'
import { useState } from 'react'
import { useFavorites } from '../../hooks/useFavorites'
import { useWatchlist } from '../../hooks/useWatchlist'
import { walletConnectStore } from '../../store/WalletConnectStore'

const DISCOVER_CATEGORIES = [
  {
    id: 'all',
    label: 'All',
    name: 'all'
  },
  {
    id: 'favorites',
    label: 'Favorites',
    name: 'favorites',
    icon: <HeartIcon size="xs" />
  },

  {
    id: 'defi',
    label: 'DeFi',
    name: 'defi'
  },
  {
    id: 'games',
    label: 'Games',
    name: 'games'
  }
]

interface SessionViewProps {
  topic: string
  peerMetadata: {
    name: string
    description?: string
    url: string
    icon?: string
  }
  expiry: number
}
const mapSessionToView = (session: {
  topic: string
  peer: {
    metadata: {
      name: string
      description: string
      url: string
      icons: readonly string[]
    }
  }
  expiry: number
}): SessionViewProps => ({
  topic: session.topic,
  peerMetadata: {
    name: session.peer.metadata.name,
    description: session.peer.metadata.description,
    url: session.peer.metadata.url,
    icon: session.peer.metadata.icons?.[0]
  },
  expiry: session.expiry
})

function discoverRouteById(id: string) {
  return ROUTES.DISCOVER + '/' + id
}

export const DiscoverPage = () => {
  const [category, setCategory] = useState('All')

  const { sessions } = useSnapshot(walletConnectStore.state)

  const validSessions = sessions
    .filter(s => s.expiry * 1000 > Date.now())
    .map(s => mapSessionToView(s as SessionTypes.Struct))

  const watchlist = useWatchlist()
  const watchlistItems = watchlist
    .items()
    ?.map(item => DISCOVER_ITEMS.find(d => (d.id ? d.id === item : false)))
    .filter(Boolean)

  const favorites = useFavorites()
  const favoriteItems = favorites
    .items()
    ?.map(item => DISCOVER_ITEMS.find(d => (d.id ? d.id === item : false)))
    .filter(Boolean)

  let items
  switch (category) {
    case 'All':
      items = DISCOVER_ITEMS
      break
    case 'Favorites':
      items = favoriteItems
      break
    default:
      items = DISCOVER_ITEMS.filter(item => item?.categories?.includes(category))
  }

  return (
    <>
      <div
        className="grid grid-rows-[0fr] data-[show='true']:grid-rows-[1fr] transition-all overflow-clip border-b border-white/10"
        data-show={!watchlist.isEmpty()}
      >
        <div
          className="flex min-h-0 data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:translate-y-2"
          {...inert(watchlist.isEmpty())}
        >
          <div className="flex flex-col w-full max-w-screen-lg mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0 mb-16 gap-4">
            <div className="flex justify-start items-center gap-4">
              <h2 className="text-xl font-bold">History</h2>
              <button
                type="button"
                className="text-sm underline cursor-pointer opacity-60"
                onClick={() => watchlist.clear()}
              >
                Clear
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 ">
              {watchlistItems?.map(item => (
                <DiscoverItem item={item} key={item?.title} direct />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-screen-lg mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0 mb-16">
        <div className="aspect-video rounded-xl bg-white/10 flex items-center justify-center">
          Feature dApp
        </div>

        <div className="flex gap-2 py-6">
          {DISCOVER_CATEGORIES.map(item => (
            <button
              type="button"
              key={item.id}
              onClick={() => setCategory(item.label)}
              className="px-4 py-2 rounded-[6px] bg-button-glass text-[14px] font-medium aria-[current='true']:bg-primary aria-[current='true']:text-inverse cursor-pointer hover:opacity-80 focus:opacity-80"
              aria-current={category === item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {items?.map(item => (
            <DiscoverItem item={item} key={item?.title} />
          ))}
          {category === 'Favorites'
            ? validSessions.map(item => <WalletConnect item={item.peerMetadata} />)
            : null}
        </div>
      </div>
    </>
  )
}

function DiscoverItem({ item, direct = false }: { item?: (typeof DISCOVER_ITEMS)[0]; direct?: boolean }) {
  const watchlist = useWatchlist()
  const favorites = useFavorites()
  if (!item) {
    return null
  }

  return (
    <div
      data-href="inherit"
      className="bg-background-secondary backdrop-blur-2xl text-primary rounded-lg flex flex-col font-bold text-sm overflow-clip hover:scale-102 focus-within:scale-102 focus-within:ring-2 focus-within:ring-blue-600 transition-transform self-stretch"
    >
      {item.img ? <Image src={item.img} className="object-cover size-full aspect-square" /> : null}

      <div className="py-4 flex flex-col">
        {direct && item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-1 justify-between items-center px-4"
            onClick={direct ? () => watchlist.add(item.id as string) : undefined}
          >
            {item.title}
            <ExternalLinkIcon className="size-4" />
          </a>
        ) : item.id ? (
          <Link to={discoverRouteById(item.id)} className="px-4 outline-none">
            {item.title}
          </Link>
        ) : (
          <span className="px-4">{item.title}</span>
        )}

        <span className="flex items-center mt-2 justify-between px-4 ">
          {item?.categories ? (
            <div className="flex gap-1">
              {item.categories.map(category => (
                <span key={category} className="text-style-sm bg-button-glass px-1 py-0.25 rounded-xs">
                  {category}
                </span>
              ))}
            </div>
          ) : null}

          {favorites.has(item.id) ? <HeartIcon className="size-4" /> : null}
        </span>
      </div>
    </div>
  )
}

function WalletConnect({ item }: { item?: SessionViewProps['peerMetadata'] }) {
  if (!item) {
    return null
  }

  return (
    <div
      data-href="inherit"
      className="bg-background-secondary backdrop-blur-2xl text-primary rounded-lg flex flex-col font-bold text-sm overflow-clip hover:scale-102 focus-within:scale-102 focus-within:ring-2 focus-within:ring-blue-600 transition-transform self-stretch"
    >
      <div className="size-full aspect-square flex p-4 items-center justify-center bg-white/5">
        {item.icon ? <Image src={item.icon} className="size-24" /> : null}
      </div>

      <div className="py-4 flex flex-col">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-1 justify-between items-center px-4"
          >
            {item.name}
          </a>
        ) : (
          <span className="px-4">{item.name}</span>
        )}
      </div>
    </div>
  )
}
