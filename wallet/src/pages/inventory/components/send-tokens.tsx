import { SendCollectible } from '../../../components/SendCollectible'
import { SendCoin } from '../../../components/SendCoin'
import { Modal } from '@0xsequence/design-system'
import { useInventory } from '../helpers/use-inventory'

export function SendTokens() {
  const {
    inventoryByTokenClass,
    showInventoryItem,
    setShowInventoryItem,
    showSendModal,
    setShowSendModal,
    refetchInventory
  } = useInventory()

  const { chainId, tokenId, contractAddress } = showInventoryItem || {}
  const isCoin = !tokenId || tokenId === '0'
  const collectibleBalanceToSend = isCoin
    ? null
    : inventoryByTokenClass.collectibleInventory.find(collectible => collectible.tokenID === tokenId)
  const coinBalanceToSend = isCoin
    ? (contractAddress ? inventoryByTokenClass.erc20Inventory : inventoryByTokenClass.nativeBalances).find(
        balance => balance.chainId === chainId
      )
    : null

  if (!showSendModal) return null

  const onSendSuccess = () => {
    setShowSendModal(false)
    refetchInventory()
  }

  return (
    <Modal
      title
      autoHeight={true}
      scroll={false}
      contentProps={{
        style: {
          maxWidth: '400px',
          padding: 0,
          minHeight: '400px',
          scrollbarWidth: 'thin'
        }
      }}
      onClose={() => {
        setShowInventoryItem(false)
        setShowSendModal(false)
      }}
    >
      <div className="h-full overflow-scroll">
        <div className=" text-black  text-sm font-bold w-full sticky top-0 h-[3.75rem] bg-white/95 backdrop-blur-3xl z-20 flex flex-row items-center justify-between px-4  shadow-[0_1px_3px_-1.5px_theme(color.black/10%)]">
          {collectibleBalanceToSend ? 'Send Collectible' : 'Send Coins'}
        </div>
        {coinBalanceToSend && (
          <SendCoin chainId={chainId as number} balance={coinBalanceToSend} onSuccess={onSendSuccess} />
        )}
        {collectibleBalanceToSend && (
          <SendCollectible
            chainId={chainId as number}
            balance={collectibleBalanceToSend}
            onSuccess={onSendSuccess}
          />
        )}
      </div>
    </Modal>
  )
}
