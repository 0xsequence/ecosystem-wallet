import { NetworkImage, Text } from '@0xsequence/design-system'
import { TokenRecord } from '../../types'

type CoinChainsProps = {
  chains: TokenRecord | TokenRecord[]
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export function CoinChains(props: CoinChainsProps) {
  const { chains, size = 'sm', showIcon = true } = props

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
      <div className="flex items-center gap-0.75 data-[size='xs']:gap-1" data-size={size}>
        {showIcon ? <NetworkImage chainId={chainsList[0].chainId} size={size} /> : null}
        <Text
          variant={textSizeTranslation[size]}
          fontWeight="semibold"
          color="secondary"
          className=" leading-[1.05]"
        >
          {chainsList[0].chainInfo?.title}
        </Text>
      </div>
    )
  }

  // If there are multiple chains, only show their network image.
  return (
    <div className="flex items-center gap-0.75 data-[size='xs']:gap-0.5" data-size={size}>
      {chainsList.map(chain => (
        <NetworkImage chainId={chain.chainId} size={size} />
      ))}
    </div>
  )
}
