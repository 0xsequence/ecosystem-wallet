import { useLocalStore } from '../utils/local-store'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStore<string[]>('favorites')

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

  function items() {
    return favorites
  }

  return { remove, add, has, items }
}
