import { ChainId, networks } from '@0xsequence/network'
import { formatPrettyBalance } from './format-pretty-balance'
import { ZERO_ADDRESS } from '@0xsequence/design-system'
import { getTokenBalancesDetails } from './balance'
import { TokenRecord } from '../pages/InventoryRoutes/types'
import { TokenBalance } from '@0xsequence/indexer'
import { networksMap } from './currencyGroups/networks'

export const CONTRACT_TYPES = {
  NATIVE: 'NATIVE',
  ERC20: 'ERC20',
  ERC1155: 'ERC1155',
  ERC721: 'ERC721'
} as const

export const TOKEN_TYPES = {
  COIN: 'COIN',
  COLLECTIBLE: 'COLLECTIBLE',
  GROUP: 'GROUP'
}

export function normalizeBalances(data: Awaited<ReturnType<typeof getTokenBalancesDetails>>) {
  const set = new Set()

  // Omit null balances
  const balances = data.balances.filter(chain => chain.results.length > 0)
  const nativeBalances = data.nativeBalances.filter(chain => chain.results?.[0].balance !== '0')

  // Flatten
  balances
    .flatMap(item => item.results) // flattens results from each item
    .forEach(token => set.add(token))
  nativeBalances
    .flatMap(item => item.results) // flattens results from each item
    .forEach(token => set.add(token))

  return normalizeTokens(Array.from(set) as TokenBalance[])
}

export function normalizeTokens(balances: TokenBalance[]) {
  if (!balances) return []
  const records = balances?.map(token => {
    const contractType = token?.contractType ? token.contractType.toUpperCase() : CONTRACT_TYPES.NATIVE

    const chainInfo = networks[token.chainId as ChainId]
    const testnet = chainInfo?.type?.toLowerCase() === 'testnet'

    const crosschain = networksMap[token.chainId]

    const group = crosschain.currencies?.find(
      currency => currency.contractAddress.toLowerCase() === token?.contractAddress
    )

    switch (contractType) {
      case CONTRACT_TYPES.NATIVE:
        return {
          ...token,
          contractType,
          type: TOKEN_TYPES.COIN,
          uuid: `${token.chainId}::${ZERO_ADDRESS}::0`,
          path: `/${token.chainId}/${ZERO_ADDRESS}/0`,
          chainInfo,
          contractAddress: ZERO_ADDRESS,
          testnet,
          symbol: chainInfo?.nativeToken?.symbol,
          decimals: chainInfo?.nativeToken?.decimals,
          logoURI: chainInfo?.logoURI,
          group,
          prettyBalance: formatPrettyBalance(token.balance, chainInfo.nativeToken.decimals)
        } as unknown as TokenRecord

      case CONTRACT_TYPES.ERC20:
        return {
          ...token,
          contractType,
          type: TOKEN_TYPES.COIN,
          uuid: `${token.chainId}::${token.contractAddress}::0`,
          path: `/${token.chainId}/${token.contractAddress}/0`,
          chainInfo,
          tokenId: token.tokenID,
          symbol: token.contractInfo?.symbol,
          decimals: token.contractInfo?.decimals,
          logoURI: token.contractInfo?.logoURI,
          testnet,
          group,
          prettyBalance: formatPrettyBalance(token.balance, token.contractInfo?.decimals || undefined)
        } as unknown as TokenRecord

      case CONTRACT_TYPES.ERC1155:
      case CONTRACT_TYPES.ERC721:
        return {
          ...token,
          contractType,
          type: TOKEN_TYPES.COLLECTIBLE,
          uuid: `${token.chainId}::${token.contractAddress}::${token.tokenID || 0}`,
          path: `/${token.chainId}/${token.contractAddress}/${token.tokenID || 0}`,
          chainInfo,
          testnet,
          tokenId: token.tokenID,
          symbol: token.contractInfo?.symbol,
          decimals: token.contractInfo?.decimals,
          group,
          prettyBalance: token.balance
        } as unknown as TokenRecord
    }
  })
  return records
  // return [...records, ...groups(records)]
}

// function groups(value: TokenRecord[]) {
//   const groups = Object.values(
//     value.reduce((acc, coin) => {
//       const chainId = coin.chainId
//       const contractAddress = coin.contractAddress.toLowerCase()

//       const network = networksMap[chainId]

//       if (network?.currencies) {
//         const record = network.currencies.find(
//           currency => currency.contractAddress.toLowerCase() === contractAddress
//         )
//         let balance = '0'
//         if (coin.balance && typeof coin.balance === 'string') {
//           balance = coin.balance
//         }

//         if (record && record.group) {
//           coin.group = record.group
//           if (!acc[record.group]) {
//             acc[record.group] = {
//               ...record,
//               uuid: `group::${record.group}`,
//               path: `/group/${record.group}`,
//               balance: '0',
//               chains: [],
//               type: 'GROUP',
//               testnet: record.group.includes('testnet')
//             }
//           }

//           acc[record.group].balance = (BigInt(acc[record.group].balance) + BigInt(balance)).toString()
//           acc[record.group].chains.push(coin)
//         }
//       }
//       return acc
//     }, {} as Record<string, any>)
//   ).filter(item => item.chains.length > 1)

//   return groups
//   // const uuids = groups.flatMap(group => group.chains.map(chain => chain.uuid))

//   // const nextValue = value.filter(token => !uuids.includes(token.uuid))

//   // return [...groups, ...nextValue]
// }
