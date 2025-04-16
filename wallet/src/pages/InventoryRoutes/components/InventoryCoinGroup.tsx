import { TokenListItem } from './TokenTile'
import { NetworkImage, Text, TokenImage } from '@0xsequence/design-system'
import { formatUnits } from 'ethers'

import type { TokenGroupRecord } from '../types'
import { formatDisplay, limitDecimals } from '../../../utils/helpers'
import { inert } from '../../../utils/inert'
import { useLocalStore } from '../../../utils/local-store'
import { useFavoriteTokens } from '../../../hooks/useFavoriteTokens'
import SvgHeartIcon from '../../../design-system-patch/icons/HeartIcon'
import { CoinIcon } from './partials/coin-icon'
import { CoinBalance } from './partials/coin-balance'
import { CoinChains } from './partials/coin-chains'
import { FavoriteBadge } from './partials/favorite-badge'
import { TestnetBadge } from './partials/testnet-badge'
// import { CoinFiatValue } from './partials/coin-fiat-value'
import { Link, useLocation } from 'react-router'
import { ROUTES } from '../../../routes'

export function InventoryCoinGroup(props: TokenGroupRecord) {
  const { balance, decimals, symbol, imageUrl, chains, path } = props
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')
  const { has } = useFavoriteTokens()
  const uuid = ''
  const isFavorite = has(uuid)

  // const [expanded, setExpanded] = useState(false)

  const { pathname } = useLocation()

  return (
    <>
      <Link
        to={`${ROUTES.INVENTORY}${path}`}
        state={{ modal: true, referer: pathname }}
        className="aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:opacity-80 focus:opacity-80 transition-transform relative p-4 sm:p-6 flex flex-col items-start gap-3"
      >
        {/* <button
        type="button"
        onClick={() => setExpanded(current => !current)}
        className="aspect-square rounded-md overflow-clip bg-background-secondary backdrop-blur-2xl cursor-pointer hover:opacity-80 focus:opacity-80 transition-transform relative p-4 sm:p-6 flex flex-col items-start gap-3 data-[expanded]:grayscale data-[expanded]:opacity-20 "
        data-expanded={expanded || undefined}
      > */}
        {props.testnet ? (
          <span className="rounded-full inline-flex px-1.5 py-0.5 bg-background-contrast absolute top-2 right-2">
            <Text variant="xsmall" color="muted">
              Testnet
            </Text>
          </span>
        ) : null}
        <>
          {isFavorite ? (
            <div className="flex items-center justify-center absolute bottom-4 right-4 bg-button-glass p-2 rounded-full backdrop-blur-2xl">
              <SvgHeartIcon />
            </div>
          ) : null}
        </>
        <div className="w-[50%] max-w-20">
          <TokenImage src={imageUrl} size="xl" className="size-full bg-button-glass rounded-full" />
        </div>
        <div className="flex flex-col flex-1 justify-end items-start text-start gap-3">
          <span className="grid grid-cols-1 grid-rows-1 transition-all items-start justify-content-start text-md sm:text-lg font-bold text-start leading-[0] [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="transition-all inert:translate-y-4 inert:scale-90 inert:opacity-0"
              {...inert(prefs?.hideBalance)}
            >
              {limitDecimals(formatDisplay(formatUnits(balance || '', decimals)), 5)}
              {' '}

              <Text variant="normal" color="primary">
                {symbol}
              </Text>
            </span>
            <span
              className="transition-all inert:-translate-y-4 inert:scale-90 inert:opacity-0"
              {...inert(!prefs?.hideBalance)}
            >
              •••{' '}
              <Text variant="normal" color="primary">
                {symbol}
              </Text>
            </span>
          </span>
          {chains.length ? (
            <div className="flex items-center gap-0.75">
              {chains.map(chain => (
                <NetworkImage chainId={chain.chainId} size="sm" key={chain.chainId} />
              ))}
              {chains.length === 1 ? (
                <Text variant="small" color="secondary" className="ml-1 leading-[1.05]">
                  {chains[0]?.chainInfo?.title}
                </Text>
              ) : null}
            </div>
          ) : null}
        </div>
        {/* </button> */}
      </Link>

      {/* <Transition show={expanded}>
        <div className="grid-cols-subgrid grid col-span-3 transition duration-300 ease-in data-[closed]:opacity-0">
          {chains?.map(coin => (
            <InventoryCoinTile {...coin} key={coin.uuid} />
          ))}
        </div>
      </Transition> */}
    </>
  )
}

export function InventoryCoinGroupList(props: TokenGroupRecord) {
  const {
    // chainId,
    // contractAddress,
    path,
    contractType,
    uuid,
    prettyBalance,
    testnet,
    // balance,
    chains,
    symbol,
    logoURI
    // decimals
  } = props

  return (
    <TokenListItem path={path} className="p-4 sm:py-3 px-4 flex items-center gap-3 relative trasition-all">
      <CoinIcon logoURI={logoURI} contractType={contractType} size="md" />
      <div className="flex flex-col gap-1">
        <CoinBalance balance={prettyBalance} symbol={symbol} />
        {chains ? <CoinChains chains={chains} size="xs" /> : null}
      </div>

      <div className="flex gap-4 ml-auto mr-0">
        <FavoriteBadge id={uuid} />
        {testnet ? (
          <TestnetBadge isTestnet={true} />
        ) : null
        // <CoinFiatValue
        //   chainId={chainId}
        //   contractAddress={contractAddress}
        //   balance={balance || '0'}
        //   decimals={decimals}
        // />
        }
      </div>
    </TokenListItem>
  )
}
