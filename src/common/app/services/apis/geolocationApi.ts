import { baseAuthenticatedApi } from "../base/baseAuthenticatedApi";
import type { GeolocationRequest, GeolocationReverseRequest } from "../requests/GeoloationRequest";
import type { GeolocationResponse } from "../responses/Location";



export const geolocationApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getGeolocations: builder.query<GeolocationResponse[], GeolocationRequest>({
      query: ({ text, longitude, latitude }) => ({
        url: '/geolocation',
        params: {
          text,
          ...(longitude !== undefined && { longitude }),
          ...(latitude !== undefined && { latitude }),
        },
      }),    
    }),
    getGeolocationReverse: builder.query<GeolocationResponse, GeolocationReverseRequest>({
      query: ({ latitude, longitude }) => `/geolocation/reverse?latitude=${latitude}&longitude=${longitude}`
    })
  }),
  overrideExisting: false,
})

export const { useGetGeolocationsQuery, useGetGeolocationReverseQuery } = geolocationApi;
