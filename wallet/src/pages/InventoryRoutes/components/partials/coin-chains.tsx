import { NetworkImage, Text } from '@0xsequence/design-system'

type ChainInfo = {
  name?: string
  title?: string
  chainId: number
}

type CoinChainsProps = {
  chains: ChainInfo | ChainInfo[]
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function CoinChains(props: CoinChainsProps) {
  const { chains, size = 'sm' } = props

  // Convert all chains props to an array
  const chainsList = Array.isArray(chains) ? chains : [chains]

  const textSizeTranslation = {
    xs: 'xsmall',
    sm: 'small',
    md: 'normal',
    lg: 'large'
  }

  // If there is only 1 chain, show it's network image and name
  if (chainsList.length < 2) {
    return (
      <div className="flex items-center gap-0.75 data-[size='xs']:gap-0" data-size={size}>
        <NetworkImage chainId={chainsList[0].chainId} size={size} />
        <Text
          variant={textSizeTranslation[size]}
          fontWeight="semibold"
          color="secondary"
          className="ml-1 leading-[1.05]"
        >
          {chainsList[0].title}
        </Text>
      </div>
    )
  }

  // If there are multiple chains, only show their network image.
  return (
    <div className="flex items-center gap-0.75 data-[size='xs']:gap-0" data-size={size}>
      {chainsList.map(chain => (
        <NetworkImage chainId={chain.chainId} size={size} />
      ))}
    </div>
  )
}
