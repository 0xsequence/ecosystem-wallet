import { TokenBalance } from '@0xsequence/indexer'
import { TokenTile } from './TokenTile'
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
  srcList: string[] // Array of image sources to try
  fallback: string // Final fallback image
  alt?: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ srcList, fallback, alt = '' }) => {
  const [imageSrc, setImageSrc] = useState<string>(fallback)

  useEffect(() => {
    let isMounted = true // Avoid state updates on unmounted components

    const findValidImage = async () => {
      for (const src of srcList) {
        try {
          const validSrc = await getImageSize(src)
          if (isMounted) {
            setImageSrc(validSrc)
            return // Stop after finding the first valid image
          }
        } catch {
          // console.warn(error)
        }
      }

      // If no images load, fallback to the final placeholder
      if (isMounted) setImageSrc(fallback)
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
      <ImageWithFallback
        srcList={[tokenMetadata?.image, contractInfo?.logoURI]}

        // alt="Example Image"
        // width={150}
        // height={150}
      />

      {/* <SeqImage src={tokenMetadata?.image || contractInfo?.logoURI} className="object-contain size-full" /> */}
    </TokenTile>
  )
}
