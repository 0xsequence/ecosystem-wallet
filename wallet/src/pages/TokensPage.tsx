import { Box, Text, TokenImage, compareAddress } from '@0xsequence/design-system'
import { ChainId } from '@0xsequence/network'
import { formatUnits } from 'ethers'
import { zeroAddress } from 'viem'

import { useAssetBalance } from '../hooks/useBalancesSummary'

import { NetworkImage } from '../components/NetworkImage'

export interface NativeTokenInfo {
  chainId: number
  name: string
  symbol: string
  logoURI: string
  decimals: number
  blockExplorerUrl?: string
  blockExplorerName?: string
}

export const TokensPage = () => {
  const {
    data: { coinBalances }
    // loading and error state to be added
    // isPending,
    // isError
  } = useAssetBalance()

  console.log({ coinBalances })

  const tokens = coinBalances.map(({ contractAddress, contractInfo, chainId, balance }) => {
    const isNativeToken = compareAddress(contractAddress, zeroAddress)
    const logo = contractInfo?.logoURI
    const symbol = contractInfo?.symbol
    const name = contractInfo?.name
    const decimals = contractInfo?.decimals
    const formattedBalance = formatUnits(balance || '0', decimals)

    return {
      id: contractInfo?.address || Math.random().toString(36).substring(2, 15),
      logo,
      name,
      symbol,
      // get util from kit to display balance
      balance: '-',
      decimals,
      chainId,
      isNativeToken,
      contractAddress: contractInfo?.address,
      balanceRaw: balance,
      balanceFormatted: formattedBalance
    }
  })

  return (
    <Box height="full" flexDirection="column" alignItems="center" gap="5" marginTop="20">
      {tokens.map(({ id, chainId, logo, name, symbol, balanceFormatted }) => (
        <Box key={id} flexDirection="column" gap="10" paddingBottom="5" paddingX="4" paddingTop="0">
          <Box marginBottom="10" gap="2" alignItems="center" justifyContent="center" flexDirection="column">
            <TokenImage src={logo} size="xl" />
            <Text variant="large" color="text100" fontWeight="bold">
              {name}
            </Text>
            <NetworkImage chainId={chainId} />
          </Box>
          <Box>
            <Text variant="normal" fontWeight="medium" color="text50">
              Balance
            </Text>
            <Box flexDirection="row" alignItems="flex-end" justifyContent="space-between">
              <Text
                variant="xlarge"
                fontWeight="bold"
                color="text100"
              >{`${balanceFormatted} ${symbol}`}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
