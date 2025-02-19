import { NetworkImage, Modal, Image, TokenImage } from '@0xsequence/design-system'
import { SendIcon } from '../../../design-system-patch/icons'
import { useInventory } from '../helpers/use-inventory'
import { TokenTileProps, TokenTypeProps } from '../types'

export function TokenDetailModal() {
  const { showInventoryItem, setShowInventoryItem, contractInfo } = useInventory()

  if (!showInventoryItem) {
    return null
  }

  const { contractAddress, tokenId } = showInventoryItem

  const item = contractInfo(contractAddress, tokenId)

  return (
    <>
      {item && (
        <Modal scroll={false} autoHeight onClose={() => setShowInventoryItem(false)} className="bg-white">
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
      return <></> //<TokenTileTokenDetails {...item} />
    case 'collectable':
      return <TokenDetailsCollectable {...item} />
    case 'erc20':
      return <TokenDetailsErc20 {...item} />
    default:
      return null
  }
}

function TokenDetailsErc20(props: TokenTileProps) {
  const style = {
    '--background': `url(${import.meta.env.VITE_PROJECT_BACKGROUND})`
  } as React.CSSProperties

  const { tokenMetadata, tokenID, chainId, chain, contractInfo } = props

  console.log(props)
  return (
    <div className="w-full flex flex-col text-black py-12 px-6">
      <div
        className="flex items-center justify-center h-[300px] [background-image:var(--background)] bg-cover bg-center rounded-sm"
        style={style}
      >
        <TokenImage src={contractInfo?.logoURI} size="xl" withNetwork={chainId} />
      </div>
      <div className="p-6 flex flex-col gap-1 text-center justify-center">
        <span className="text-seq-grey-500 text-xs font-bold">{contractInfo?.extensions?.description}</span>
        <span className="text-xl font-bold">{tokenMetadata?.name}</span>
        <span className="text-seq-grey-500 text-xs font-bold">#{tokenID}</span>
        <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-black/10 px-1.25 py-1 rounded-xs">
          <NetworkImage chainId={chainId} size="xs" /> {chain?.title}
        </span>
      </div>
      <button className="bg-black text-white rounded-full flex items-center justify-center gap-2 text-sm font-bold min-h-[3rem] py-2 px-3">
        <SendIcon />
        Send
      </button>
    </div>
  )
}

function TokenDetailsCollectable(props: TokenTileProps) {
  const style = {
    '--background': `url(${import.meta.env.VITE_PROJECT_BACKGROUND})`
  } as React.CSSProperties

  const { tokenMetadata, tokenID, chainId, chain, contractInfo } = props

  return (
    <div className="w-full flex flex-col text-black py-12 px-6">
      <div
        className="flex items-center justify-center h-[300px] [background-image:var(--background)] bg-cover bg-center rounded-sm"
        style={style}
      >
        <Image src={tokenMetadata?.image} className="max-w-[300px] aspect-square" />
      </div>
      <div className="p-6 flex flex-col gap-1 text-center justify-center">
        <span className="text-seq-grey-500 text-xs font-bold">{contractInfo?.extensions?.description}</span>
        <span className="text-xl font-bold">{tokenMetadata?.name}</span>
        <span className="text-seq-grey-500 text-xs font-bold">#{tokenID}</span>
        <span className="inline-flex mx-auto items-center gap-2 font-bold text-[9px] bg-black/10 px-1.25 py-1 rounded-xs">
          <NetworkImage chainId={chainId} size="xs" /> {chain?.title}
        </span>
      </div>
      <button className="bg-black text-white rounded-full flex items-center justify-center gap-2 text-sm font-bold min-h-[3rem] py-2 px-3">
        <SendIcon />
        Send
      </button>
    </div>
  )
}
