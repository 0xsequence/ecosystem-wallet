import { SendCollectible } from '../../../components/SendCollectible'
import { SendCoin } from '../../../components/SendCoin'
import { Modal, ModalPrimitive } from '@0xsequence/design-system'
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
  const { chainId, tokenId, tokenClass, contractAddress } = showInventoryItem || {}

  const isCoin = tokenClass !== 'collectable'
  const collectibleBalanceToSend = isCoin
    ? null
    : inventoryByTokenClass.collectibleInventory.find(collectible => collectible.tokenID === tokenId)
  const coinBalanceToSend = isCoin
    ? (contractAddress ? inventoryByTokenClass.erc20Inventory : inventoryByTokenClass.nativeBalances).find(
        balance =>
          balance.chainId === chainId &&
          (contractAddress ? balance.contractAddress === contractAddress : true)
      )
    : null

  if (!showSendModal) return null

  const onSendSuccess = () => {
    setShowInventoryItem(false)
    setShowSendModal(false)

    // Store initial balance state
    const initialBalance = isCoin ? coinBalanceToSend : collectibleBalanceToSend

    // First refetch after 1 second
    setTimeout(() => {
      refetchInventory()

      // Check if balance updated after a brief delay
      setTimeout(() => {
        const currentBalance = isCoin
          ? (contractAddress
              ? inventoryByTokenClass.erc20Inventory
              : inventoryByTokenClass.nativeBalances
            ).find(
              balance =>
                balance.chainId === chainId &&
                (contractAddress ? balance.contractAddress === contractAddress : true)
            )
          : inventoryByTokenClass.collectibleInventory.find(collectible => collectible.tokenID === tokenId)

        // If balance hasn't changed, refetch again in 500ms
        if (JSON.stringify(initialBalance) === JSON.stringify(currentBalance)) {
          setTimeout(() => {
            refetchInventory()
          }, 500)
        }
      }, 500) // Check balance 500ms after first refetch
    }, 1000)
  }

  return (
    <Modal
      title
      contentProps={{
        style: {
          maxWidth: '400px',
          padding: 0,
          height: 'fit-content',
          scrollbarColor: 'gray black',
          scrollbarWidth: 'thin'
        }
      }}
      scroll={false}
      onClose={() => {
        setShowSendModal(false)
      }}
    >
      <div className="">
        <div className="border-b border-black/10 w-full z-20 flex flex-row items-center justify-between px-4">
          <ModalPrimitive.Title asChild>
            <div className=" h-[3.75rem] text-sm font-bold flex items-center justify-center">
              {collectibleBalanceToSend ? 'Send Collectible' : 'Send Coins'}
            </div>
          </ModalPrimitive.Title>
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
