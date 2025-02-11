import { Box } from '@0xsequence/design-system'

import { useAssetBalance } from '../hooks/useBalancesSummary'

export const CollectiblesPage = () => {
  const {
    data: { collectionBalances }
    // loading and error state to be added
    // isPending,
    // isError
  } = useAssetBalance()
  return (
    <Box background="white">
      <h1>Collectibles Page</h1>
      {collectionBalances.map((collection, index) => (
        <Box key={index}>
          {collection?.contractInfo?.symbol || '-'} - {collection.balance}
        </Box>
      ))}
    </Box>
  )
}
