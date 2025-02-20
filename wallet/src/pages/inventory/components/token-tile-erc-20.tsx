import { TokenImage } from '@0xsequence/design-system'
import { TokenTile } from './token-tile'
import { TokenBalance } from '@0xsequence/indexer'
import { formatUnits } from 'ethers'
import { formatDisplay, limitDecimals } from '../../../utils/helpers'

export function TokenTileErc20(props: TokenBalance) {
  const { chainId, balance, contractInfo, contractAddress, tokenID } = props

  return (
    <TokenTile
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="erc20"
      className="p-4 flex flex-col items-start gap-3"
    >
      {contractInfo?.logoURI ? (
        <TokenImage src={contractInfo.logoURI} size="lg" withNetwork={chainId} />
      ) : null}
      <div className="flex flex-col flex-1 justify-end items-start">
        {contractInfo?.decimals && contractInfo?.symbol ? (
          <div className="text-start leading-[0]">
            <span className="text-style-lg font-bold ">
              {limitDecimals(formatDisplay(formatUnits(balance, contractInfo.decimals)), 4)}
            </span>{' '}
            <span className="text-style-sm">{contractInfo.symbol}</span>
          </div>
        ) : null}
      </div>
    </TokenTile>
  )
}
