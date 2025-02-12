import { Box, Image, Text } from '@0xsequence/design-system'
import { ChainId } from '@0xsequence/network'
import { formatUnits } from 'ethers'

import { useAssetBalance } from '../hooks/useBalancesSummary'

import { CollectibleTileImage } from '../components/CollectibleTileImage'
import { NetworkImage } from '../components/NetworkImage'

export const CollectiblesPage = () => {
  const {
    data: { collectionBalances }
    // loading and error state to be added
    // isPending,
    // isError
  } = useAssetBalance()

  const collectibles = collectionBalances.map(collection => {
    const collectionLogo = collection?.contractInfo?.logoURI
    const collectionName = collection?.contractInfo?.name || 'Unknown Collection'

    const decimals = collection?.tokenMetadata?.decimals || 0
    const rawBalance = collection?.balance || '0'
    const balance = formatUnits(rawBalance, decimals)
    const collectibleName = collection.tokenMetadata?.name || 'Unknown Collectible'

    return {
      id: collection.tokenID || Math.random().toString(36).substring(2, 15),
      logo: collectionLogo,
      name: collectionName,
      collectibleName,
      balance: balance,
      imageUrl: collection.tokenMetadata?.image_data,
      tokenId: collection.tokenID || 'Unknown Token ID'
    }
  })
  return (
    <Box height="full" flexDirection="column" alignItems="center" gap="5" marginTop="20">
      {collectibles.map(({ id, logo, name, balance, collectibleName, imageUrl, tokenId }) => (
        <Box key={id} flexDirection="column" gap="10" paddingBottom="5" paddingX="4" paddingTop="0">
          <Box gap="3" alignItems="center" justifyContent="center" flexDirection="column">
            <Box flexDirection="row" gap="2" justifyContent="center" alignItems="center">
              {logo && (
                <Image
                  borderRadius="circle"
                  width="8"
                  src={logo}
                  alt="collection logo"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <Box gap="1" flexDirection="row" justifyContent="center" alignItems="center">
                <Text variant="small" fontWeight="bold" color="text100">
                  {name}
                </Text>
                <NetworkImage chainId={ChainId.SONEIUM} size="xs" />
              </Box>
            </Box>
            <Box flexDirection="column" justifyContent="center" alignItems="center">
              <Text variant="large" color="text100" fontWeight="bold">
                {collectibleName}
              </Text>
              <Text variant="small" color="text50" fontWeight="medium">
                {`#${tokenId}`}
              </Text>
            </Box>
          </Box>
          <Box>
            <CollectibleTileImage imageUrl={imageUrl} />
          </Box>
          <Box>
            <Text variant="normal" fontWeight="medium" color="text50">
              Balance
            </Text>
            <Box flexDirection="row" alignItems="flex-end" justifyContent="space-between">
              <Text variant="xlarge" fontWeight="bold" color="text100">
                {balance}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
