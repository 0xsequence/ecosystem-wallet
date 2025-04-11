import { useLocalStore } from '../utils/local-store'

export function useFavoriteTokens() {
  const [favorites, setFavorites] = useLocalStore<string[]>('favoriteTokens')

  function has(id: string) {
    try {
      const set = new Set(favorites)

      if (id) {
        return set.has(id)
      }
    } catch {
      //
    }
  }

  function add(id: string) {
    try {
      const set = new Set(favorites)

      if (id) {
        set.delete(id)
        set.add(id)
      }

      const next = [...set].reverse()

      setFavorites(next)
    } catch {
      //
    }
  }

  function remove(id: string) {
    try {
      const set = new Set(favorites)

      if (id) {
        set.delete(id)
      }

      const next = [...set].reverse()

      setFavorites(next)
    } catch {
      //
    }
  }

  function toggle(id: string) {
    if (has(id)) {
      remove(id)
    } else {
      add(id)
    }
  }
  function items() {
    return favorites
  }

  return { remove, add, toggle, has, items, favorites }
}
