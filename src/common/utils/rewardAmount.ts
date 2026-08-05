export const formatRewardAmount = (value: string): string => {
  const sanitizedValue = value.replace(/[^\d,.]/g, '')
  const commaIndex = sanitizedValue.indexOf(',')
  const integerValue = (commaIndex >= 0 ? sanitizedValue.slice(0, commaIndex) : sanitizedValue)
    .replace(/\D/g, '')
  const formattedInteger = integerValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (commaIndex < 0) return formattedInteger

  const decimalValue = sanitizedValue.slice(commaIndex + 1).replace(/\D/g, '').slice(0, 2)
  return `${formattedInteger},${decimalValue}`
}

export const parseRewardAmount = (value: string): number =>
  Number(value.replace(/\./g, '').replace(',', '.'))
