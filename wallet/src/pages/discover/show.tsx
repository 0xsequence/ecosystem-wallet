import { Link, useParams } from 'react-router'
import { DISCOVER_ITEMS } from '../../data/discover_items'
import { ArrowLeftIcon, ExternalLinkIcon } from '../../design-system-patch/icons'
import { ROUTES } from '../../routes'

export function DiscoverShowRoute() {
  const { id } = useParams()

  const item = DISCOVER_ITEMS.find(item => item.id === id)

  if (!item) return null

  return (
    <div className="flex flex-col w-full lg:max-w-screen-lg max-w-screen-md mx-auto md:my-12 gap-12">
      <Link
        to={ROUTES.DISCOVER}
        className="bg-button-glass font-bold inline-flex gap-1 self-start items-center rounded-full px-4 py-2"
      >
        <ArrowLeftIcon /> Back
      </Link>

      <div className="w-full mx-auto flex flex-col lg:grid grid-cols-5 md:rounded-xl overflow-clip">
        <div className="col-span-3">
          {item.img ? <img src={item.img} className="object-cover size-full" /> : null}
        </div>
        <div className="col-span-2 flex flex-col gap-12 bg-background-secondary p-8 md:p-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <p>{item.description}</p>
          </div>
          <div className="flex flex-col mt-auto mb-0">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-button-glass font-bold inline-flex gap-1 self-start items-center rounded-full px-4 py-2"
              >
                <ExternalLinkIcon />
                Launch
              </a>
            ) : (
              <span className="bg-button-glass font-bold inline-flex gap-1 self-start items-center rounded-full px-4 py-2">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
