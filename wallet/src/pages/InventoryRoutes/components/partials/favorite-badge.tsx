import { useFavoriteTokens } from '../../../../hooks/useFavoriteTokens'
import SvgHeartIcon from '../../../../design-system-patch/icons/HeartIcon'

type FavoriteBadgeProps = { id: string }

export function FavoriteBadge(props: FavoriteBadgeProps) {
  const { has } = useFavoriteTokens()
  const { id } = props

  const isFavorite = has(id)

  if (!isFavorite) return null

  return (
    <div className="flex flex-shrink-0 self-end items-center justify-center bg-background-contrast p-2 rounded-full backdrop-blur-2xl">
      <SvgHeartIcon />
    </div>
  )
}
