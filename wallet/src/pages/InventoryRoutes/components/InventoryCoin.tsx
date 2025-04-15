import { TokenListItem, TokenTile } from './TokenTile'
import type { TokenTypeProps } from '../types'
import { CoinIcon } from './partials/coin-icon'
import { CoinBalance } from './partials/coin-balance'
import { CoinChains } from './partials/coin-chains'
import { TestnetBadge } from './partials/testnet-badge'
import { FavoriteBadge } from './partials/favorite-badge'
import { CoinFiatValue } from './partials/coin-fiat-value'
import { Button } from '@0xsequence/design-system'
import { SendIcon } from '../../../design-system-patch/icons'
import { useTokenContext } from '../TokenPage'

export function InventoryCoinTile(props: TokenTypeProps) {
  const { chainId, symbol, logoURI, contractType, uuid, prettyBalance, testnet, path } = props

  return (
    <TokenTile path={path} className="p-4 sm:p-6 flex flex-col items-start gap-3 relative">
      <div className=" absolute top-2 right-2">
        <TestnetBadge isTestnet={testnet} />
      </div>
      <CoinIcon {...{ contractType, logoURI, chainId }} size="lg" />

      <div className="flex mt-auto w-full justify-between">
        <div className="flex flex-col flex-1 justify-end items-start text-start gap-3">
          <CoinBalance balance={prettyBalance} symbol={symbol} />
          <CoinChains chains={props} />
        </div>
        <FavoriteBadge id={uuid} />
      </div>
    </TokenTile>
  )
}

export function InventoryCoinList(props: TokenTypeProps) {
  const {
    chainId,
    symbol,
    logoURI,
    contractAddress,
    path,
    contractType,
    uuid,
    prettyBalance,
    testnet,
    decimals,
    balance
  } = props

  return (
    <TokenListItem path={path} className="p-4 sm:py-3 px-4 flex items-center gap-3 relative trasition-all">
      <CoinIcon logoURI={logoURI} chainId={chainId} contractType={contractType} size="md" />
      <div className="flex flex-col gap-1">
        <CoinBalance balance={prettyBalance} symbol={symbol} />
        <CoinChains chains={props} size="xs" />
      </div>

      <div className="flex gap-4 ml-auto mr-0">
        <FavoriteBadge id={uuid} />
        {testnet ? (
          <TestnetBadge isTestnet={true} />
        ) : (
          <CoinFiatValue
            chainId={chainId}
            contractAddress={contractAddress}
            balance={balance || '0'}
            decimals={decimals}
          />
        )}
      </div>
    </TokenListItem>
  )
}
