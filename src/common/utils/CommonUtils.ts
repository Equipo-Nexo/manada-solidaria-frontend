export const NOT_FOUND_IMAGE_URL = 'https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg';

export const normalizeImageUrl = (
  imageIdOrUrl?: string | null,
  fallback = NOT_FOUND_IMAGE_URL,
) => {
  if (!imageIdOrUrl) return fallback

  return /^(https?:|blob:|data:)/i.test(imageIdOrUrl)
    ? imageIdOrUrl
    : `${import.meta.env.VITE_CLOUDFLARE_URL}${imageIdOrUrl}`
}
