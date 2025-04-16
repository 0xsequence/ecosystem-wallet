import { Link, useLocation, useParams } from 'react-router'

import { HeartIcon, SendIcon } from '../../design-system-patch/icons'
import { useInventory } from '../../hooks/use-inventory'
import { TokenRecord } from './types'
import { formatDisplay, truncateAtMiddle } from '../../utils/helpers'
import { useCoinPrices } from '../../hooks/useCoinPrices'
import { WrappedCollapse } from '../../components/wrapped-collapse'
import { THEME } from '../../utils/theme'
import { CopyButton } from '../../components/CopyButton'

import {
  NetworkImage,
  Image,
  Text,
  TokenImage,
  Collapsible,
  nativeTokenImageUrl,
  cn,
  useMediaQuery,
  ExpandIcon,
  Button
} from '@0xsequence/design-system'
import { formatUnits } from 'ethers'
import { zeroAddress } from 'viem'
import { useFavoriteTokens } from '../../hooks/useFavoriteTokens'
// import { SendTokens } from './components/SendTokens'
import { TOKEN_TYPES } from '../../utils/normalize-balances'
import { useFetchInventory } from './helpers/useFetchInventory'
import { CONTRACT_TYPES } from './constants'
import { SendTokens } from './components/SendTokens'
import { createContext, useContext, useState } from 'react'
import { ChainId } from '@0xsequence/network'

interface TokenContext {
  sendModal: boolean
  setSendModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const TokenContext = createContext<TokenContext | null>(null)
export function useTokenContext() {
  const context = useContext(TokenContext)
  if (!context) throw new Error('useTokenContext must be used within a TokenContext Provider')
  return context
}

export function InventoryTokenRoute() {
  const { chainId, contractAddress, tokenId } = useParams()

  const query = useFetchInventory()
  const [sendModal, setSendModal] = useState(false)

  // Get the token from the inventory
  const inventory = useInventory(query?.data, {
    filter: { uuid: `${chainId}::${contractAddress}::${tokenId}` }
  })

  const item = inventory.records?.[0]
  if (!item) return null

  return (
    <TokenContext.Provider value={{ sendModal, setSendModal }}>
      <div className="w-full max-w-screen-lg mx-auto">
        <TokenDetails item={item} />
        {sendModal && chainId && contractAddress && tokenId ? (
          <SendTokens
            chainId={chainId as unknown as ChainId}
            contractAddress={contractAddress}
            tokenId={tokenId}
            close={() => setSendModal(false)}
          />
        ) : null}
      </div>
    </TokenContext.Provider>
    //SendTokens
  )
}

function TokenDetails({ item }: { item: TokenRecord }) {
  if (item.type === TOKEN_TYPES.COIN) {
    return <CoinDetails {...item} />
  } else if (item.type === TOKEN_TYPES.COLLECTIBLE) {
    return <TokenDetailsCollectable {...item} />
  }
  return null
}

function useCoinFiatPrice(chainId: number, contractAddress: string, balance: string, decimals?: number) {
  const units = formatUnits(balance, decimals)

  const { data = [], isPending } = useCoinPrices([
    {
      chainId,
      contractAddress
    }
  ])

  const { price, price24hChange } = data[0] || {}
  const value = price
    ? `${formatDisplay(price.value * Number(units), {
        disableScientificNotation: true,
        significantDigits: 2,
        maximumFractionDigits: 3,
        currency: 'USD'
      })}`
    : ''
  const change = price24hChange
    ? `${price24hChange.value > 0 ? '+' : ''}${formatDisplay(price24hChange.value, {
        disableScientificNotation: true,
        significantDigits: 2
      })}%`
    : ''

  return { isPending, value, change }
}

function CoinDetails(props: TokenRecord) {
  const style = {
    ...(THEME.appBackground && { '--background': `url(${THEME.appBackground})` })
  } as React.CSSProperties

  const isMobile = useMediaQuery('isMobile')

  // const { setShowSendModal, setShowInventoryItem } = useInventory()
  const { setSendModal } = useTokenContext()
  const { balance, contractAddress, tokenMetadata, chainInfo, chainId, contractInfo, uuid } = props

  const logoURI = contractInfo?.logoURI || nativeTokenImageUrl(props.chainId)
  const { symbol = chainInfo?.nativeToken?.symbol || '', decimals = chainInfo?.nativeToken?.decimals || 18 } =
    {
      symbol: contractInfo?.symbol,
      decimals: contractInfo?.decimals
    }
  const units = formatUnits(balance || '', decimals)
  const diplayedBalance = formatDisplay(units)

  const price = useCoinFiatPrice(chainId, contractAddress, balance || '', decimals)

  return (
    <div className="w-full flex flex-col gap-6  ">
      <div
        className={`[background-image:var(--background)] bg-background-secondary bg-center rounded-sm  ${
          THEME.backgroundMode === 'tile' ? 'bg-repeat' : 'bg-cover bg-no-repeat'
        }`}
        style={style}
      >
        <div className="w-full flex flex-col items-center justify-center py-12 gap-3">
          <TokenImage src={logoURI} size="xl" withNetwork={chainId} />
          <>
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
          </>
          <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-button-glass px-1.25 py-1 rounded-xs">
            <NetworkImage chainId={chainId} size="xs" /> {chainInfo?.title}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-center justify-center">
        <div className="flex flex-col gap-3">
          <div className="grid justify-items-start gap-2">
            <span className="text-xs font-bold">Balance</span>
            <div className="w-full flex items-center gap-2">
              <TokenImage className="h-7 w-7" src={logoURI} size="xl" withNetwork={chainId} />
              <p className="flex-1 text-start text-style-lg font-bold">
                {diplayedBalance} {symbol}
              </p>
              {price.isPending ? (
                <div className="h-6 w-24 bg-black/5 rounded animate-pulse" />
              ) : (
                price.value && <p className="text-style-sm font-bold text-seq-grey-500">{price.value}</p>
              )}
            </div>
          </div>
          {contractAddress !== zeroAddress && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-left">Contract Address</span>
              <div className="flex gap-2 text-left">
                <p className="font-mono text-sm text-seq-grey-500">
                  {isMobile ? truncateAtMiddle(contractAddress, 25) : contractAddress}
                </p>
                <CopyButton text={contractAddress} />
              </div>
            </div>
          )}
        </div>
        <span className="text-xl font-bold">{tokenMetadata?.name}</span>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            variant="primary"
            shape="square"
            leftIcon={SendIcon}
            label="Send"
            onClick={() => setSendModal(true)}
          ></Button>

          <Favorite id={uuid} />
        </div>

        {contractInfo?.extensions?.description && (
          <Collapsible label="Details">
            <span>{contractInfo?.extensions?.description}</span>
          </Collapsible>
        )}
      </div>
    </div>
  )
}

