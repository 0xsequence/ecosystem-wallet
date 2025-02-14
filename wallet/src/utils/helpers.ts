enum ValueType {
  VERY_LARGE,
  FRACTION,
  VERY_TINY,
  MIXED
}

interface FormatDisplayOptions {
  disableScientificNotation?: boolean
  disableCompactNotation?: boolean
  significantDigits?: number
  maximumFractionDigits?: number
}

export const formatDisplay = (_val: number | string, options?: FormatDisplayOptions): string => {
  if (isNaN(Number(_val))) {
    console.error(`display format error ${_val} is not a number`)
    return 'NaN'
  }

  const val = Number(_val)

  if (val === 0) {
    return '0'
  }

  let valMode: ValueType

  if (val > 100000000) {
    if (options?.disableCompactNotation) {
      valMode = ValueType.MIXED
    } else {
      valMode = ValueType.VERY_LARGE
    }
  } else if (val < 0.0000000001) {
    if (options?.disableScientificNotation) {
      valMode = ValueType.FRACTION
    } else {
      valMode = ValueType.VERY_TINY
    }
  } else if (val < 1) {
    valMode = ValueType.FRACTION
  } else {
    valMode = ValueType.MIXED
  }

  let notation: Intl.NumberFormatOptions['notation'] = undefined
  let config: Pick<Intl.NumberFormatOptions, 'maximumFractionDigits' | 'maximumSignificantDigits'>

  const maximumSignificantDigits = options?.significantDigits ?? 4

  switch (valMode) {
    case ValueType.VERY_LARGE:
      notation = 'compact'
      config = {
        maximumSignificantDigits,
        maximumFractionDigits: options?.maximumFractionDigits
      }
      break
    case ValueType.VERY_TINY:
      notation = 'scientific'
      config = {
        maximumSignificantDigits,
        maximumFractionDigits: options?.maximumFractionDigits
      }
      break
    case ValueType.FRACTION:
      notation = 'standard'
      config = {
        maximumSignificantDigits,
        maximumFractionDigits: options?.maximumFractionDigits
      }
      break
    default:
      notation = 'standard'
      config = {
        maximumSignificantDigits,
        maximumFractionDigits: options?.maximumFractionDigits
      }
  }

  return Intl.NumberFormat('en-US', {
    notation,
    ...config
  }).format(val)
}

export const truncateAtMiddle = (text: string, truncateAt: number) => {
  let finalText = text

  if (text.length >= truncateAt) {
    finalText = text.slice(0, truncateAt / 2) + '...' + text.slice(text.length - truncateAt / 2, text.length)
  }

  return finalText
}

export const limitDecimals = (value: string, decimals: number) => {
  const splitValue = value.split('.')
  if (splitValue.length === 1) {
    return value
  }
  return `${splitValue[0]}.${splitValue[1].slice(0, decimals)}`
}

export const isEthAddress = (value: string) => {
  const ethAddressRegEx = /0x[a-fA-F0-9]{40}/
  const isEthAddress = ethAddressRegEx.test(value)

  return isEthAddress
}
