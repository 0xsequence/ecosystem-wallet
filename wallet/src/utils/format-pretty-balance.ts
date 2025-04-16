import { formatUnits } from 'viem'

import { formatDisplay } from './format-display'
// import { limitDecimals } from '../utils/limit-decimals'

export function formatPrettyBalance(balance: string | bigint, decimals?: number): string | undefined {
  //, limitLength: number = 5) {
  if (!decimals) {
    return undefined
  }

  const balanceBigInt =
    balance && typeof balance === 'string'
      ? BigInt(balance)
      : balance && typeof balance === 'bigint'
      ? balance
      : BigInt(0)

  return decimals
    ? // ? limitDecimals(
      formatDisplay(formatUnits(balanceBigInt, decimals))
    : // limitLength
      // )
      balance.toString()
}
