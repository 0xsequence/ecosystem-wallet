import { Outlet, useLocation, useParams } from 'react-router'
import { TokenType } from './components/TokenType'
import { TokenDetailModal } from './components/TokenDetailModal'
import { useInventory } from '../../hooks/use-inventory'
import { useFetchInventory } from './helpers/useFetchInventory'
import { CONTRACT_TYPES } from './constants'

export function InventoryContractRoute() {
  const { tokenId, groupId } = useParams()
  const location = useLocation()
  // Show modal
  if ((tokenId || groupId) && location?.state?.modal && location?.state?.referer === '/inventory') {
    return <TokenDetailModal />
  }

  // Bypass and show child
  if (tokenId && location.state === null) {
    return <Outlet />
  }

  return <ContractPageView />
}

function ContractPageView() {
  const { chainId, contractAddress } = useParams()

  const query = useFetchInventory()

  const nativeToken = contractAddress?.toUpperCase() === CONTRACT_TYPES.NATIVE

  const filters = nativeToken
    ? {
        filter: {
          chain: [chainId],
          type: [CONTRACT_TYPES.NATIVE]
        }
      }
    : { filter: { chain: [chainId], contract: [contractAddress] } }

  const inventory = useInventory(query?.data, filters)

  const collectibles = inventory.records
  const contract = collectibles?.[0]?.contractInfo

  if (nativeToken) {
    return <>Get token</>
  }

  if (!contract || !collectibles) {
    return <></>
  }

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto flex flex-col px-4 py-12 gap-6">
        <Masthead contract={contract} />

        <h1 className="text-3xl font-bold">{contract.name}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {collectibles?.map((item, index) => (
            <TokenType key={index} item={item} displayMode="grid" />
          ))}
        </div>
      </div>

      <TokenDetailModal />
    </>
  )
}
function Masthead({
  contract
}: {
  contract: { extensions: { ogImage: string }; logoURI: string; name: string }
}) {
  if (contract?.extensions?.ogImage)
    return (
      <div className="flex items-center justify-center relative overflow-clip rounded-xl aspect-video bg-background-secondary">
        {/* <div className="mask-vertical relative z-1"> */}
        {/* <div className="mask-horizontal"> */}
        <img src={contract.extensions.ogImage} alt={contract.name} />
        {/* </div> */}
        {/* </div> */}
        {/* <img
          src={contract.extensions.ogImage}
          alt={contract.name}
          className="size-full object-cover absolute inset-0 z-0 blur-3xl scale-120"
        /> */}
      </div>
    )

  if (contract.logoURI) return <div>{<img src={contract.logoURI} alt={contract.name} />}</div>
}
