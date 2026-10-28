import type { GeolocationResponse, Location } from '@services/responses/Location'

export const mapGeolocationToLocation = (
  geolocation: GeolocationResponse,
): Location => ({
  country: geolocation.country,
  city: geolocation.city,
  formatted: geolocation.formatted,
  street: geolocation.street,
  houseNumber: Number(geolocation.housenumber),
  latitude: geolocation.lat,
  longitude: geolocation.lon,
})
