export interface FiatCurrency {
  decimals: number
  name: {
    message: string
  }
  sign: string
  symbol: string
}

interface Config {
  hideUnlistedTokens: boolean
  fiatCurrency: FiatCurrency
}

const config: Config = {
  hideUnlistedTokens: true,
  fiatCurrency: { symbol: 'USD', sign: '$', name: { message: 'US Dollar' }, decimals: 2 }
}

export const useConfig = () => config
