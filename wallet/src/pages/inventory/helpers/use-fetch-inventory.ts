import { ContractVerificationStatus } from '@0xsequence/indexer'
import { useAuth } from '../../../context/AuthContext'
import { useConfig } from '../../../hooks/useConfig'
import { useTokenBalancesDetails } from '../../../hooks/useTokenBalancesDetails'
import { getErc20Inventory, getCollectibleInventory, getNativeInventory } from './get-inventory'
import { padArray } from '../../../utils/pad-array'
import { TokenTypeProps } from '../types'

export function useFetchInventory() {
  const { hideUnlistedTokens } = useConfig()
  const { address = '' } = useAuth()
  const { data, isLoading } = useTokenBalancesDetails({
    omitMetadata: false,
    filter: {
      omitNativeBalances: false,
      accountAddresses: address ? [address] : [],
      contractStatus: hideUnlistedTokens
        ? ContractVerificationStatus.VERIFIED
        : ContractVerificationStatus.ALL,
      contractWhitelist: [],
      contractBlacklist: []
    }
  })

  const erc20Inventory = getErc20Inventory(data)
  const collectibleInventory = getCollectibleInventory(data)
  const nativeBalances = getNativeInventory(address, data)

  const inventoryIsEmpty = !nativeBalances?.length && !erc20Inventory?.length && !collectibleInventory?.length

  // Merge & Pad to 12 items
  const inventory = padArray(
    [...nativeBalances, ...erc20Inventory, ...collectibleInventory],
    null,
    12
  ) as (TokenTypeProps | null)[]

  return {
    inventory,
    inventoryIsEmpty,
    raw: { data },
    status: { isLoading },
    inventoryByTokenClass: { nativeBalances, erc20Inventory, collectibleInventory }
  }
}
