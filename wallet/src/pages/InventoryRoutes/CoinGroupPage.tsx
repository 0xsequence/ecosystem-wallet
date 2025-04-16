import { Link, useLocation, useParams } from 'react-router'
import { useInventory } from '../../hooks/use-inventory'
import { useFetchInventory } from './helpers/use-fetch-inventory'
import { Fragment, useState } from 'react'
import { SendTokens } from './components/SendTokens'
import { isTokenGroupRecord, TokenRecord } from './types'
import { Text, TokenImage, Button, SendIcon } from '@0xsequence/design-system'
import { THEME } from '../../utils/theme'
import { TestnetBadge } from './components/partials/testnet-badge'
import { CoinFiatValue } from './components/partials/coin-fiat-value'
import { FavoriteBadge } from './components/partials/favorite-badge'
import { CoinIcon } from './components/partials/coin-icon'
import { CoinChains } from './components/partials/coin-chains'
import { CoinBalance } from './components/partials/coin-balance'
import { ExpandIcon } from '../../design-system-patch/icons'

export function InventoryCoinGroupRoute() {
  const { groupId } = useParams() as { groupId: string }
  const query = useFetchInventory()

  const inventory = useInventory(query?.data, {
    filter: { group: groupId }
  })

  const coinGroup = inventory.records?.[0]

  const location = useLocation()

  if (!coinGroup || !isTokenGroupRecord(coinGroup)) return null

  return (
    <div className="flex flex-col p-5">
      {location.state && location.state.modal ? (
        <div className="h-[2.5rem]">
          <Link to={location.pathname}>
            <ExpandIcon />
          </Link>
        </div>
      ) : null}
      <div
        className={`py-8 flex flex-col items-center h-[240px] [background-image:var(--background)] bg-background-secondary bg-center rounded-sm  ${
          THEME.backgroundMode === 'tile' ? 'bg-repeat' : 'bg-cover bg-no-repeat'
        }`}
      >
        <div className="flex items-center flex-col gap-3 my-auto">
          <TokenImage src={coinGroup.logoURI} size="xl" />
          <Text variant="large" color="primary">
            {coinGroup.prettyBalance} {coinGroup.symbol}
          </Text>

          {/* <div className="flex-1 grid place-items-center">
            {price.isPending ? (
              <div className="h-[52px] grid place-items-center gap-2">
              <div className="h-7 w-24 bg-black/5 rounded animate-pulse" />
              <div className="h-5 w-16 bg-black/5 rounded animate-pulse" />
              </div>
              ) : (
                <>
                {price.value && <p className="text-style-md font-bold">{price.value}</p>}
                {price.change && (
                  <p
                  className={cn('text-style-sm', [
                    price.change.startsWith('-') ? 'text-red-400' : 'text-green-400'
                    ])}
                    >
                    {price.change}
                    </p>
                    )}
                    </>
                    )}
                    </div> */}
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        {coinGroup.chains?.map(record => (
          <GroupCoinList {...record} />
        ))}
      </div>
    </div>
  )
}

export function GroupCoinList(props: TokenRecord) {
  const { chainId, symbol, logoURI, contractAddress, uuid, prettyBalance, testnet, decimals, balance } = props
  const [sendModal, setSendModal] = useState(false)

  function closeModal() {
    setSendModal(false)
  }

  return (
    <Fragment>
      <div className="flex items-center gap-3 relative trasition-all">
        <CoinIcon logoURI={logoURI} chainId={chainId} contractType={'GROUP'} size="md" />
        <div className="flex flex-col gap-1">
          <CoinChains chains={props} size="xs" showIcon={false} />
          <CoinBalance balance={prettyBalance} symbol={symbol} />
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
          <Button
            variant="primary"
            shape="square"
            leftIcon={SendIcon}
            label="Send"
            onClick={() => {
              setSendModal(true)
            }}
          ></Button>
        </div>
      </div>
      {sendModal ? (
        <SendTokens
          close={closeModal}
          chainId={props.chainId}
          contractAddress={props.contractAddress}
          tokenId={'0'}
        />
      ) : null}
    </Fragment>
  )
}
