import {
  Button,
  Divider,
  IconButton,
  Image,
  Modal,
  ModalPrimitive,
  SendIcon,
  Text,
  TokenImage,
  nativeTokenImageUrl
} from '@0xsequence/design-system'
import { ContractVerificationStatus } from '@0xsequence/indexer'
import { ChainId } from '@0xsequence/network'
import { ethers, formatUnits } from 'ethers'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { createNativeTokenBalance } from '../utils/balance'

import { useAuth } from '../context/AuthContext'

import { useConfig } from '../hooks/useConfig'
import { useTokenBalancesDetails } from '../hooks/useTokenBalancesDetails'

import { CollectibleTileImage } from '../components/CollectibleTileImage'
import { NetworkImage } from '../components/NetworkImage'
import { SendCoin } from '../components/SendCoin'
import { SendCollectible } from '../components/SendCollectible'

export const InventoryPage = () => {
  const { hideUnlistedTokens } = useConfig()
  const { address: accountAddress = '' } = useAuth()
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
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [sendOptions, setSendOptions] = useState<
    { chainId: ChainId; contractAddress?: string; tokenId?: string } | undefined
  >()
  const { chainId = ChainId.SONEIUM, contractAddress, tokenId = '' } = sendOptions || {}

  const balances =
    data?.balances.filter(balance => balance?.results?.length > 0).flatMap(balance => balance.results) || []
  const erc20Balances = balances.filter(
    ({ balance, contractType }) => contractType === 'ERC20' && balance !== '0'
  )
  const collectibleBalances = balances.filter(
    ({ balance, contractType }) => ['ERC721', 'ERC1155'].includes(contractType) && balance !== '0'
  )

  const nativeBalances =
    data?.nativeBalances
      .filter(balance => balance.results?.length > 0 && balance.results[0].balance !== '0')
      .flatMap(balance =>
        balance.results.map(result =>
          createNativeTokenBalance(balance.chainId, result.accountAddress, result.balance)
        )
      ) || []

  const collectibleBalanceToSend = collectibleBalances.find(collectible => collectible.tokenID === tokenId)
  const coinBalanceToSend = tokenId
    ? null
    : (contractAddress ? erc20Balances : nativeBalances).find(balance => balance.chainId === chainId)

  return (
    <div
      className="grid h-full items-center gap-5 p-20"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gridAutoRows: 'auto' }}
    >
      <div className="flex h-full w-full flex-col gap-8">
        {nativeBalances.map(({ chainId, balance }) => (
          <div className="flex gap-3 flex-row items-center min-w-0" key={chainId}>
            <TokenImage src={nativeTokenImageUrl(chainId)} size="lg" withNetwork={chainId} />
            <Text
              className="text-right whitespace-nowrap"
              variant="normal"
              color="text50"
              fontWeight="bold"
              ellipsis
            >
              {formatUnits(balance, 18)}
            </Text>
            <IconButton
              className="text-text100 w-full ml-auto max-w-8"
              size="sm"
              variant="primary"
              icon={SendIcon}
              onClick={() => {
                setSendOptions({ chainId })
                setOpenWalletModal(true)
              }}
            />
          </div>
        ))}

        <Divider />

        {erc20Balances.map(({ chainId, balance, contractAddress, contractInfo }) => (
          <div className="flex gap-3 flex-row items-center min-w-0" key={`${contractAddress}-${chainId}`}>
            <TokenImage src={contractInfo?.logoURI} size="lg" withNetwork={chainId} />
            <Text
              className="text-right whitespace-nowrap"
              variant="normal"
              color="text50"
              fontWeight="bold"
              ellipsis
            >
              {formatUnits(balance, contractInfo?.decimals || 18)}
            </Text>
            <IconButton
              className="text-text100 w-full ml-auto max-w-8"
              size="sm"
              variant="primary"
              icon={SendIcon}
              onClick={() => {
                setSendOptions({ chainId, contractAddress })
                setOpenWalletModal(true)
              }}
            />
          </div>
        ))}
      </div>
      {collectibleBalances.map(
        ({ chainId, balance, contractAddress, contractInfo, tokenMetadata, tokenID }) => (
          <div
            className="flex flex-col gap-3 pb-5 px-4 pt-0"
            key={`${contractAddress}-${tokenID}-${chainId}`}
          >
            <div className="flex gap-3 items-center justify-center flex-col">
              <div className="flex flex-row gap-2 justify-center items-center">
                {contractInfo?.logoURI && (
                  <Image
                    className="rounded-full w-8"
                    src={contractInfo.logoURI}
                    alt="collection logo"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className="flex gap-1 flex-row justify-center items-center">
                  <Text variant="small" fontWeight="bold" color="text100">
                    {contractInfo?.name || 'Unknown Collection'}
                  </Text>
                  <NetworkImage chainId={chainId} size="xs" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Text variant="large" color="text100" fontWeight="bold">
                  {tokenMetadata?.name || 'Unknown Collectible'}
                </Text>
                <Text variant="small" color="text50" fontWeight="medium">
                  {`#${tokenID}`}
                </Text>
              </div>
            </div>
            <div>
              <CollectibleTileImage imageUrl={tokenMetadata?.image} />
            </div>
            <div>
              <Text variant="normal" fontWeight="medium" color="text50">
                Balance
              </Text>
              <div className="flex flex-row items-end justify-between">
                <Text variant="xlarge" fontWeight="bold" color="text100">
                  {ethers.formatUnits(balance, tokenMetadata?.decimals || 2)}
                </Text>
              </div>
            </div>
            <Button
              className="text-text100 w-full"
              variant="primary"
              leftIcon={SendIcon}
              label="Send"
              onClick={() => {
                setSendOptions({ chainId, tokenId: tokenID })
                setOpenWalletModal(true)
              }}
            />
          </div>
        )
      )}

      <AnimatePresence>
        {openWalletModal && (
          <Modal
            contentProps={{
              style: {
                maxWidth: '400px',
                height: 'fit-content',
                scrollbarColor: 'gray black',
                scrollbarWidth: 'thin'
              }
            }}
            scroll={false}
            onClose={() => {
              setSendOptions(undefined)
              setOpenWalletModal(false)
            }}
          >
            <div className="bg-background-primary w-96 h-auto">
              <div className="w-full h-12 bg-background-primary z-20 flex flex-row items-center justify-between pt-1.5 px-4">
                <div className="w-11 h-12" />
                <ModalPrimitive.Title asChild>
                  <Text variant="small" className="font-bold text-gray-100">
                    {sendOptions?.tokenId ? 'Send Collectible' : 'Send Coin'}
                  </Text>
                </ModalPrimitive.Title>
                <div className="w-11 h-12" />
              </div>
              <div className="ml-5">
                {coinBalanceToSend && (
                  <SendCoin
                    chainId={chainId}
                    balance={coinBalanceToSend}
                    onSuccess={() => setOpenWalletModal(false)}
                  />
                )}
                {collectibleBalanceToSend && (
                  <SendCollectible
                    chainId={chainId}
                    balance={collectibleBalanceToSend}
                    onSuccess={() => setOpenWalletModal(false)}
                  />
                )}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
