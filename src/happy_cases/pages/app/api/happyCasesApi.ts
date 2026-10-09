import { baseAuthenticatedApi } from "@common/app/services/base/baseAuthenticatedApi";
import type { GetHappyCasesRequest } from "./requests/happyCasesRequests";
import type { HappyCaseResponse } from "./responses/happyCasesResponses";
import type { Page } from "@/common/app/types/Page";

export const happyCasesApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getHappyCases: builder.query<Page<HappyCaseResponse>, GetHappyCasesRequest>(
      {
        query: ({ page = 0, size = 10 }) => ({
          url: "/animal-posts/happy-cases",
          params: {
            page,
            size,
          },
        }),
        providesTags: ["AnimalPosts"],
      },
    ),
  }),
  overrideExisting: false,
});
export const { useGetHappyCasesQuery } = happyCasesApi;
