import { useLocalStore } from '../utils/local-store'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStore<string[]>('watchlist')

  function has(id: string) {
    try {
      const set = new Set(watchlist)

      if (id) {
        return set.has(id)
      }
    } catch {
      //
    }
  }

  function add(id: string) {
    try {
      const set = new Set(watchlist)

      if (id) {
        set.delete(id)
        set.add(id)
      }

      const next = [...set].reverse()

      setWatchlist(next)
    } catch {
      //
    }
  }

  function remove(id: string) {
    try {
      const set = new Set(watchlist)

      if (id) {
        set.delete(id)
      }

      const next = [...set].reverse()

      setWatchlist(next)
    } catch {
      //
    }
  }

  function items() {
    return watchlist
  }

  function isEmpty() {
    return watchlist ? watchlist.length < 1 : true
  }

  function clear() {
    setWatchlist([])
  }

  return { remove, add, has, items, isEmpty, clear }
}
