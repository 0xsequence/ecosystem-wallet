import { TokenDetailModal } from './components/token-detail-modal.tsx'
import { InventoryList } from './components/inventory-list'
import { InventoryProvider } from './helpers/inventory-provider.tsx'
import { useInventory } from './helpers/use-inventory'
import { InventoryListEmpty } from './components/inventory-list-empty'
import { SendCollectible } from '../../components/SendCollectible'
import { SendCoin } from '../../components/SendCoin'
import { Modal, ModalPrimitive, Text } from '@0xsequence/design-system'

export const InventoryPage = () => {
  return (
    <InventoryProvider>
      <Inventory />
      <TokenDetailModal />
      <Send />
    </InventoryProvider>
  )
}

function Inventory() {
  const { inventoryIsEmpty } = useInventory()

  return (
    <div className="grid w-full max-w-screen-md grid-cols-2 sm:grid-cols-4 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      {!inventoryIsEmpty ? <InventoryList /> : <InventoryListEmpty />}
    </div>
  )
}

function Send() {
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
      contentProps={{
        style: {
          background: 'black',
          maxWidth: '400px',
          height: 'fit-content',
          scrollbarColor: 'gray black',
          scrollbarWidth: 'thin'
        }
      }}
      scroll={false}
      onClose={() => {
        setShowInventoryItem(false)
        setShowSendModal(false)
      }}
    >
      <div className="w-96 h-auto">
        <div className="w-full h-12 z-20 flex flex-row items-center justify-between pt-1.5 px-4">
          <div className="w-11 h-12" />
          <ModalPrimitive.Title asChild>
            <Text variant="small" className="font-bold text-gray-100">
              {collectibleBalanceToSend ? 'Send Collectible' : 'Send Coin'}
            </Text>
          </ModalPrimitive.Title>
          <div className="w-11 h-12" />
        </div>
        <div className="ml-5">
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
      </div>
    </Modal>
  )
}