function TokenDetailsCollectable(props: TokenRecord) {
  const location = useLocation()

  if (location.state && location.state?.modal) {
    return <CollectibleModal {...props} />
  }

  return <CollectiblePageView {...props} />
}

function CollectiblePageView(props: TokenRecord) {
  const style = {
    ...(THEME.appBackground && { '--background': `url(${THEME.appBackground})` })
  } as React.CSSProperties

  const { tokenMetadata, chainId, chainInfo, balance, contractType, contractAddress, uuid } = props
  const { setSendModal } = useTokenContext()
  const hasBalance = contractType === CONTRACT_TYPES.ERC1155 && balance
  return (
    <div className="w-full flex flex-col px-6 py-24">
      <div
        className={`flex items-center justify-center h-[300px] [background-image:var(--background)] bg-background-secondary bg-center rounded-sm ${
          THEME.backgroundMode === 'tile' ? 'bg-repeat' : 'bg-cover bg-no-repeat'
        }`}
        style={style}
      >
        <Image src={tokenMetadata?.image} className="size-full object-contain" />
      </div>
      <div className="pt-4 pb-6 w-full flex flex-col gap-1 items-center">
        <span className="text-3xl font-bold w-full">{tokenMetadata?.name}</span>
        <div className="flex flex-col w-full gap-3">
          <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-background-secondary px-1.25 py-1 rounded-xs">
            <NetworkImage chainId={chainId} size="xs" /> {chainInfo?.title}
          </span>
          {hasBalance ? (
            <div className="grid justify-items-start gap-2">
              <span className="text-xs font-bold">Balance</span>
              <div className="w-full flex items-center gap-2">
                <p className="flex-1 text-start text-style-lg font-bold">{balance?.toString() || '0'}</p>
              </div>
            </div>
          ) : null}

          {contractAddress && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-left">Contract Address</span>
              <div className="flex gap-2 text-left">
                <p className="font-mono text-sm text-seq-grey-500">
                  <Text variant="small" color="primary" className="md:hidden">
                    {truncateAtMiddle(contractAddress, 25)}
                  </Text>
                  <Text variant="small" color="primary" className="hidden md:inline">
                    {contractAddress}
                  </Text>
                </p>
                <CopyButton text={contractAddress} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            variant="primary"
            shape="square"
            leftIcon={SendIcon}
            label="Send"
            onClick={() => {
              setSendModal(true)
            }}
          ></Button>
          <Favorite id={uuid} />
        </div>

        {tokenMetadata?.description && (
          <Collapsible label="Details">
            <span className="text-seq-grey-500 text-xs font-bold">{tokenMetadata?.description}</span>
          </Collapsible>
        )}
      </div>
    </div>
  )
}

function CollectibleModal(props: TokenRecord) {
  const style = {
    ...(THEME.appBackground && { '--background': `url(${THEME.appBackground})` })
  } as React.CSSProperties

  const location = useLocation()

  const isMobile = useMediaQuery('isMobile')
  const { setSendModal } = useTokenContext()
  // const { setShowSendModal, setShowInventoryItem } = useInventory()
  const { tokenMetadata, chainId, balance, contractType, chainInfo, contractAddress, uuid } = props
  const isERC1155 = contractType === 'ERC1155'
  return (
    <div className="w-full flex flex-col p-6">
      <Link to={location.pathname}>
        <ExpandIcon />
      </Link>
      <div
        className={`flex items-center justify-center h-[300px] [background-image:var(--background)] bg-background-secondary bg-center rounded-sm ${
          THEME.backgroundMode === 'tile' ? 'bg-repeat' : 'bg-cover bg-no-repeat'
        }`}
        style={style}
      >
        <Image src={tokenMetadata?.image} className="size-full object-contain" />
      </div>
      <div className="pt-4 pb-6 w-full flex flex-col gap-1 items-center">
        <span className="text-xl font-bold">{tokenMetadata?.name}</span>
        <div className="flex flex-col w-full gap-3">
          <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-background-secondary px-1.25 py-1 rounded-xs">
            <NetworkImage chainId={chainId} size="xs" /> {chainInfo?.title}
          </span>
          {isERC1155 && balance && (
            <div className="grid justify-items-start gap-2">
              <span className="text-xs font-bold">Balance</span>
              <div className="w-full flex items-center gap-2">
                <p className="flex-1 text-start text-style-lg font-bold">{balance?.toString() || '0'}</p>
              </div>
            </div>
          )}
          {contractAddress && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-left">Contract Address</span>
              <div className="flex gap-2 text-left">
                <p className="font-mono text-sm text-seq-grey-500">
                  {isMobile ? truncateAtMiddle(contractAddress, 25) : contractAddress}
                </p>
                <CopyButton text={contractAddress} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            variant="primary"
            shape="square"
            leftIcon={SendIcon}
            label="Send"
            onClick={() => {
              setSendModal(true)
              // setShowSendModal(true)
              // setShowInventoryItem({
              //   chainId,
              //   contractAddress,
              //   tokenId: tokenMetadata?.tokenId,
              //   tokenClass: props.tokenClass
              // })
            }}
          ></Button>
          <Favorite id={uuid} />
        </div>

        {tokenMetadata?.description && (
          <WrappedCollapse>
            <Collapsible label="Details">
              <span className="text-seq-grey-500 text-xs font-bold">{tokenMetadata?.description}</span>
            </Collapsible>
          </WrappedCollapse>
        )}
      </div>
    </div>
  )
}

function Favorite({ id }: { id: string }) {
  const { has, toggle } = useFavoriteTokens()

  return (
    <Button
      variant="raised"
      shape="square"
      leftIcon={HeartIcon}
      label={has(id) ? 'Remove' : 'Favorite'}
      onClick={() => toggle(id)}
    ></Button>
  )

  // return (

  //   <button
  //     type="button"
  //     onClick={
  //     className="bg-button-glass rounded-md items-center justify-center gap-2 text-sm font-bold p-4 cursor-pointer grid grid-cols-1 grid-rows-1 [&>span]:col-start-1 [&>span]:row-start-1 hover:opacity-80 focus-visible:opacity-80 transition-all"
  //   >
  //     <span
  //       className="flex gap-2 inert:-translate-y-4 inert:opacity-0 transition-all items-center justify-center"
  //       {...inert(has(id))}
  //     >
  //       <HeartIcon />
  //       Favorite
  //     </span>
  //     <span
  //       className="flex gap-2 inert:translate-y-4 inert:opacity-0 transition-all items-center justify-center"
  //       {...inert(!has(id))}
  //     >
  //       <HeartIcon />
  //       Remove
  //     </span>
  //   </button>
  // )
}
