import { useQuery } from '@tanstack/react-query'
import { TIME } from '../utils/time.const'
import { apiClient } from '../sequenceApiClient'

export const useExchangeRate = (toCurrency: string) => {
  return useQuery({
    queryKey: ['exchangeRate', toCurrency],
    queryFn: async () => {
      if (toCurrency === 'USD') {
        return 1
      }

      const res = await apiClient.getExchangeRate({ toCurrency })

      return res.exchangeRate.value
    },
    retry: true,
    staleTime: TIME.MINUTE * 10
  })
}
