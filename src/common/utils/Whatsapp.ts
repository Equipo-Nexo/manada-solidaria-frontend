const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

export const openWhatsApp = (phoneNumber: string, text: string) => {
  const phone = `549${phoneNumber}`
  const message = encodeURIComponent(text)

  if (isIOS()) {
    window.location.assign(`whatsapp://send?phone=${phone}&text=${message}`)
    return
  }

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    '_blank',
    'noopener,noreferrer'
  )
}
