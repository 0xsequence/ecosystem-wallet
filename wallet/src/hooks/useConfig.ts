import { ChainId } from '@0xsequence/network'

export interface FiatCurrency {
  decimals: number
  name: {
    message: string
  }
  sign: string
  symbol: string
}

interface Config {
  chainIds: ChainId[]
  hideUnlistedTokens: boolean
  fiatCurrency: FiatCurrency
}

const config: Config = {
  chainIds: [ChainId.ARBITRUM_NOVA, ChainId.SONEIUM, ChainId.POLYGON],
  hideUnlistedTokens: false,
  fiatCurrency: { symbol: 'USD', sign: '$', name: { message: 'US Dollar' }, decimals: 2 }
}

export const useConfig = () => config
