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
  currency?: string
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

  if (options?.currency) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: options.currency
    }).format(val)
  }

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
