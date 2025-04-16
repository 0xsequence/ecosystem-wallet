import { NetworkImage, TokenImage, nativeTokenImageUrl } from '@0xsequence/design-system'

type CoinIconProps = {
  contractType: string
  logoURI?: string
  chainId?: number
  size: 'sm' | 'md' | 'lg'
}

export function CoinIcon(props: CoinIconProps) {
  const { contractType, logoURI, chainId, size = 'lg' } = props

  if (!chainId) {
    return (
      <div
        className="data-[size='md']:size-10 data-[size='lg']:w-[50%] data-[size='lg']:max-w-20"
        data-size={size}
      >
        <TokenImage src={logoURI} size="xl" className="size-full bg-button-glass rounded-full" />
      </div>
    )
  }

  switch (contractType) {
    case 'NATIVE':
      return (
        <div
          className="data-[size='md']:size-10 data-[size='lg']:w-[50%] data-[size='lg']:max-w-20"
          data-size={size}
        >
          <TokenImage
            src={nativeTokenImageUrl(chainId, 'lg')}
            size="xl"
            className="size-full bg-button-glass rounded-full"
          />
        </div>
      )

    case 'GROUP':
      return (
        <div
          className="data-[size='md']:size-10 data-[size='lg']:w-[50%] data-[size='lg']:max-w-20"
          data-size={size}
        >
          <NetworkImage chainId={chainId} size="xl" className="size-full bg-button-glass rounded-full" />
        </div>
      )
    default:
      return (
        <div
          className="data-[size='md']:size-10 data-[size='lg']:w-[50%] data-[size='lg']:max-w-20"
          data-size={size}
        >
          <TokenImage src={logoURI} size="xl" className="size-full bg-button-glass rounded-full" />
        </div>
      )
  }
}
