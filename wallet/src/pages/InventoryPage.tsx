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
import { ContractVerificationStatus, GatewayNativeTokenBalance } from '@0xsequence/indexer'
import { ChainId } from '@0xsequence/network'
import { formatUnits } from 'ethers'

import { useAuth } from '../context/AuthContext'

import { useConfig } from '../hooks/useConfig'
import { useTokenBalancesDetails } from '../hooks/useTokenBalancesDetails'

import { CollectibleTileImage } from '../components/CollectibleTileImage'
import { NetworkImage } from '../components/NetworkImage'

export const InventoryPage = () => {
  const { hideUnlistedTokens } = useConfig()
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
    data?.balances.filter(balance => balance?.results?.length > 0).flatMap(balance => balance.results) || []
  const erc20Balances = balances.filter(
    ({ balance, contractType }) => contractType === 'ERC20' && balance !== '0'
  )
  const collectibleBalances = balances.filter(
    ({ balance, contractType }) => ['ERC721', 'ERC1155'].includes(contractType) && balance !== '0'
  )

  const nativeBalances = (data?.nativeBalances
    .filter(balance => balance.results?.length > 0 && balance.results[0].balance !== '0')
    .flatMap(balance => balance.results) || []) as unknown as (GatewayNativeTokenBalance['result'] & {
    chainId: ChainId
  })[]

  return (
    <Box
      display="grid"
      height="full"
      alignItems="center"
      gap="5"
      padding="20"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: 'auto' }}
    >
      <Box height="full" width="full" flexDirection="column" gap="8">
        {nativeBalances.map(({ chainId, balance }) => (
          <Box key={chainId} gap="3" flexDirection="row" alignItems="center" minWidth="0">
            <TokenImage src={nativeTokenImageUrl(chainId)} size="lg" withNetwork={chainId} />
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
            />
          </Box>
        ))}

        {erc20Balances.map(({ chainId, balance, contractAddress, contractInfo }) => (
          <Box
            key={`${contractAddress}-${chainId}`}
            gap="3"
            flexDirection="row"
            alignItems="center"
            minWidth="0"
          >
            <TokenImage src={contractInfo?.logoURI} size="lg" withNetwork={chainId} />
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
            />
          </Box>
        ))}
      </Box>

      {collectibleBalances.map(
        ({ chainId, balance, contractAddress, contractInfo, tokenMetadata, tokenID }) => (
          <Box
            key={`${contractAddress}-${tokenID}-${chainId}`}
            flexDirection="column"
            gap="3"
            paddingBottom="5"
            paddingX="4"
            paddingTop="0"
          >
            <Box gap="3" alignItems="center" justifyContent="center" flexDirection="column">
              <Box flexDirection="row" gap="2" justifyContent="center" alignItems="center">
                {contractInfo?.logoURI && (
                  <Image
                    borderRadius="circle"
                    width="8"
                    src={contractInfo.logoURI}
                    alt="collection logo"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <Box gap="1" flexDirection="row" justifyContent="center" alignItems="center">
                  <Text variant="small" fontWeight="bold" color="text100">
                    {contractInfo?.name || 'Unknown Collection'}
                  </Text>
                  <NetworkImage chainId={chainId} size="xs" />
                </Box>
              </Box>
              <Box flexDirection="column" justifyContent="center" alignItems="center">
                <Text variant="large" color="text100" fontWeight="bold">
                  {tokenMetadata?.name || 'Unknown Collectible'}
                </Text>
                <Text variant="small" color="text50" fontWeight="medium">
                  {`#${tokenID}`}
                </Text>
              </Box>
            </Box>
            <Box>
              <CollectibleTileImage imageUrl={tokenMetadata?.image} />
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
            <Button color="text100" width="full" variant="primary" leftIcon={SendIcon} label="Send" />
          </Box>
        )
      )}
    </Box>
  )
}
