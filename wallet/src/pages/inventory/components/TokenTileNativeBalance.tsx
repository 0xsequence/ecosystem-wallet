import { TokenListItem, TokenTile } from './TokenTile'
import { nativeTokenImageUrl, TokenImage } from '@0xsequence/design-system'
import { formatUnits } from 'ethers'

import type { TokenTileProps } from '../types'
import { formatDisplay, limitDecimals } from '../../../utils/helpers'

export function TokenTileNativeBalance(props: TokenTileProps) {
  const { chainId, title, balance, nativeToken } = props
  const contractAddress = ''
  const tokenID = ''
  const { symbol = '', decimals = 18 } = nativeToken || {}

  return (
    <TokenTile
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="nativeBalance"
      className="p-4 sm:p-6 flex flex-col items-start gap-3"
    >
      <div className="w-[50%] max-w-20">
        <TokenImage
          src={nativeTokenImageUrl(chainId, 'lg')}
          size="xl"
          className="size-full bg-button-glass rounded-full"
          withNetwork={chainId}
        />
      </div>
      <div className="flex flex-col flex-1 justify-end items-start text-start">
        <span className="text-xs sm:text-sm font-bold text-seq-grey-500 leading-tight text-start">
          {title}
        </span>
        <span className="leading-tight text-md sm:text-lg font-bold">
          {limitDecimals(formatDisplay(formatUnits(balance, decimals)), 5)}
          {' '}
          <span className="text-sm font-normal">{symbol}</span>
        </span>
      </div>
    </TokenTile>
  )
}

export function TokenListItemNativeBalance(props: TokenTileProps) {
  const { chainId, title, balance, nativeToken } = props
  const contractAddress = ''
  const tokenID = ''
  const { symbol = '', decimals = 18 } = nativeToken || {}

  return (
    <TokenListItem
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="nativeBalance"
      className="p-4 sm:p-6 flex items-center gap-3"
    >
      <div className="size-10">
        <TokenImage
          src={nativeTokenImageUrl(chainId, 'lg')}
          size="xl"
          className="size-full bg-button-glass rounded-full"
          withNetwork={chainId}
        />
      </div>
      <div className="flex flex-col flex-1 justify-end items-start text-start">
        <span className="text-xs sm:text-sm font-bold text-seq-grey-500 leading-tight text-start">
          {title}
        </span>
        <span className="leading-tight text-md sm:text-lg font-bold">
          {limitDecimals(formatDisplay(formatUnits(balance, decimals)), 5)}
          {' '}
          <span className="text-sm font-normal">{symbol}</span>
        </span>
      </div>
    </TokenListItem>
  )
}
