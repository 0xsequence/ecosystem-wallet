import { NetworkImage, Skeleton, TokenImage } from '@0xsequence/design-system'
import { ethers } from 'ethers'

import { formatDisplay } from '../utils/helpers'

import { useConfig } from '../hooks/useConfig'

import { CollectibleTileImage } from './CollectibleTileImage'

interface SendItemInfoProps {
  name: string
  symbol: string
  decimals: number
  balance: string
  imageUrl?: string
  fiatValue?: string
  chainId: number
  showSquareImage?: boolean
}

export const SendItemInfoSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <Skeleton style={{ width: 30, height: 30 }} borderRadius="circle" />
        <div className="flex flex-col gap-2 items-start">
          <Skeleton style={{ width: 100, height: 14 }} />
          <Skeleton style={{ width: 75, height: 14 }} />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Skeleton style={{ width: 100, height: 14 }} />
        <Skeleton style={{ width: 50, height: 12 }} />
      </div>
    </div>
  )
}

export const SendItemInfo = ({
  imageUrl,
  name,
  decimals,
  balance,
  symbol,
  fiatValue,
  chainId,
  showSquareImage
}: SendItemInfoProps) => {
  const { fiatCurrency } = useConfig()
  const formattedBalance = ethers.formatUnits(balance, decimals)
  const balanceDisplayed = formatDisplay(formattedBalance)

  return (
    <div className="flex items-end justify-between">
      <div className="flex items-start justify-between gap-3">
        {showSquareImage ? (
          <div className="w-12 flex-shrink-0">
            <CollectibleTileImage imageUrl={imageUrl} />
          </div>
        ) : (
          <TokenImage src={imageUrl} size="lg" />
        )}
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-start gap-1">
            <span className="font-medium ">{name}</span>
          </div>

          <span className=" text-sm inline-flex gap-1 items-center">
            <NetworkImage chainId={chainId} size="xs" />
            {`${balanceDisplayed} ${symbol} available`}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        {fiatValue && <span className="">{`${fiatCurrency.sign}${fiatValue}`}</span>}
      </div>
    </div>
  )
}
