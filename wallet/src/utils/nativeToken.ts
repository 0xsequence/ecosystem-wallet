import { nativeTokenImageUrl } from '@0xsequence/design-system'
import { ChainId, networks } from '@0xsequence/network'

export function useNativeToken(chainId: number) {
  const { nativeToken, blockExplorer } = networks[chainId as ChainId]
  return {
    logoURI: nativeTokenImageUrl(chainId),
    symbol: nativeToken.symbol,
    decimals: nativeToken.decimals,
    blockExplorerUrl: blockExplorer?.rootUrl,
    blockExplorerName: blockExplorer?.name
  }
}
