import { SequenceAPIClient, Token } from "@0xsequence/api"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../sequenceApiClient"
import { TIME } from "../utils/time.const"


export const getCollectiblePrices = async (apiClient: SequenceAPIClient, tokens: Token[]) => {
  if (tokens.length === 0) {
    return []
  }

  const res = await apiClient.getCollectiblePrices({ tokens })

  return res?.tokenPrices || []
}

export const useCollectiblePrices = (tokens: Token[]) => {
  return useQuery({
    queryKey: ['useCollectiblePrices', tokens],
    queryFn: () => getCollectiblePrices(apiClient, tokens),
    retry: true,
    staleTime: TIME.MINUTE,
    enabled: tokens.length > 0
  })
}
