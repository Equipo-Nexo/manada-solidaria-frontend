import { baseAuthenticatedApi } from "@/common/app/services/base/baseAuthenticatedApi";
import type { MapResponse } from "./responses/MapResponse";

export const mapApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getMap: builder.query<MapResponse, void>({
      query: () => ({
        url: '/map'
      }),
      providesTags: ['map'],
    })
  })
})

export const { useGetMapQuery } = mapApi;