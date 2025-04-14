export function type(order: string[]) {
  const typeRank = new Map(order.map((type, i) => [type.toUpperCase(), i]))

  return (a, b) => {
    const aType = a?.type?.toString().toUpperCase() ?? ''
    const bType = b?.type?.toString().toUpperCase() ?? ''

    const rankA = typeRank.has(aType) ? typeRank.get(aType)! : Number.MAX_SAFE_INTEGER
    const rankB = typeRank.has(bType) ? typeRank.get(bType)! : Number.MAX_SAFE_INTEGER

    return rankA - rankB
  }
}
