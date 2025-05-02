import { Outlet, useLocation, useParams } from 'react-router'
import { TokenType } from './components/TokenType'
import { TokenDetailModal } from './components/TokenDetailModal'
import { RefinersState, useInventory } from '../../hooks/use-inventory'
import { useFetchInventory } from './helpers/use-fetch-inventory'
import { CONTRACT_TYPES } from './constants'
import { ZERO_ADDRESS } from '@0xsequence/design-system'
import { isTokenGroupRecord } from './types'

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
  const { chainId = 0, contractAddress = ZERO_ADDRESS } = useParams()

  const query = useFetchInventory()

  const nativeToken = contractAddress?.toUpperCase() === CONTRACT_TYPES.NATIVE

  const filters: Partial<RefinersState> = nativeToken
    ? {
        filter: {
          chain: [chainId],
          type: CONTRACT_TYPES.NATIVE
        }
      }
    : { filter: { chain: [chainId], contract: [contractAddress] } }

  const inventory = useInventory(query?.data, filters)

  const collectibles = inventory.records
  const record = collectibles?.[0]

  if (isTokenGroupRecord(record)) {
    return null
  }

  const contract = record.contractInfo

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
