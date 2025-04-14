export function balance(args: 'asc' | 'desc' | 'lowToHigh' | 'highToLow' = 'desc') {
  const order = args[0]
  const normalized = order === 'lowToHigh' ? 'asc' : order === 'highToLow' ? 'desc' : order

  return (a, b) => {
    const aBal = BigInt(a.balance ?? '0')
    const bBal = BigInt(b.balance ?? '0')
    return normalized === 'desc' ? Number(bBal - aBal) : Number(aBal - bBal)
  }
}
