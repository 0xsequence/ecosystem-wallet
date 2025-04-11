import Fuse from 'fuse.js'
import { TokenTypeProps } from '../types'
import { FUSE_OPTIONS } from '../../../constants'
export type InventoryReturn = ReturnType<typeof inventory>

export interface InventoryView {
  sortBy: {
    favorites: (list: string[]) => InventoryView
    type: (order: string[]) => InventoryView
    testnet: (order?: 'asc' | 'desc') => InventoryView
    balance: (order?: 'asc' | 'desc' | 'lowToHigh' | 'highToLow') => InventoryView
    sort: () => InventoryView
  }
  filterBy: {
    chain: (chainId: number | string) => InventoryView
    contract: (contractAddress: string) => InventoryView
    tokenId: (tokenId: string | number) => InventoryView
    type: (type: 'erc20' | 'erc1155' | 'erc721' | 'native' | 'coins' | 'collectibles') => InventoryView
  }

  records: () => TokenTypeProps[] //| Record<string, TokenTypeProps[]>
}

export function inventory(data: TokenTypeProps[]) {
  let value = [...data]
  let comparators: ((a: TokenTypeProps, b: TokenTypeProps) => number)[] = []

  const chainSort =
    (...fns: typeof comparators) =>
    (a: TokenTypeProps, b: TokenTypeProps) => {
      for (const fn of fns) {
        const result = fn(a, b)
        if (result !== 0) return result
      }
      return 0
    }

  const sortBy = {
    favoritesA(list: string[] | null) {
      if (!list) return { ...then, ...sortBy }
      const set = new Set(list)

      const favourites: TokenTypeProps[] = []
      const nonFavorites: TokenTypeProps[] = []
      value.forEach(a => {
        if (set.has(a.uuid)) {
          console.log(a.uuid)
          favourites.push(a)
        } else {
          nonFavorites.push(a)
        }
      })
      console.log(favourites, nonFavorites)
      value = structuredClone([...favourites, ...nonFavorites])

      return { ...then, ...sortBy }
    },

    favorites(list: string[] | null) {
      if (!list) return { ...then, ...sortBy }

      const favorites = new Set(list)
      comparators.push((a, b) => {
        const aFav = favorites.has(a.uuid)
        const bFav = favorites.has(b.uuid)

        if (aFav && !bFav) return -1
        if (!aFav && bFav) return 1
        return 0
      })
      return { ...then, ...sortBy }
    },

    type(order: string[]) {
      const typeRank = new Map(order.map((type, i) => [type.toUpperCase(), i]))

      comparators.push((a, b) => {
        const aType = a?.type?.toString().toUpperCase() ?? ''
        const bType = b?.type?.toString().toUpperCase() ?? ''

        const rankA = typeRank.has(aType) ? typeRank.get(aType)! : Number.MAX_SAFE_INTEGER
        const rankB = typeRank.has(bType) ? typeRank.get(bType)! : Number.MAX_SAFE_INTEGER

        return rankA - rankB
      })

      return { ...then, ...sortBy }
    },

    testnet(order: 'asc' | 'desc' = 'asc') {
      comparators.push((a, b) => {
        const testnetA = a?.testnet ?? false
        const testnetB = b?.testnet ?? false

        if (testnetA === testnetB) return 0
        if (order === 'asc') {
          return testnetA ? 1 : -1 // put true (testnets) last
        } else {
          return testnetA ? -1 : 1 // put true (testnets) first
        }
      })

      return { ...then, ...sortBy }
    },

    balance(order: 'asc' | 'desc' | 'lowToHigh' | 'highToLow' = 'desc') {
      const normalized = order === 'lowToHigh' ? 'asc' : order === 'highToLow' ? 'desc' : order

      comparators.push((a, b) => {
        const aBal = BigInt(a.balance ?? '0')
        const bBal = BigInt(b.balance ?? '0')
        return normalized === 'desc' ? Number(bBal - aBal) : Number(aBal - bBal)
      })

      return { ...then, ...sortBy }
    },
    sort() {
      if (comparators.length > 0) {
        value = [...value].sort(chainSort(...comparators))
        comparators = [] // reset for future sorts
      }

      return { ...then }
    }
  }

  const filterBy = {
    chain(chainId?: number | string) {
      if (!chainId) {
        return { ...then, ...filterBy }
      }
      const parsed = typeof chainId === 'string' ? parseInt(chainId) : chainId
      value = value.filter(record => record.chainId === parsed)
      return { ...then, ...filterBy }
    },

    contract(contractAddress?: string) {
      if (!contractAddress) {
        return { ...then, ...filterBy }
      }

      const nextValue = value.filter(item => item?.contractAddress === contractAddress)

      value = structuredClone(nextValue)

      return { ...then, ...filterBy }
    },

    tokenId(tokenId?: string | number) {
      if (!tokenId) {
        return { ...then, ...filterBy }
      }
      const nextValue = value.filter(item => item?.tokenMetadata?.tokenID === tokenId)

      value = structuredClone(nextValue)

      return { ...then, ...filterBy }
    },

    type(type: 'erc20' | 'erc1155' | 'erc721' | 'native' | 'coins' | 'collectibles') {
      const match = type.toLowerCase()

      if (match === 'native') {
        value = value.filter(chain => !chain.contractType)
      } else if (match === 'coins') {
        value = value.filter(chain => chain.contractType?.toLowerCase() === 'erc20' || !chain.contractType)
      } else if (match === 'collectibles') {
        value = value.filter(
          chain =>
            chain.contractType?.toLowerCase() === 'erc1155' || chain.contractType?.toLowerCase() === 'erc721'
        )
      } else {
        value = value.filter(chain => chain.contractType?.toLowerCase() === match)
      }

      return { ...then, ...filterBy }
    }
  }

  function search(term: string) {
    if (!term || term.length < 1) {
      return then
    }

    const fuse = new Fuse(value, FUSE_OPTIONS)

    // Filter items based on search query
    const items = fuse.search(term).map(({ item }) => item)
    console.log(items)
    value = structuredClone(items)

    return then
  }

  function records() {
    return structuredClone(value)
  }

  const then = {
    filterBy,
    sortBy,
    search,
    records
  }

  return then
}
