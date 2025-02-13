import {
  Box,
  Button,
  IconButton,
  Image,
  SendIcon,
  Text,
  TokenImage,
  nativeTokenImageUrl
} from '@0xsequence/design-system'
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
  const { hideUnlistedTokens, chainIds } = useConfig()
  const { address: accountAddress } = useAuth()
  const { data } = useTokenBalancesDetails({
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

  const balances =
    data?.balances.filter(balance => balance?.results?.length > 0).map(balance => balance.results) || []
  const nativeBalances = data?.nativeBalances

  const collectibles = balances
    .map(chainBalances => {
      return chainBalances.map(chainBalance => {
        const collectionLogo = chainBalance?.contractInfo?.logoURI
        const collectionName = chainBalance?.contractInfo?.name || 'Unknown Collection'

        const decimals = chainBalance?.tokenMetadata?.decimals || 0
        const rawBalance = chainBalance?.balance || '0'
        const formattedBalance = formatUnits(rawBalance, decimals)
        const collectibleName = chainBalance.tokenMetadata?.name || 'Unknown Collectible'

        return {
          id: chainBalance.tokenID || Math.random().toString(36).substring(2, 15),
          chainId: chainBalance.chainId,
          logo: collectionLogo,
          name: collectionName,
          collectibleName,
          balance: formattedBalance,
          imageUrl: chainBalance.tokenMetadata?.image,
          tokenId: chainBalance.tokenID || 'Unknown Token ID'
        }
      })
    })
    .flat()

  // @ts-expect-error types doesn't match with the api response
  const nativeTokens = nativeBalances?.filter(balance => chainIds.includes(balance.chainID))
    .flatMap(chainBalance =>
      // @ts-expect-error types doesn't match with the api response
      chainBalance.balances.filter(balance => balance.balance !== '0').map(balance => ({ ...balance, chainId: chainBalance.chainID }))
    )

  return (
    <Box
      display="grid"
      height="full"
      alignItems="center"
      gap="5"
      padding="20"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: 'auto' }}
    >
      <Box height="full" width="full" flexDirection="column" gap="2">
        {nativeTokens?.map(({ chainId, balance }) => (
          <Box key={chainId} gap="3" flexDirection="row" alignItems="center" minWidth="0">
            <TokenImage src={nativeTokenImageUrl(chainId)} size="xl" withNetwork={chainId} />
            <Text
              variant="normal"
              color="text50"
              fontWeight="bold"
              textAlign="right"
              whiteSpace="nowrap"
              ellipsis
            >
              {formatUnits(balance, 18)}
            </Text>
            <IconButton
              opacity={{ hover: '80' }}
              color="text100"
              size="sm"
              width="full"
              variant="primary"
              marginLeft="auto"
              icon={SendIcon}
              onClick={() => navigate(ROUTES.SEND)}
            />
          </Box>
        ))}
      </Box>

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
            label="Send"
            onClick={() => navigate(ROUTES.SEND)}
          />
        </Box>
      ))}
    </Box>
  )
}
