import { Link, useParams } from 'react-router'
import { DISCOVER_ITEMS, DiscoverItem } from '../../data/discover_items'
import { ArrowLeftIcon, ExternalLinkIcon, HeartIcon } from '../../design-system-patch/icons'
import { ROUTES } from '../../routes'
import { useInventory } from '../InventoryRoutes/helpers/useInventory'
import { InventoryProvider } from '../InventoryRoutes/helpers/InventoryProvider'
import { TokenType } from '../InventoryRoutes/components/TokenType'
import { TokenDetailModal } from '../InventoryRoutes/components/TokenDetailModal'
import { useFavorites } from '../../hooks/useFavorites'
import { inert } from '../../utils/inert'
import { useWatchlist } from '../../hooks/useWatchlist'

export function DiscoverShowRoute() {
  const { id } = useParams()

  const favorites = useFavorites()
  const watchlist = useWatchlist()
  const item = DISCOVER_ITEMS.find(item => item.id === id) as DiscoverItem

  if (!item) return null

  return (
    <InventoryProvider>
      <div className="flex flex-col w-full lg:max-w-screen-lg max-w-screen-md mx-auto gap-12 px-4 py-12">
        <Link
          to={ROUTES.DISCOVER}
          className="bg-button-glass backdrop-blur-2xl font-bold inline-flex gap-1 self-start items-center rounded-full px-4 py-2"
        >
          <ArrowLeftIcon /> Back
        </Link>

        <div className="w-full mx-auto flex flex-col lg:grid grid-cols-5 rounded-xl overflow-clip md:aspect-video">
          <div className="col-span-3">
            {item.img ? <img src={item.img} className="object-cover size-full" /> : null}
          </div>

          <div className="col-span-2 flex flex-col gap-12 bg-background-secondary backdrop-blur-2xl p-8 md:p-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <p>{item.description}</p>
            </div>

            <div className="flex gap-2">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-button-glass font-bold inline-flex gap-1 self-start items-center rounded-full px-4 py-2"
                  onClick={() => watchlist.add(item.id as string)}
                >
                  <ExternalLinkIcon />
                  Launch
                </a>
              ) : (
                <span className="bg-button-glass font-bold inline-flex gap-1 self-start items-center rounded-full px-4 py-2">
                  Coming Soon
                </span>
              )}

              <button
                type="button"
                className="grid grid-cols-1 grid-rows-1 [&>span]:col-start-1 [&>span]:row-start-1 overflow-hidden bg-button-glass self-start font-bold gap-1 items-center rounded-full px-4 py-2 cursor-pointer justify-items-center"
                onClick={() => (favorites.has(item.id) ? favorites.remove(item.id) : favorites.add(item.id))}
              >
                <span
                  className="inert:opacity-0 inert:-translate-y-2 transition-all flex gap-1 items-center"
                  {...inert(!favorites.has(item.id))}
                >
                  <HeartIcon /> Remove
                </span>
                <span
                  className="inert:opacity-0 inert:translate-y-2 transition-all flex gap-1 items-center"
                  {...inert(favorites.has(item.id))}
                >
                  <HeartIcon />
                  Favorite
                </span>
              </button>
            </div>
          </div>
        </div>
        {item.contracts ? <Collectables contracts={item.contracts} /> : null}
      </div>
    </InventoryProvider>
  )
}

function Collectables({ contracts }: { contracts: string[] }) {
  const { inventory } = useInventory()

  const items = inventory.filter(item => (item ? contracts.includes(item.contractAddress) : false))

  if (!items) return null

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Your collectables</h2>
      <div className="isolate grid grid-cols-2 sm:grid-cols-4 gap-2 ">
        {items.map((item, index) => (
          <TokenType key={index} item={item} />
        ))}
      </div>
      <TokenDetailModal />
    </div>
  )
}
