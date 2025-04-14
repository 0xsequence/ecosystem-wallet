export function testnet(args: 'asc' | 'desc' = 'asc') {
  const order = args[0]

  return (a, b) => {
    const testnetA = a?.testnet ?? false
    const testnetB = b?.testnet ?? false

    if (testnetA === testnetB) return 0
    if (order === 'asc') {
      return testnetA ? 1 : -1 // put true (testnets) last
    } else {
      return testnetA ? -1 : 1 // put true (testnets) first
    }
  }
}
