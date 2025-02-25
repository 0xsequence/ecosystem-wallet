import { Image } from '@0xsequence/design-system'
import { Link } from 'react-router'
import { ROUTES } from '../../routes'

import { DISCOVER_ITEMS } from '../../data/discover_items'

function discoverRouteById(id: string) {
  return ROUTES.DISCOVER + '/' + id
}

export const DiscoverPage = () => {
  return (
    <div className="grid w-full max-w-screen-lg grid-cols-1 sm:grid-cols-3 gap-8 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0 mb-16">
      {DISCOVER_ITEMS.map(item => (
        <div
          data-href="inherit"
          className="bg-black text-white  rounded-lg flex flex-col font-bold text-sm overflow-clip hover:scale-102 focus-within:scale-102 focus-within:ring-2 focus-within:ring-blue-600 transition-transform self-stretch"
          key={item.title}
        >
          {item.img ? <Image src={item.img} className="object-cover w-full h-full" /> : null}

          <div className="py-4 flex flex-col">
            {item.id ? (
              <Link to={discoverRouteById(item.id)} className="px-4 outline-none">
                {item.title}
              </Link>
            ) : (
              <span className="px-4">{item.title}</span>
            )}

            {item?.categories ? (
              <div className="px-4">
                {item.categories.map(category => (
                  <span key={category} className="text-style-sm">
                    {category}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
