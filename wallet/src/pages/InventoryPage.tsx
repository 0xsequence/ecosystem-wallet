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
import { ContractVerificationStatus, GatewayNativeTokenBalance, TokenBalance } from '@0xsequence/indexer'
import { ChainId } from '@0xsequence/network'
import { formatUnits } from 'ethers'

import { useAuth } from '../context/AuthContext'

import { useTokenBalancesDetails } from '../hooks/useTokenBalancesDetails'
import { useConfig } from '../hooks/useConfig'

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
  const { erc20Balances, collectiblesBalances } = balances.reduce<{
    erc20Balances: TokenBalance[]
    collectiblesBalances: TokenBalance[]
  }>(
    (acc, balance) => {
      if (balance.contractInfo?.type === 'ERC20') {
        acc.erc20Balances.push(balance)
      } else {
        acc.collectiblesBalances.push(balance)
      }

      return acc
    },
    { erc20Balances: [], collectiblesBalances: [] }
  )

  const nativeBalances = (data?.nativeBalances
    .filter(balance => balance.results?.length > 0 && balance.results[0].balance !== '0')
    .flatMap(balance => balance.results) || []) as unknown as (GatewayNativeTokenBalance['result'] & {
    chainId: ChainId
  })[]
  // api response type mismatch, response consist chainId but not in the type
  // {
  //   "accountAddress": "0x12a3a50e830faa32d16a231e3420b61bed3cd911",
  //   "chainId": 37084624,
  //   "balance": "0"
  // }

  const collectibles = collectiblesBalances.flatMap(chainBalance => {
    const collectionLogo = chainBalance?.contractInfo?.logoURI
    const collectionName = chainBalance?.contractInfo?.name || 'Unknown Collection'

    const decimals = chainBalance?.tokenMetadata?.decimals || 0
    const rawBalance = chainBalance?.balance || '0'
    const formattedBalance = formatUnits(rawBalance, decimals)
    const collectibleName = chainBalance.tokenMetadata?.name || 'Unknown Collectible'

    return {
      id: `${chainBalance.chainId}-${chainBalance.tokenID}`,
      chainId: chainBalance.chainId,
      logo: collectionLogo,
      name: collectionName,
      collectibleName,
      balance: formattedBalance,
      imageUrl: chainBalance.tokenMetadata?.image,
      tokenId: chainBalance.tokenID || 'Unknown Token ID'
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
      <Box height="full" width="full" flexDirection="column" gap="2">
        {nativeBalances.map(({ chainId, balance }) => (
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
            />
          </Box>
        ))}

        {erc20Balances.map(({ chainId, balance }) => (
          <Box key={chainId} gap="3" flexDirection="row" alignItems="center" minWidth="0">
            {/* // should get erc20 token image */}
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
          />
        </Box>
      ))}

    </Box>
  )
}
