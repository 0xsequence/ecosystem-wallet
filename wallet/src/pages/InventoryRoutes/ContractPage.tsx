import { useParams } from 'react-router'
import { useTokenBalancesByContract } from '../../hooks/useMetadata'
// import { useAuth } from '../../context/AuthContext'

export function InventoryContractRoute() {
  // const { account = '' } = useAuth()
  const address = '0x8e3E38fe7367dd3b52D1e281E4e8400447C8d8B9'

  const { chainId = '0', contractAddress = '' } = useParams()

  const data = useTokenBalancesByContract({
    page: { page: 1 },
    chainIds: [parseInt(chainId)],
    filter: { contractAddresses: [contractAddress], accountAddresses: [address] }
  })

  return <pre>{JSON.stringify(data?.data?.balances, null, 2)}</pre>
}
