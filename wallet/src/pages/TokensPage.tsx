import { Box } from '@0xsequence/design-system'

import { useAssetBalance } from '../hooks/useBalancesSummary'

export const TokensPage = () => {
  const {
    data: { coinBalances }
    // loading and error state to be added
    // isPending,
    // isError
  } = useAssetBalance()
  return (
    <Box background="white">
      <h1>Tokens Page</h1>
      {coinBalances.map((coin, index) => (
        <Box key={index}>
          {coin?.chainId} - {coin.balance}
        </Box>
      ))}
    </Box>
  )
}
