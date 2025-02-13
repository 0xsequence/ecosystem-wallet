import { Box, ChevronRightIcon, Text, TokenImage, compareAddress } from '@0xsequence/design-system'
import { TokenBalance } from '@0xsequence/indexer'
import { ethers } from 'ethers'

import { formatDisplay } from '../utils/helpers'

interface BalanceItemProps {
  balance: TokenBalance
}

export const BalanceItem = ({ balance }: BalanceItemProps) => {
  const isNativeToken = compareAddress(balance.contractAddress, ethers.ZeroAddress)
  // TODO get native token info
  const nativeTokenInfo = { chainId: balance.chainId, name: '-', symbol: '???', decimals: 18, logoURI: '' }
  const logoURI = isNativeToken ? nativeTokenInfo.logoURI : balance?.contractInfo?.logoURI
  const tokenName = isNativeToken ? nativeTokenInfo.name : balance?.contractInfo?.name || 'Unknown'
  const symbol = isNativeToken ? nativeTokenInfo.symbol : balance?.contractInfo?.symbol

  const getQuantity = () => {
    if (balance.contractType === 'ERC721' || balance.contractType === 'ERC1155') {
      return balance.uniqueCollectibles
    }
    const decimals = isNativeToken ? nativeTokenInfo.decimals : balance?.contractInfo?.decimals
    const bal = ethers.formatUnits(balance.balance, decimals || 0)
    const displayBalance = formatDisplay(bal)
    const symbol = isNativeToken ? nativeTokenInfo.symbol : balance?.contractInfo?.symbol

    return `${displayBalance} ${symbol}`
  }

  const onClick = () => {
    const isCollection = balance.contractType === 'ERC721' || balance.contractType === 'ERC1155'
    if (isCollection) {
      // collection details
    } else {
      // coin details
    }
  }

  return (
    <Box
      key={balance.contractAddress}
      onClick={onClick}
      width="full"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      userSelect="none"
      cursor="pointer"
      opacity={{ hover: '80' }}
    >
      <Box gap="3" flexDirection="row" alignItems="center" justifyContent="center" minWidth="0">
        <TokenImage src={logoURI} symbol={symbol} size="md" withNetwork={balance.chainId} />
        <Text
          variant="normal"
          color="text100"
          fontWeight="bold"
          overflow="hidden"
          whiteSpace="nowrap"
          ellipsis
        >
          {tokenName}
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="center" gap="1" maxWidth="1/2">
        <Text
          variant="normal"
          color="text50"
          fontWeight="bold"
          textAlign="right"
          whiteSpace="nowrap"
          ellipsis
        >
          {getQuantity()}
        </Text>
        <ChevronRightIcon color="text50" />
      </Box>
    </Box>
  )
}
