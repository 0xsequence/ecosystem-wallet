import { useParams } from 'react-router'

import { HeartIcon, SendIcon } from '../../design-system-patch/icons'
import { useInventory } from './helpers/useInventory'
import { TokenTileProps, TokenTypeProps } from './types'
import { formatDisplay, truncateAtMiddle } from '../../utils/helpers'
import { useCoinPrices } from '../../hooks/useCoinPrices'
import { WrappedCollapse } from '../../components/wrapped-collapse'
import { THEME } from '../../utils/theme'
import { CopyButton } from '../../components/CopyButton'

import {
  NetworkImage,
  Image,
  TokenImage,
  Collapsible,
  nativeTokenImageUrl,
  cn,
  useMediaQuery
} from '@0xsequence/design-system'
import { formatUnits } from 'ethers'
import { zeroAddress } from 'viem'
import { useFavoriteTokens } from '../../hooks/useFavoriteTokens'
import { inert } from '../../utils/inert'

export function InventoryTokenRoute() {
  const { contractInfo } = useInventory()
  const { chainId, contractAddress, tokenId } = useParams()

  if (!chainId || !contractAddress || !tokenId) {
    return null
  }

  const item = contractInfo({ chainId, contractAddress, tokenId })

  console.log(item)

  if (!item) return null

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <TokenDetails item={item} />
    </div>
  )
}

function TokenDetails({ item }: { item: TokenTypeProps }) {
  if (!item) {
    return null
  }

  // Implementation
  switch (item?.tokenClass) {
    case 'nativeBalance':
    case 'erc20':
      return <CoinDetails {...item} />
    case 'collectable':
      return <TokenDetailsCollectable {...item} />
    default:
      return null
  }
}

function CoinDetails(props: TokenTypeProps) {
  const style = {
    ...(THEME.appBackground && { '--background': `url(${THEME.appBackground})` })
  } as React.CSSProperties

  const isMobile = useMediaQuery('isMobile')

  const { setShowSendModal } = useInventory()
  const { balance, contractAddress, tokenMetadata, chainId, chain, contractInfo, uuid } = props
  const logoURI = contractInfo?.logoURI || nativeTokenImageUrl(props.chainId)
  const { symbol = chain?.nativeToken?.symbol || '', decimals = chain?.nativeToken?.decimals || 18 } = {
    symbol: contractInfo?.symbol,
    decimals: contractInfo?.decimals
  }
  const units = formatUnits(balance, decimals)
  const diplayedBalance = formatDisplay(units)

  const { data = [], isPending } = useCoinPrices([
    {
      chainId,
      contractAddress
    }
  ])

  const { price, price24hChange } = data[0] || {}
  const priceText = price
    ? `$${formatDisplay(price.value * Number(units), {
        disableScientificNotation: true,
        significantDigits: 2,
        maximumFractionDigits: 3
      })}`
    : ''
  const priceChangeText = price24hChange
    ? `${price24hChange.value > 0 ? '+' : ''}${formatDisplay(price24hChange.value, {
        disableScientificNotation: true,
        significantDigits: 2
      })}%`
    : ''

  return (
    <div className="w-full flex flex-col gap-6 p-6 ">
      <div
        className={`py-8 h-[240px] [background-image:var(--background)] bg-background-secondary bg-center rounded-sm  ${
          THEME.backgroundMode === 'tile' ? 'bg-repeat' : 'bg-cover bg-no-repeat'
        }`}
        style={style}
      >
        <div className="grid gap-2 place-items-center">
          <TokenImage src={logoURI} size="xl" withNetwork={chainId} />
          <div className="flex-1 grid place-items-center">
            {isPending ? (
              <div className="h-[52px] grid place-items-center gap-2">
                <div className="h-7 w-24 bg-black/5 rounded animate-pulse" />
                <div className="h-5 w-16 bg-black/5 rounded animate-pulse" />
              </div>
            ) : (
              <>
                {priceText && <p className="text-style-md font-bold">{priceText}</p>}
                {priceChangeText && (
                  <p
                    className={cn('text-style-sm', [
                      priceChangeText.startsWith('-') ? 'text-red-400' : 'text-green-400'
                    ])}
                  >
                    {priceChangeText}
                  </p>
                )}
              </>
            )}
          </div>
          <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-button-glass px-1.25 py-1 rounded-xs">
            <NetworkImage chainId={chainId} size="xs" /> {chain?.title || props?.title}
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
              {isPending ? (
                <div className="h-6 w-24 bg-black/5 rounded animate-pulse" />
              ) : (
                priceText && <p className="text-style-sm font-bold text-seq-grey-500">{priceText}</p>
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
          <button
            type="button"
            className="bg-gradient-primary rounded-md flex items-center justify-center gap-2 text-sm font-bold p-4 cursor-pointer flex-1"
            onClick={() => setShowSendModal(true)}
          >
            <SendIcon />
            Send
          </button>
          <Favorite id={uuid} />
        </div>

        {contractInfo?.extensions?.description && (
          <WrappedCollapse>
            <Collapsible label="Details">
              <span>{contractInfo?.extensions?.description}</span>
            </Collapsible>
          </WrappedCollapse>
        )}
      </div>
    </div>
  )
}

function TokenDetailsCollectable(props: TokenTileProps) {
  const style = {
    ...(THEME.appBackground && { '--background': `url(${THEME.appBackground})` })
  } as React.CSSProperties

  const isMobile = useMediaQuery('isMobile')

  const { setShowSendModal } = useInventory()
  const { tokenMetadata, chainId, chain, balance, contractType, contractAddress, uuid } = props
  const isERC1155 = contractType === 'ERC1155'

  return (
    <div className="w-full flex flex-col p-6">
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
            <NetworkImage chainId={chainId} size="xs" /> {chain?.title}
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
          <button
            type="button"
            className="bg-gradient-primary rounded-md flex items-center justify-center gap-2 text-sm font-bold p-4 cursor-pointer flex-1"
            onClick={() => setShowSendModal(true)}
          >
            <SendIcon />
            Send
          </button>
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
    <button
      type="button"
      onClick={() => toggle(id)}
      className="bg-button-glass rounded-md items-center justify-center gap-2 text-sm font-bold p-4 cursor-pointer grid grid-cols-1 grid-rows-1 [&>span]:col-start-1 [&>span]:row-start-1"
    >
      <span
        className="flex gap-2 inert:-translate-y-4 inert:opacity-0 transition-all items-center justify-center"
        {...inert(has(id))}
      >
        <HeartIcon />
        Add
      </span>
      <span
        className="flex gap-2 inert:translate-y-4 inert:opacity-0 transition-all items-center justify-center"
        {...inert(!has(id))}
      >
        <HeartIcon />
        Remove
      </span>
    </button>
  )
}
