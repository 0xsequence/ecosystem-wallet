import { CoinGroup, TokenRecord } from '../../pages/InventoryRoutes/types'
import { networksMap } from '../../utils/currencyGroups/networks'
import { formatPrettyBalance } from '../../utils/format-pretty-balance'

export interface GroupContractsOptions {
  minGroupSize?: number
}

/**
 * Groups tokens across networks by shared contract group, with optional control over group size.
 *
 * @param values - The tokens to organize.
 * @param options - Optional settings including minimum group size to retain.
 * @returns Grouped + ungrouped tokens, preserving display order.
 */
export function groupContractsAcrossNetworks(
  values?: TokenRecord[],
  options: GroupContractsOptions = {}
): TokenRecord[] {
  if (!values) return []

  const { minGroupSize = 2 } = options

  const groups = Object.values(
    values.reduce((acc, coin) => {
      const chainId = coin.chainId
      const contractAddress = coin.contractAddress.toLowerCase()
      const network = chainId ? networksMap[chainId] : null

      if (network?.currencies) {
        const record = network.currencies.find(
          currency => currency.contractAddress.toLowerCase() === contractAddress
        )

        let balance = '0'
        if (coin.balance && typeof coin.balance === 'string') {
          balance = coin.balance
        }

        if (record && record.group) {
          coin.group = record.group

          if (!acc[record.group]) {
            acc[record.group] = {
              ...record,
              chainId: 0,
              balance: '0',
              chains: [],
              type: 'GROUP',
              testnet: record.group.includes('testnet'),
              group: record.group,
              uuid: `coins::${record.group}::0`,
              path: `/coins/${record.group}`,
              logoURI: coin.logoURI
            }
          }

          acc[record.group].balance = (BigInt(acc[record.group].balance || 0) + BigInt(balance)).toString()
          acc[record.group].prettyBalance = formatPrettyBalance(
            acc[record.group].balance || '0',
            record.decimals
          )
          acc[record.group].chains.push(coin)
        }
      }

      return acc
    }, {} as Record<string, CoinGroup>)
  )

  const multiChainGroups = groups.filter(group => group.chains.length >= minGroupSize)
  const groupedUuids = multiChainGroups.flatMap(group => group.chains.map(chain => chain.uuid))
  const ungroupedTokens = values.filter(token => !groupedUuids.includes(token.uuid))

  return [...multiChainGroups, ...ungroupedTokens]
}
