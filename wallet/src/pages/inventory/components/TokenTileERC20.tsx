import { TokenImage } from '@0xsequence/design-system'
import { TokenListItem, TokenTile } from './TokenTile'
import { TokenBalance } from '@0xsequence/indexer'
import { formatUnits } from 'ethers'
import { formatDisplay, limitDecimals } from '../../../utils/helpers'
import { useLocalStore } from '../../../utils/local-store'
import { inert } from '../../../utils/inert'

export function TokenTileErc20(props: TokenBalance & { chain: { title: string } }) {
  const { chainId, balance, contractInfo, contractAddress, tokenID, chain } = props

  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')
  return (
    <TokenTile
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="erc20"
      className="p-4 sm:p-6 flex flex-col items-start gap-3"
    >
      {contractInfo?.logoURI ? (
        <div className="w-[50%] max-w-20">
          <TokenImage
            src={contractInfo.logoURI}
            size="xl"
            className="size-full bg-button-glass rounded-full"
            withNetwork={chainId}
          />
        </div>
      ) : null}

      <div className="flex flex-col flex-1 justify-end items-start text-start">
        <span className="text-xs sm:text-sm font-medium text-seq-grey-500 leading-tight text-start mb-0.5">
          {chain.title}
        </span>
        {contractInfo?.decimals && contractInfo?.symbol ? (
          <span className="grid grid-cols-1 grid-rows-1 transition-all items-start justify-content-start text-md sm:text-lg font-bold text-start leading-[0] [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="transition-all data-[inert]:translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0"
              {...inert(prefs?.hideBalance)}
            >
              {limitDecimals(formatDisplay(formatUnits(balance, contractInfo.decimals)), 4)}
              {' '}
              <span className="text-sm font-normal">{contractInfo.symbol}</span>
            </span>
            <span
              className="transition-all data-[inert]:-translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0"
              {...inert(!prefs?.hideBalance)}
            >
              •••{' '}
              <span className="text-sm font-normal">{contractInfo.symbol}</span>
            </span>
          </span>
        ) : null}
      </div>
    </TokenTile>
  )
}

export function TokenListItemErc20(props: TokenBalance & { chain: { title: string } }) {
  const { chainId, balance, contractInfo, contractAddress, tokenID, chain } = props
  const [prefs] = useLocalStore<{ hideBalance: boolean }>('userPrefs')

  return (
    <TokenListItem
      chainId={chainId}
      contractAddress={contractAddress}
      tokenId={tokenID}
      tokenClass="erc20"
      className="p-4 sm:p-6 flex items-center gap-3"
    >
      {contractInfo?.logoURI ? (
        <div className="size-10">
          <TokenImage
            src={contractInfo.logoURI}
            size="xl"
            className="size-full bg-button-glass rounded-full"
            withNetwork={chainId}
          />
        </div>
      ) : null}
      <div className="flex flex-col flex-1 justify-end items-start">
        <span className="text-xs sm:text-sm font-medium text-seq-grey-500 leading-tight text-start mb-0.5">
          {chain.title}
        </span>
        {contractInfo?.decimals && contractInfo?.symbol ? (
          <span className="grid grid-cols-1 grid-rows-1 transition-all items-start justify-content-start text-md sm:text-lg font-bold text-start leading-[0] [&>span]:col-start-1 [&>span]:row-start-1">
            <span
              className="transition-all data-[inert]:translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0"
              {...inert(prefs?.hideBalance)}
            >
              {limitDecimals(formatDisplay(formatUnits(balance, contractInfo.decimals)), 4)}
              {' '}
              <span className="text-sm font-normal">{contractInfo.symbol}</span>
            </span>
            <span
              className="transition-all data-[inert]:-translate-y-4 data-[inert]:scale-90 data-[inert]:opacity-0"
              {...inert(!prefs?.hideBalance)}
            >
              •••{' '}
              <span className="text-sm font-normal">{contractInfo.symbol}</span>
            </span>
          </span>
        ) : null}
      </div>
    </TokenListItem>
  )
}
