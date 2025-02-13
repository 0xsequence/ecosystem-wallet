import { Box, Button, Image, SendIcon, Text } from '@0xsequence/design-system'
import { ContractVerificationStatus } from '@0xsequence/indexer'
import { formatUnits } from 'ethers'
import { useNavigate } from 'react-router'

import { useAuth } from '../context/AuthContext'

import { useTokenBalancesDetails } from '../hooks/useBalancesSummary'
import { useConfig } from '../hooks/useConfig'

import { CollectibleTileImage } from '../components/CollectibleTileImage'
import { NetworkImage } from '../components/NetworkImage'

import { ROUTES } from '../routes'

export const InventoryPage = () => {
  const navigate = useNavigate()
  const { chainIds, hideUnlistedTokens } = useConfig()
  const { address: accountAddress } = useAuth()
  const { data: collectionBalances = [] } = useTokenBalancesDetails({
    chainIds,
    omitMetadata: false,
    filter: {
      omitNativeBalances: false,
      accountAddresses: accountAddress ? [accountAddress] : [],
      contractStatus: hideUnlistedTokens
        ? ContractVerificationStatus.VERIFIED
        : ContractVerificationStatus.ALL,
      contractWhitelist: [],
      contractBlacklist: []
    }
  })

  const collectibles = collectionBalances.map(collection => {
    const collectionLogo = collection?.contractInfo?.logoURI
    const collectionName = collection?.contractInfo?.name || 'Unknown Collection'

    const decimals = collection?.tokenMetadata?.decimals || 0
    const rawBalance = collection?.balance || '0'
    const balance = formatUnits(rawBalance, decimals)
    const collectibleName = collection.tokenMetadata?.name || 'Unknown Collectible'

    return {
      id: collection.tokenID || Math.random().toString(36).substring(2, 15),
      chainId: collection.chainId,
      logo: collectionLogo,
      name: collectionName,
      collectibleName,
      balance: balance,
      imageUrl: collection.tokenMetadata?.image,
      tokenId: collection.tokenID || 'Unknown Token ID'
    }
  })

  return (
    <Box
      display="grid"
      height="full"
      alignItems="center"
      gap="5"
      padding="20"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: 'auto' }}
    >
      {collectibles.map(({ id, chainId, logo, name, balance, collectibleName, imageUrl, tokenId }) => (
        <Box key={id} flexDirection="column" gap="3" paddingBottom="5" paddingX="4" paddingTop="0">
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
                <NetworkImage chainId={chainId} size="xs" />
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
          <Button
            color="text100"
            width="full"
            variant="primary"
            leftIcon={SendIcon}
            label="Senda"
            onClick={() => navigate(ROUTES.SEND)}
          />

          <Button label="Send" leftIcon={SendIcon} onClick={() => navigate(ROUTES.SEND)} />
        </Box>
      ))}
    </Box>
  )
}
