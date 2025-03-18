import { Outlet, useLocation, useParams } from 'react-router'
import { TokenType } from './components/TokenType'
import { TokenDetailModal } from './components/TokenDetailModal'
import { useContractCollection } from './helpers/useContractCollection'
// import { useAuth } from '../../context/AuthContext'

export function InventoryContractRoute() {
  const { chainId, contractAddress, tokenId } = useParams()
  const location = useLocation()
  const { contract, collectibles } = useContractCollection(chainId, contractAddress)

  if (tokenId && location.state === null) {
    return <Outlet />
  }

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto flex flex-col px-4 py-12 gap-6">
        <Masthead contract={contract} />

        <h1 className="text-3xl font-bold">{contract.name}</h1>

        <div className="grid grid-cols-4 gap-2">
          {collectibles.map((item, index) => (
            <TokenType key={index} item={item} displayMode="grid" />
          ))}
        </div>
      </div>
      <TokenDetailModal />
    </>
  )
}

function Masthead({ contract }) {
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
