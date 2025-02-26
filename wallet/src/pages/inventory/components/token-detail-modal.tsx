import {
  NetworkImage,
  Modal,
  Image,
  TokenImage,
  Collapsible,
  nativeTokenImageUrl,
  cn,
  Button
} from '@0xsequence/design-system'
import { SendIcon } from '../../../design-system-patch/icons'
import { useInventory } from '../helpers/use-inventory'
import { TokenTileProps, TokenTypeProps } from '../types'
import { formatDisplay } from '../../../utils/helpers'
import { formatUnits } from 'ethers'
import { useCoinPrices } from '../../../hooks/useCoinPrices'
import { WrappedCollapse } from '../../../components/wrapped-collapse'
import { THEME } from '../../../utils/theme'

export function TokenDetailModal() {
  const { showInventoryItem, setShowInventoryItem, contractInfo } = useInventory()

  if (!showInventoryItem) {
    return null
  }

  const item = contractInfo(showInventoryItem)

  return (
    <>
      {item && (
        <Modal scroll={false} autoHeight onClose={() => setShowInventoryItem(false)}>
          <TokenDetails item={item} />
        </Modal>
      )}
    </>
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

  const { setShowSendModal } = useInventory()
  const { balance, contractAddress, tokenMetadata, chainId, chain, contractInfo } = props
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
        className="py-8 h-[240px] [background-image:var(--background)] bg-background-secondary bg-cover bg-center rounded-sm"
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
        <div className="grid justify-items-start gap-2 ">
          <span className=" text-xs font-bold">Balance</span>
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
        <span className="text-xl font-bold">{tokenMetadata?.name}</span>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button
          variant="primary"
          className="rounded-md flex items-center justify-center gap-2 text-sm font-bold p-4 cursor-pointer"
          onClick={() => setShowSendModal(true)}
        >
          <SendIcon />
          Send
        </Button>
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

  const { setShowSendModal } = useInventory()
  const { tokenMetadata, chainId, chain } = props

  return (
    <div className="w-full flex flex-col  p-6">
      <div
        className="flex items-center justify-center h-[300px] [background-image:var(--background)] bg-background-secondary bg-cover bg-center rounded-sm"
        style={style}
      >
        <Image src={tokenMetadata?.image} className="max-w-[300px] aspect-square" />
      </div>
      <div className="p-6 flex flex-col gap-1 text-center justify-center">
        <span className="text-xl font-bold">{tokenMetadata?.name}</span>
        <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-background-secondary px-1.25 py-1 rounded-xs">
          <NetworkImage chainId={chainId} size="xs" /> {chain?.title}
        </span>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button
          variant="primary"
          className="rounded-md flex items-center justify-center gap-2 text-sm font-bold p-4 cursor-pointer"
          onClick={() => setShowSendModal(true)}
        >
          <SendIcon />
          Send
        </Button>

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
