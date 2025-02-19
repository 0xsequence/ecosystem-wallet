import { TokenTile } from './token-tile'
import { NetworkImage } from '@0xsequence/design-system'
import { formatUnits } from 'ethers'

import type { TokenTileProps } from '../types'
import { formatDisplay } from '../../../utils/helpers'

export function TokenTileNativeBalance(
  props: TokenTileProps
) {
  const { chain, chainId, title, balance } = props
  const contractAddress = ''
  const tokenID = ''
  const { symbol = '', decimals = 18 } = chain?.nativeToken || {}

  return (
    <TokenTile
      contractAddress={contractAddress}
      tokenId={tokenID}
      className="p-4 flex flex-col items-start gap-3"
    >
      <NetworkImage chainId={chainId} size="lg" />
      <div className="flex flex-col flex-1 justify-end items-start">
        <span className="text-style-normal font-bold text-seq-grey-500">{title}</span>
        <div>
          <span className="text-style-lg font-bold">{formatDisplay(formatUnits(balance, decimals))}</span>{' '}
          <span className="text-style-sm">{symbol}</span>
        </div>
      </div>
    </TokenTile>
  )
}
