export const limitDecimals = (value: string, decimals: number) => {
  const splitValue = value.split('.')
  if (splitValue.length === 1) {
    return value
  }
  return `${splitValue[0]}.${splitValue[1].slice(0, decimals)}`
}
