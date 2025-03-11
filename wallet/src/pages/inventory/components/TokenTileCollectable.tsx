import { TokenBalance } from '@0xsequence/indexer'
import { TokenListItem, TokenTile } from './TokenTile'
import { Image as SeqImage } from '@0xsequence/design-system'
import { useState, useEffect } from 'react'

const getImageSize = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url

    img.onload = () => resolve(url) // Resolve with the working URL
    img.onerror = () => reject()
  })
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcList: (string | undefined)[] // Array of image sources to try
  fallback?: string // Final fallback image
  alt?: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ srcList, fallback, alt = '' }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(fallback)

  useEffect(() => {
    let isMounted = true // Avoid state updates on unmounted components

    const findValidImage = async () => {
      for (const src of srcList) {
        try {
          if (src) {
            const validSrc = await getImageSize(src)
            if (isMounted) {
              setImageSrc(validSrc)
              return // Stop after finding the first valid image
            }
          }
        } catch {
          // console.warn(error)
        }
      }

      // If no images load, fallback to the final placeholder
      if (isMounted && fallback) setImageSrc(fallback)
    }

    findValidImage()

    return () => {
      isMounted = false // Cleanup function
    }
  }, [srcList, fallback])

  return <SeqImage src={imageSrc} alt={alt} className="object-contain size-full" />
}

export default ImageWithFallback

export function TokenTileCollectable(props: TokenBalance) {
  const { chainId, contractInfo, tokenMetadata, contractAddress, tokenID } = props

  return (
    <TokenTile chainId={chainId} contractAddress={contractAddress} tokenClass="collectable" tokenId={tokenID}>
      <ImageWithFallback srcList={[tokenMetadata?.image, contractInfo?.logoURI]} width={100} />
    </TokenTile>
  )
}

export function TokenListItemCollectable(props: TokenBalance) {
  const { chainId, contractInfo, tokenMetadata, contractAddress, tokenID } = props

  return (
    <TokenListItem
      chainId={chainId}
      contractAddress={contractAddress}
      tokenClass="collectable"
      tokenId={tokenID}
      className="flex gap-2"
    >
      <div className="size-16 m-2 rounded-sm overflow-clip">
        <ImageWithFallback srcList={[tokenMetadata?.image, contractInfo?.logoURI]} />
      </div>
      <div className="flex flex-col items-start gap-0.25 my-auto">
        {tokenMetadata?.name ? <span className="font-semibold">{tokenMetadata.name}</span> : null}
        {contractInfo?.name ? <span className="text-sm opacity-80">{contractInfo.name}</span> : null}
      </div>
    </TokenListItem>
  )
}
