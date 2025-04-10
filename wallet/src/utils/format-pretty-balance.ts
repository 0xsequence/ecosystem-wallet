import { formatUnits } from 'viem'

import { formatDisplay } from './format-display'
// import { limitDecimals } from '../utils/limit-decimals'

export function formatPrettyBalance(balance: string, decimals?: number) {
  //, limitLength: number = 5) {
  if (!decimals) {
    return null
  }

  const balanceBigInt = balance && typeof balance === 'string' ? BigInt(balance) : BigInt(0)

  return decimals
    ? // ? limitDecimals(
      formatDisplay(formatUnits(balanceBigInt, decimals))
    : // limitLength
      // )
      balance
}
