import { ChainId } from '@0xsequence/network'
import { FeeOption, Transaction } from '@0xsequence/waas'

import { sequenceWaas } from '../waasSetup'

export interface TransactionFeeOptionsResult {
  feeQuote: string | undefined
  feeOptions: FeeOption[] | undefined
  isSponsored: boolean
}

export async function checkTransactionFeeOptions({
  transactions,
  chainId
}: {
  transactions: Transaction[]
  chainId?: ChainId
}): Promise<{ feeQuote: string | undefined; feeOptions: FeeOption[] | undefined; isSponsored: boolean }> {
  const resp = await sequenceWaas.feeOptions({
    transactions: transactions,
    network: chainId
  })

  if (resp.data.feeQuote && resp.data.feeOptions) {
    return { feeQuote: resp.data.feeQuote, feeOptions: resp.data.feeOptions, isSponsored: false }
  }
  return { feeQuote: resp.data.feeQuote, feeOptions: resp.data.feeOptions, isSponsored: true }
}
