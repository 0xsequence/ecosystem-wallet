export function favorites(list: string[] | null) {
  const favorites = new Set(list)

  return (a, b) => {
    const aFav = favorites.has(a.uuid)
    const bFav = favorites.has(b.uuid)

    if (aFav && !bFav) return -1
    if (!aFav && bFav) return 1
    return 0
  }
}
