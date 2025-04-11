import { TokenListItem, TokenTile } from './TokenTile'
import { Image as SeqImage } from '@0xsequence/design-system'
import { useState, useEffect } from 'react'
import { useFavoriteTokens } from '../../../hooks/useFavoriteTokens'
import SvgHeartIcon from '../../../design-system-patch/icons/HeartIcon'
import { TokenTypeProps } from '../types'

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

export function InventoryCollectibleTile(props: TokenTypeProps) {
  const { path, uuid, contractInfo, tokenMetadata } = props

  const { has } = useFavoriteTokens()

  return (
    <TokenTile path={path}>
      {has(uuid) ? (
        <div className="flex items-center justify-center bottom-4 right-4 absolute bg-button-glass p-2 rounded-full backdrop-blur-2xl">
          <SvgHeartIcon />
        </div>
      ) : null}
      <ImageWithFallback srcList={[tokenMetadata?.image, contractInfo?.logoURI]} width={100} />
    </TokenTile>
  )
}

export function InventoryCollectibleList(props: TokenTypeProps) {
  const { path, contractInfo, tokenMetadata } = props

  return (
    <TokenListItem path={path} className="flex gap-2">
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
