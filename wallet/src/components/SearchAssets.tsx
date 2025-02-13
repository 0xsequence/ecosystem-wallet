// import { Box, SearchIcon, Skeleton, Text, TextInput, compareAddress } from '@0xsequence/design-system'
// import { ContractVerificationStatus } from '@0xsequence/indexer'
// import { ethers } from 'ethers'
// import Fuse from 'fuse.js'
// import { SyntheticEvent, useState } from 'react'

// import { computeBalanceFiat } from '../utils/balance'

// import { useAuth } from '../context/AuthContext'

// import { useBalancesSummary } from '../hooks/useBalancesSummary'
// import { useCoinPrices, useExchangeRate } from '../hooks/useCoinPrices'
// import { useConfig } from '../hooks/useConfig'

// import { BalanceItem } from './BalanceItem'
// import { WalletLink } from './WalletLink'

// export const SearchAssets = () => {
//   const { chainIds, hideUnlistedTokens, fiatCurrency } = useConfig()
//   const [search, setSearch] = useState('')
//   const { authState } = useAuth()
//   const accountAddress = authState.status === 'signedIn' ? authState.address : undefined

//   const { data: tokenBalancesData, isFetching: isFetchingTokenBalances } = useBalancesSummary({
//     chainIds,
//     omitMetadata: false,
//     filter: {
//       omitNativeBalances: false,
//       accountAddresses: accountAddress ? [accountAddress] : [],
//       contractStatus: hideUnlistedTokens
//         ? ContractVerificationStatus.VERIFIED
//         : ContractVerificationStatus.ALL,
//       contractWhitelist: [],
//       contractBlacklist: []
//     }
//   })

//   const coinBalancesUnordered =
//     tokenBalancesData?.filter(
//       b => b.contractType === 'ERC20' || compareAddress(b.contractAddress, ethers.ZeroAddress)
//     ) || []

//   const { data: coinPrices = [], isFetching: isFetchingCoinPrices } = useCoinPrices(
//     coinBalancesUnordered.map(token => ({
//       chainId: token.chainId,
//       contractAddress: token.contractAddress
//     }))
//   )

//   const { data: conversionRate = 1, isFetching: isFetchingConversionRate } = useExchangeRate(
//     fiatCurrency.symbol
//   )

//   const coinBalances = coinBalancesUnordered.sort((a, b) => {
//     const isHigherFiat =
//       Number(
//         computeBalanceFiat({
//           balance: b,
//           prices: coinPrices,
//           conversionRate,
//           decimals: b.contractInfo?.decimals || 18
//         })
//       ) -
//       Number(
//         computeBalanceFiat({
//           balance: a,
//           prices: coinPrices,
//           conversionRate,
//           decimals: a.contractInfo?.decimals || 18
//         })
//       )
//     return isHigherFiat
//   })

//   const collectionBalancesUnordered =
//     tokenBalancesData?.filter(b => b.contractType === 'ERC721' || b.contractType === 'ERC1155') || []
//   const collectionBalances = collectionBalancesUnordered.sort((a, b) => {
//     return Number(b.balance) - Number(a.balance)
//   })

//   const isFetching = isFetchingTokenBalances || isFetchingCoinPrices || isFetchingConversionRate

//   interface IndexedData {
//     index: number
//     name: string
//   }
//   const indexedCollectionBalances: IndexedData[] = collectionBalances.map((balance, index) => {
//     return {
//       index,
//       name: balance.contractInfo?.name || 'Unknown'
//     }
//   })

//   const indexedCoinBalances: IndexedData[] = coinBalances.map((balance, index) => {
//     if (compareAddress(balance.contractAddress, ethers.ZeroAddress)) {
//       // TODO get native token info
//       const nativeTokenInfo = { name: 'TODO' }

//       return {
//         index,
//         name: nativeTokenInfo.name
//       }
//     } else {
//       return {
//         index,
//         name: balance.contractInfo?.name || 'Unknown'
//       }
//     }
//   })

//   const coinBalancesAmount = coinBalances.length
//   const collectionBalancesAmount = collectionBalances.length

//   const fuzzySearchCoinBalances = new Fuse(indexedCoinBalances, {
//     keys: ['name']
//   })

//   const fuzzySearchCollections = new Fuse(indexedCollectionBalances, {
//     keys: ['name']
//   })

//   const foundCoinBalances = (
//     search === '' ? indexedCoinBalances : fuzzySearchCoinBalances.search(search).map(result => result.item)
//   ).slice(0, 5)
//   const foundCollectionBalances = (
//     search === ''
//       ? indexedCollectionBalances
//       : fuzzySearchCollections.search(search).map(result => result.item)
//   ).slice(0, 5)

//   return (
//     <Box
//       paddingX="4"
//       paddingBottom="5"
//       paddingTop="3"
//       flexDirection="column"
//       gap="10"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <Box width="full">
//         <TextInput
//           autoFocus
//           name="search wallet"
//           leftIcon={SearchIcon}
//           value={search}
//           onChange={(ev: SyntheticEvent) => setSearch((ev.target as HTMLInputElement).value)}
//           placeholder="Search your wallet"
//           data-1p-ignore
//         />
//       </Box>
//       <Box width="full" flexDirection="column" alignItems="center" justifyContent="center" gap="5">
//         <WalletLink toLocation="tokens" label={`Coins (${coinBalancesAmount})`} />

//         {isFetching && coinBalancesAmount > 0 ? (
//           Array(5)
//             .fill(null)
//             .map((_, i) => <Skeleton key={i} width="full" height="8" />)
//         ) : foundCoinBalances.length === 0 ? (
//           <Text color="text100">No coins found</Text>
//         ) : (
//           foundCoinBalances.map((indexItem, index) => {
//             const balance = coinBalances[indexItem.index]
//             return <BalanceItem key={index} balance={balance} />
//           })
//         )}
//       </Box>
//       <Box width="full" flexDirection="column" alignItems="center" justifyContent="center" gap="5">
//         <WalletLink toLocation="collectibles" label={`Collections (${collectionBalancesAmount})`} />
//         {isFetching && collectionBalancesAmount > 0 ? (
//           Array(5)
//             .fill(null)
//             .map((_, i) => <Skeleton key={i} width="full" height="8" />)
//         ) : foundCollectionBalances.length === 0 ? (
//           <Text color="text100">No collections found</Text>
//         ) : (
//           foundCollectionBalances.map((indexedItem, index) => {
//             const balance = collectionBalances[indexedItem.index]
//             return <BalanceItem key={index} balance={balance} />
//           })
//         )}
//       </Box>
//     </Box>
//   )
// }
