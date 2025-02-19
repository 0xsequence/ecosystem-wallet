import { TokenDetailModal } from './components/token-detail-modal.tsx'
import { InventoryList } from './components/inventory-list'
import { InventoryProvider } from './helpers/inventory-provider.tsx'
import { useInventory } from './helpers/use-inventory'
import { InventoryListEmpty } from './components/inventory-list-empty'
// import { SendCollectible } from '../../components/SendCollectible'
// import { SendCoin } from '../../components/SendCoin'
// import { Modal, ModalPrimitive, Text } from '@0xsequence/design-system'
// import { ChainId } from '@0xsequence/network'
// import { useState } from 'react'

export const InventoryPage = () => {
  return (
    <InventoryProvider>
      <Inventory />
      )
      <TokenDetailModal />
      {/* <Send/> */}
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

// function Send(){
//   const [openWalletModal, setOpenWalletModal] = useState(false)
//     const [sendOptions, setSendOptions] = useState<
//       { chainId: ChainId; contractAddress?: string; tokenId?: string } | undefined
//     >()
//     const { chainId = ChainId.SONEIUM, contractAddress, tokenId = '' } = sendOptions || {}

//     const collectibleBalanceToSend = collectibleBalances.find(collectible => collectible.tokenID === tokenId)
//     const coinBalanceToSend = tokenId
//       ? null
//       : (contractAddress ? erc20Balances : nativeBalances).find(balance => balance.chainId === chainId)

//  return <>{openWalletModal && (
//           <Modal
//             contentProps={{
//               style: {
//                 maxWidth: '400px',
//                 height: 'fit-content',
//                 scrollbarColor: 'gray black',
//                 scrollbarWidth: 'thin'
//               }
//             }}
//             scroll={false}
//             onClose={() => {
//               setSendOptions(undefined)
//               setOpenWalletModal(false)
//             }}
//           >
//             <div className="bg-background-primary w-96 h-auto">
//               <div className="w-full h-12 bg-background-primary z-20 flex flex-row items-center justify-between pt-1.5 px-4">
//                 <div className="w-11 h-12" />
//                 <ModalPrimitive.Title asChild>
//                   <Text variant="small" className="font-bold text-gray-100">
//                     {sendOptions?.tokenId ? 'Send Collectible' : 'Send Coin'}
//                   </Text>
//                 </ModalPrimitive.Title>
//                 <div className="w-11 h-12" />
//               </div>
//               <div className="ml-5">
//                 {coinBalanceToSend && (
//                   <SendCoin
//                     chainId={chainId}
//                     balance={coinBalanceToSend}
//                     onSuccess={() => setOpenWalletModal(false)}
//                   />
//                 )}
//                 {collectibleBalanceToSend && (
//                   <SendCollectible
//                     chainId={chainId}
//                     balance={collectibleBalanceToSend}
//                     onSuccess={() => setOpenWalletModal(false)}
//                   />
//                 )}
//               </div>
//             </div>
//           </Modal>
//         )}
//       </>
// }
