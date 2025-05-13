import { Image, Text } from '@0xsequence/design-system'
import { ExternalLinkIcon, HeartIcon } from '../../design-system-patch/icons'

import { useSnapshot } from 'valtio'
import { SessionTypes } from '@walletconnect/types'

import { Link } from 'react-router'
import { ROUTES } from '../../routes'

import {
  DISCOVER_ITEMS,
  DISCOVER_CATEGORIES,
  DISCOVER_CHAINS,
  type ChainItem,
  type DiscoverItem
} from '../../data/discover_items'
import { useState } from 'react'
import { useFavorites } from '../../hooks/useFavorites'
import { useWatchlist } from '../../hooks/useWatchlist'
import { walletConnectStore } from '../../store/WalletConnectStore'
import { useHorizontalScrollStatus } from '../../hooks/useHorizontalScrollStatus'
import { THEME } from '../../utils/theme'
import { usePrefersReducedMotion } from '../../hooks/use-prefers-reduced-motion'
import { usePauseOnScroll } from '../../hooks/use-pause-on-scroll'

const ALL_DISCOVER_CATEGORIES = [
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

  ...DISCOVER_CATEGORIES
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

  const favorites = useFavorites()
  const favoriteItems =
    favorites
      .items()
      ?.map(item => DISCOVER_ITEMS.find(d => (d.id ? d.id === item : false)))
      .filter(Boolean) || []

  const scroll = useHorizontalScrollStatus<HTMLDivElement>()

  let items: (DiscoverItem | undefined)[] = []
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
      {' '}
      <div className="flex flex-col gap-4 w-full max-w-screen-lg px-8 mx-auto py-8">
        <Hero />

        <VisitHistory />
        <div
          className="flex gap-2 mb-4 overflow-scroll scrollbar-none data-[scroll-end]:scrollbar-end-overflow-mask data-[scroll-start]:scrollbar-start-overflow-mask data-[scroll-progress]:scrollbar-progress-overflow-mask"
          ref={scroll.ref}
          {...scroll.attributes}
        >
          {ALL_DISCOVER_CATEGORIES.map(item => (
            <button
              type="button"
              key={item.id}
              onClick={() => setCategory(item.label)}
              className="px-4 py-2 rounded-[6px] bg-button-glass text-[14px] font-medium aria-[current='true']:bg-primary aria-[current='true']:text-inverse cursor-pointer hover:opacity-80 focus:opacity-80 text-nowrap"
              aria-current={category === item.label}
            >
              {item.label}
            </button>
          ))}
        </div>

        {items.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {items?.map(item => (
              <DiscoverItem item={item} key={item?.title} />
            ))}
            {category === 'Favorites'
              ? validSessions.map(item => <WalletConnect item={item.peerMetadata} />)
              : null}
          </div>
        ) : (
          <div className="aspect-video rounded-lg w-full bg-background-raised flex items-center justify-center">
            <Text variant="normal" color="primary">
              Nothing found in {category}
            </Text>
          </div>
        )}
      </div>
    </>
  )
}

