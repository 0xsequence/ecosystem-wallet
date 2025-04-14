import { SendCollectible } from '../../../components/SendCollectible'
import { SendCoin } from '../../../components/SendCoin'
import { Modal, ModalPrimitive } from '@0xsequence/design-system'
import { useInventory } from '../../../hooks/use-inventory'
import { useFetchInventory } from '../helpers/useFetchInventory'
import { TOKEN_TYPES } from '../../../utils/normalize-balances'

export function SendTokens({
  chainId,
  contractAddress,
  tokenId,
  close
}: {
  chainId: string
  contractAddress: string
  tokenId: string
  close: () => void
}) {
  const query = useFetchInventory()

  const inventory = useInventory(query?.data, {
    filter: { chain: [chainId], contract: [contractAddress], tokenId: [tokenId] }
  })

  // const { chainId, tokenId, tokenClass, contractAddress } = showInventoryItem || {}
  const token = inventory?.records?.[0]
  if (!token) return null

  const balance = structuredClone(token)

  // const collectibleBalanceToSend = isCoin
  //   ? null
  //   : inventoryByTokenClass.collectibleInventory.find(collectible => collectible.tokenID === tokenId)
  // const coinBalanceToSend = isCoin
  //   ? (contractAddress && contractAddress !== zeroAddress
  //       ? inventoryByTokenClass.erc20Inventory
  //       : inventoryByTokenClass.nativeBalances
  //     ).find(
  //       balance =>
  //         balance.chainId === chainId &&
  //         (contractAddress ? balance.contractAddress === contractAddress : true)
  //     )
  //   : null

  const onSendSuccess = () => {
    // setShowInventoryItem(false)
    // setShowSendModal(false)
    if (typeof close === 'function') {
      close()
    }

    // Store initial balance state

    // First refetch after 1 second
    setTimeout(() => {
      query.refetch()

      // Check if balance updated after a brief delay
      setTimeout(() => {
        const currentBalance = inventory.records?.[0]

        // If balance hasn't changed, refetch again in 500ms
        if (JSON.stringify(balance) === JSON.stringify(currentBalance)) {
          setTimeout(() => {
            query.refetch()
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
        if (typeof close === 'function') {
          close()
        }
      }}
    >
      <div className="">
        <div className="border-b border-black/10 w-full z-20 flex flex-row items-center justify-between px-4">
          <ModalPrimitive.Title asChild>
            <div className=" h-[3.75rem] text-sm font-bold flex items-center justify-center">
              {token.type === TOKEN_TYPES.COLLECTIBLE ? 'Send Collectible' : 'Send Coins'}
            </div>
          </ModalPrimitive.Title>
        </div>
        {token.type === TOKEN_TYPES.COIN && (
          <SendCoin chainId={chainId} balance={balance} onSuccess={onSendSuccess} />
        )}
        {token.type === TOKEN_TYPES.COLLECTIBLE && (
          <SendCollectible chainId={chainId} balance={balance} onSuccess={onSendSuccess} />
        )}
      </div>
    </Modal>
  )
}
