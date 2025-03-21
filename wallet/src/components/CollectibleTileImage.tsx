import { Card, Image } from '@0xsequence/design-system'

interface CollectibleTileImageProps {
  imageUrl?: string
}

export const CollectibleTileImage = ({ imageUrl }: CollectibleTileImageProps) => {
  return (
    <Card className="flex p-0 aspect-square justify-center items-center overflow-hidden rounded-sm bg-background-secondary">
      <Image src={imageUrl} className="size-full object-cover" />
    </Card>
  )
}
