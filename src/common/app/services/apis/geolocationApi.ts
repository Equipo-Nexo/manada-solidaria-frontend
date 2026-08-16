import { baseAuthenticatedApi } from "../base/baseAuthenticatedApi";
import type { GeolocationResponse } from "../responses/Location";



export const geolocationApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getGeolocations: builder.query<GeolocationResponse[], string>({
        query: (text) => `/geolocation?text=${text}`
    }),
    getGeolocationReverse: builder.query<GeolocationResponse, { latitude: number, longitude: number}>({
      query: ({ latitude, longitude }) => `/geolocation/reverse?latitude=${latitude}&longitude=${longitude}`
    })
  }),
  overrideExisting: false,
})

export const { useGetGeolocationsQuery, useGetGeolocationReverseQuery } = geolocationApi;
