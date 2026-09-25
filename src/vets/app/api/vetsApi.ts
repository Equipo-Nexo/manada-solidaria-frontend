import { baseAuthenticatedApi } from "@common/app/services/base/baseAuthenticatedApi";
import type { VetResponse } from "./responses/vetsResponse";
import type { GetVetRequest } from "./requests/GetVetRequest";

export const vetsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getVets: builder.query<VetResponse[], GetVetRequest>({
      query: ({ query, openOnly, userLatitude, userLongitude }) => ({
        url: "/vets",
        params: {
          ...(query && { query }),
          ...(openOnly && { open_only: true }),
          ...(userLatitude !== undefined &&
            userLongitude !== undefined && {
              user_latitude: userLatitude,
              user_longitude: userLongitude,
            }),
        },
      }),
    }),
  }),
});

export const { useGetVetsQuery } = vetsApi;