function ItemChains({ chains }: { chains?: string[] }) {
  const hasChains = Object.values(DISCOVER_CHAINS).length && chains?.length

  if (!hasChains) {
    return null
  }

  const chainItems = chains.map(chain => DISCOVER_CHAINS[chain]).filter(Boolean) as ChainItem[]

  return (
    <div className="flex gap-1">
      {chainItems.splice(0, 5).map(chain => (
        <div key={chain.name} className="size-4 flex-shrink-0">
          <Image
            src={chain.icon}
            className="size-full bg-button-glass rounded-full flex-shrink-0"
            alt={chain.name}
            width={16}
            height={16}
          />
        </div>
      ))}
      {chainItems.length > 5 ? (
        <Text variant="small" color="primary">
          +{chainItems.length}
        </Text>
      ) : null}
    </div>
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
      {item.img ? <Image src={item.img} className="object-cover size- aspect-square" /> : null}
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
        <div className=" px-4 mt-2">
          <ItemChains chains={item.chains} />
        </div>
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

function Hero() {
  const feature = THEME.discover_hero
  const watchlist = useWatchlist()
  const prefersReducedMotion = usePrefersReducedMotion()

  const videoRef = usePauseOnScroll()
  if (!feature) return null

  const item = DISCOVER_ITEMS.find(item => item.id === feature.id)
  if (!item) return null

  const { id, title, video, src, tagline, href } = { ...item, ...feature }

  return (
    <div className="aspect-video bg-white/10 items-center justify-center grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1 rounded-xl overflow-hidden inherit-hitarea hover:opacity-80">
      {video ? (
        <>
          <video src={video} muted={true} autoPlay={!prefersReducedMotion} loop={true} ref={videoRef} />
          <img src={src} className="mx-auto pointer-events-none max-w-[60%]" />
        </>
      ) : (
        <img src={src} className="size-full object-cover pointer-events-none" />
      )}
      <div className="flex items-end self-stretch text-white">
        <div className="flex bg-gradient-to-b from-black/30 shadow-[0_-1px_0_0_theme(colors.white/10%)] to-black/95 w-full  px-8 py-6  gap-4 justify-between">
          <div className="rounded-xl flex flex-col gap-1">
            <span className="font-bold text-xl">{title}</span>
            <span
              className="text-sm data-[mode='light']:text-inverse data-[mode='dark']:text-secondary"
              data-mode={THEME.mode}
            >
              {tagline}
            </span>
          </div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-button-glass text-sm font-bold inline-flex gap-1 items-center rounded-full self-center pl-3 pr-4 py-2"
              onClick={() => watchlist.add(id as string)}
            >
              <ExternalLinkIcon className="size-4" />
              Launch
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function VisitHistory() {
  const scroll = useHorizontalScrollStatus<HTMLDivElement>()

  const watchlist = useWatchlist()
  const watchlistItems = watchlist
    .items()
    ?.map(item => DISCOVER_ITEMS.find(d => (d.id ? d.id === item : false)))
    .filter(Boolean)

  return (
    <div
      className="inert:hidden inert:mb-0 mb-4 block border-b border-border-normal/20 pb-8"
      {...{ inert: watchlist.isEmpty() ? '' : undefined }}
    >
      <div className="flex flex-col mt-2 sm:py-0 gap-4">
        <div className="flex justify-start items-center gap-4">
          <h2 className="text-sm font-bold">History</h2>
          <button
            type="button"
            className="text-sm underline cursor-pointer opacity-60"
            onClick={() => watchlist.clear()}
          >
            Clear
          </button>
        </div>

        <div
          className="overflow-scroll scrollbar-none data-[scroll-end]:scrollbar-end-overflow-mask data-[scroll-start]:scrollbar-start-overflow-mask
          data-[scroll-progress]:scrollbar-progress-overflow-mask w-full flex flex-nowrap *:w-[256px] *:flex-shrink-0 gap-2"
          ref={scroll.ref}
          {...scroll.attributes}
        >
          {/* <div className="flex flex-nowrap grid-rows-1 gap-2 *:w-[256px] *:flex-shrink-0 w-full"> */}
          {watchlistItems?.map(item => (
            <HistoryItem item={item} key={item?.title} direct />
          ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

function HistoryItem({ item, direct = false }: { item?: (typeof DISCOVER_ITEMS)[0]; direct?: boolean }) {
  const watchlist = useWatchlist()
  if (!item) {
    return null
  }

  return (
    <div
      data-href="inherit"
      className="bg-background-secondary  text-primary rounded-lg grid grid-cols-4 font-bold text-sm overflow-clip hover:scale-102 focus-within:scale-102 focus-within:ring-2 focus-within:ring-blue-600 transition-transform"
    >
      {item.img ? <Image src={item.img} className="object-cover size-full aspect-square" /> : null}

      <div className="py-4 flex flex-col col-span-3 justify-center">
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
      </div>
    </div>
  )
}
