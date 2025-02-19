import { TokenBalance } from '@0xsequence/indexer'
import { TokenTile } from './token-tile'
import { Image } from '@0xsequence/design-system'

export function TokenTileCollectable(props: TokenBalance) {
  const { chainId, tokenMetadata, contractAddress, tokenID } = props

  return (
    <TokenTile chainId={chainId} contractAddress={contractAddress} tokenClass="collectable" tokenId={tokenID}>
      <Image src={tokenMetadata?.image} />
    </TokenTile>
  )
}
