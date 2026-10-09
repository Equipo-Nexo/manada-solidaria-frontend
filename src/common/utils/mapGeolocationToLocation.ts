import type { GeolocationResponse, Location } from '@services/responses/Location'

export const mapGeolocationToLocation = (
  geolocation: GeolocationResponse,
): Location => ({
  name: geolocation.city,
  address: geolocation.street,
  number: Number(geolocation.housenumber),
  latitude: geolocation.lat,
  longitude: geolocation.lon,
})
