import { TokenImage } from '@0xsequence/design-system'
import { TokenTile } from './token-tile'
import { TokenBalance } from '@0xsequence/indexer'
import { formatUnits } from 'ethers'
import { formatDisplay } from '../../../utils/helpers'

export function TokenTileErc20(props: TokenBalance) {
  const { chainId, balance, contractInfo, contractAddress, tokenID } = props

  return (
    <TokenTile
      contractAddress={contractAddress}
      tokenId={tokenID}
      className="p-4 flex flex-col items-start gap-3"
    >
      {contractInfo?.logoURI ? (
        <TokenImage src={contractInfo.logoURI} size="lg" withNetwork={chainId} />
      ) : null}
      <div className="flex flex-col flex-1 justify-end">
        {contractInfo?.decimals && contractInfo?.symbol ? (
          <div>
            <span className="text-style-lg font-bold">{formatDisplay(formatUnits(balance, contractInfo.decimals))}</span>{' '}
            <span className="text-style-sm">{contractInfo.symbol}</span>
          </div>
        ) : null}
      </div>
    </TokenTile>
  )
}
