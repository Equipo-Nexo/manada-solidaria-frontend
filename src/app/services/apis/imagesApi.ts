import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { GetPresignedUrlRequest } from '../requests/PresignedUrlRequest';
import type { PresignedUrlResponse } from '../responses/imageResponses';

export const imagesApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getPresignedUrl: builder.mutation<PresignedUrlResponse, GetPresignedUrlRequest>({
      query: (body) => ({
        url: "/images/presigned-url",
        method: "POST",
        body,
      }),
    })
  }),
  overrideExisting: false,
})

export const { useGetPresignedUrlMutation } = imagesApi;
