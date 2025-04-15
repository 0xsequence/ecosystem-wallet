import { TokenTypeProps } from '../../pages/InventoryRoutes/types'
import { networksMap } from '../../utils/currencyGroups/networks'
import { formatPrettyBalance } from '../../utils/format-pretty-balance'
import { TOKEN_TYPES } from '../../utils/normalize-balances'

interface GroupContractsOptions {
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
  values?: TokenTypeProps[],
  options: GroupContractsOptions = {}
): TokenTypeProps[] {
  if (!values) return []

  const { minGroupSize = 2 } = options

  const groups = Object.values(
    values.reduce((acc, coin) => {
      const chainId = coin.chainId
      const contractAddress = coin.contractAddress.toLowerCase()
      const network = networksMap[chainId]

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
              balance: '0',
              chains: [],
              type: TOKEN_TYPES.GROUP,
              testnet: record.group.includes('testnet'),
              group: record.group,
              uuid: `coins::${record.group}::0`,
              path: `/coins/${record.group}`,
              logoURI: coin.logoURI
            }
          }

          acc[record.group].balance = (BigInt(acc[record.group].balance) + BigInt(balance)).toString()
          acc[record.group].prettyBalance = formatPrettyBalance(acc[record.group].balance, record.decimals)
          acc[record.group].chains.push(coin)
        }
      }

      return acc
    }, {} as Record<string, any>)
  )

  // Split into multi-chain groups vs single-chain groups
  const multiChainGroups = groups.filter(group => group.chains.length >= minGroupSize)
  const groupedUuids = multiChainGroups.flatMap(group => group.chains.map(chain => chain.uuid))

  // Keep tokens not included in eligible groups
  const ungroupedTokens = values.filter(token => !groupedUuids.includes(token.uuid))

  return [...multiChainGroups, ...ungroupedTokens]
}
