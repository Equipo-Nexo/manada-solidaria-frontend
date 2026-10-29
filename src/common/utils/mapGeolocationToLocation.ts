import type { GeolocationResponse, Location } from '@services/responses/Location'

export const mapGeolocationToLocation = (
  geolocation: GeolocationResponse,
): Location => ({
  country: geolocation.country,
  city: geolocation.city,
  formatted: geolocation.formatted,
  street: geolocation.street ? geolocation.street : undefined,
  district: geolocation.district ? geolocation.district : undefined,
  houseNumber: geolocation.housenumber ? Number(geolocation.housenumber) : undefined,
  latitude: geolocation.lat,
  longitude: geolocation.lon,
})
