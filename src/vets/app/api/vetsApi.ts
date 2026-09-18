import { baseAuthenticatedApi } from "@common/app/services/base/baseAuthenticatedApi";
import type { VetResponse } from "./responses/vetsResponse";

export const vetsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getVets: builder.query<VetResponse[], void>({
      query: () => ({
        url: "/vets",
      }),
      providesTags: ["Vets"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetVetsQuery } = vetsApi;
