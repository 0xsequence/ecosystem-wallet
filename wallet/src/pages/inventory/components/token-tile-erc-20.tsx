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
      className="p-4 sm:p-8 flex flex-col items-start gap-3"
    >
      {contractInfo?.logoURI ? (
        <div className="w-[50%] max-w-20">
          <TokenImage src={contractInfo.logoURI} size="xl" className="size-full" withNetwork={chainId} />
        </div>
      ) : null}
      <div className="flex flex-col flex-1 justify-end items-start">
        {contractInfo?.decimals && contractInfo?.symbol ? (
          <span className="text-md sm:text-lg font-bold text-start leading-[0]">
            {limitDecimals(formatDisplay(formatUnits(balance, contractInfo.decimals)), 4)}
            {' '}

            <span className="text-sm font-normal">{contractInfo.symbol}</span>
          </span>
        ) : null}
      </div>
    </TokenTile>
  )
}
