import { Image } from '@0xsequence/design-system'

export const DiscoverPage = () => {
  const discoverItems = [
    {
      title: 'Mining Quest',
      img: 'https://sequence.tor1.digitaloceanspaces.com/n64-pickaxe-mining-game-coverart.jpg',
      href: 'https://google.com'
    },
    {
      title: 'Game 2',
      href: 'https://google.com'
    },
    {
      title: 'App 1',
      href: 'https://google.com'
    },
    {
      title: 'Game 3',
      href: 'https://google.com'
    },
    {
      title: 'App 2',
      href: 'https://google.com'
    },
    {
      title: 'Game 4',
      href: 'https://google.com'
    },
    {
      title: 'Game 5',
      href: 'https://google.com'
    },
    {
      title: 'App 3',
      href: 'https://google.com'
    },
    {
      title: 'App 4',
      href: 'https://google.com'
    },
    {
      title: 'App 5',
      href: 'https://google.com'
    },
    {
      title: 'Game 6',
      href: 'https://google.com'
    }
  ]

  return (
    <div className="grid w-full max-w-screen-md grid-cols-1 sm:grid-cols-3 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      {discoverItems.map(item => (
        <a
          href={item.href}
          className="bg-black/20 aspect-video rounded-lg flex text-black items-end font-bold text-sm overflow-clip"
          target="_blank"
          key={item.title}
          rel="noreferrer noopener"
        >
          {item.img ? (
            <Image src={item.img} className="object-cover w-full h-full" />
          ) : (
            <div className="p-6">{item.title}</div>
          )}
        </a>
      ))}
    </div>
  )
}
