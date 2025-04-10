import { useInventory } from './use-inventory'

export function useContractCollection(chainId?: string, contractAddress?: string) {
  const { collectibleInventory } = useInventory()
  if (!chainId || !contractAddress) return { contract: {}, collectibles: [] }

  const collectibles = collectibleInventory.filter(
    item =>
      item?.contractInfo?.chainId.toString() === chainId && item?.contractInfo?.address === contractAddress
  )

  const contract = { ...collectibles[0], ...collectibles[0]?.contractInfo }
  delete contract.tokenMetadata
  delete contract.contractInfo

  return { contract, collectibles }
}
