export const DiscoverPage = () => {
  const discoverItems = [
    {
      title: 'Game 1',
      href: 'https://google.com'
    }
  ]

  return (
    <div className="grid w-full max-w-screen-md grid-cols-1 sm:grid-cols-3 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      {discoverItems.map(item => (
        <a
          href={item.href}
          className="bg-black/20 aspect-video"
          target="_blank"
          key={item.title}
          rel="noreferrer noopener"
        >
          {item.title}
        </a>
      ))}
    </div>
  )
}
