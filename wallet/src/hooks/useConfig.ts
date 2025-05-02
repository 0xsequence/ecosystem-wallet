import { ContractVerificationStatus, NetworkType } from '@0xsequence/indexer'

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
  networkType: NetworkType
  contractStatus: ContractVerificationStatus
  fiatCurrency: FiatCurrency
}

const config: Partial<Config> = {
  hideUnlistedTokens: true,
  networkType: NetworkType.ALL,
  fiatCurrency: { symbol: 'USD', sign: '$', name: { message: 'US Dollar' }, decimals: 2 }
}

export const useConfig = () => {
  const contractStatus = config.hideUnlistedTokens
    ? ContractVerificationStatus.VERIFIED
    : ContractVerificationStatus.ALL

  return { ...config, contractStatus } as Config
}
