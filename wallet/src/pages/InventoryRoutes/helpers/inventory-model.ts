import { TokenBalance } from '@0xsequence/indexer'
import { TOKEN_TYPES } from '../../../utils/normalize-balances'

export function inventory(data: TokenBalance[]) {
  let value = data || []

  console.log(value)

  const sortBy = {
    balance(order: 'asc' | 'desc' | 'lowToHigh' | 'highToLow' = 'desc') {
      order = order === 'highToLow' ? 'desc' : order === 'lowToHigh' ? 'asc' : order

      const next = value.sort((a, b) => {
        const aBal = BigInt(a.balance ?? '0')
        const bBal = BigInt(b.balance ?? '0')

        return order === 'desc' ? Number(bBal - aBal) : Number(aBal - bBal)
      })

      value = structuredClone(next)
      return { ...then, ...sortBy }
    },

    type(order: ('favorites' | 'groups' | 'coins' | 'collectibles')[]) {
      return { ...then, ...sortBy }
    }
  }

  const groupBy = {
    contracts() {
      const nextValue = value.reduce((acc, item) => {
        if (!item) {
          return acc
        }

        if (item.type === TOKEN_TYPES.COLLECTIBLE) {
          if (!acc[item.contractAddress]) {
            acc[item.contractAddress] = []
          }
          acc[item.contractAddress].push(item)
        }
        return acc
      }, {} as Record<string, TokenTypeProps[]>)

      value = structuredClone(nextValue)
      return { ...then, ...groupBy }
    }
  }

  const filterBy = {
    chain(chainId: number | string) {
      if (typeof chainId === 'string') {
        chainId = parseInt(chainId)
      }

      value = structuredClone(value.filter(record => record.chainId === chainId))
      return { ...then, ...filterBy }
    },

    type(type: 'erc20' | 'erc1155' | 'erc721' | 'native' | 'coins' | 'collectibles') {
      const match = type.toLowerCase()

      if (match === 'native') {
        const nextValue = value.filter(chain => !chain.contractType)
        value = structuredClone(nextValue)
        return { ...then, ...filterBy }
      }

      if (match === 'coins') {
        const nextValue = value?.filter(
          chain => chain.contractType?.toLowerCase() === 'erc20' || !chain.contractType
        )

        value = structuredClone(nextValue)
        return { ...then, ...filterBy }
      }

      if (match === 'collectibles') {
        const nextValue = value.filter(
          chain =>
            chain.contractType?.toLowerCase() === 'erc1155' || chain.contractType?.toLowerCase() === 'erc721'
        )

        value = structuredClone(nextValue)
        return { ...then, ...filterBy }
      }

      const nextValue = value.filter(chain => chain.contractType?.toLowerCase() === type)
      value = structuredClone(nextValue)
      return { ...then, ...filterBy }
    }
  }

  function records() {
    return value
  }

  const then = {
    groupBy,
    filterBy,
    sortBy,
    records
  }

  return then
}
