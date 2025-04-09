import { TokenImage, nativeTokenImageUrl } from '@0xsequence/design-system'

type CoinIconProps = {
  contractType: string
  logoURI?: string
  chainId: number
  size: 'sm' | 'lg'
}

export function CoinIcon(props: CoinIconProps) {
  const { contractType, logoURI, chainId, size = 'lg' } = props

  switch (contractType) {
    case 'ERC20':
      return (
        <div
          className="data-[size='sm']:size-8 data-[size='lg']:w-[50%] data-[size='lg']:max-w-20"
          data-size={size}
        >
          <TokenImage src={logoURI} size="xl" className="size-full bg-button-glass rounded-full" />
        </div>
      )
    default:
      return (
        <div
          className="data-[size='sm']:size-8 data-[size='lg']:w-[50%] data-[size='lg']:max-w-20"
          data-size={size}
        >
          <TokenImage
            src={nativeTokenImageUrl(chainId, 'lg')}
            size="xl"
            className="size-full bg-button-glass rounded-full"
          />
        </div>
      )
  }
}
