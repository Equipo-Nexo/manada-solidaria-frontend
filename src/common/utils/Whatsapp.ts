export const openWhatsApp = (phoneNumber: string, text: string) => window.open(
  `https://wa.me/549${phoneNumber}?text=${text}`,
  '_blank',
  'noopener,noreferrer'
)