import { baseApi } from '../base/baseApi';
import type { UploadImageRequest } from '../requests/presignedUrlRequest';

export const imagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<void, UploadImageRequest>({
        query: ({ url, image, contentType }) => ({
            url,
            method: 'PUT',
            headers: {
                "Content-Type": contentType
            },
            body: image
        })
    })
  }),
  overrideExisting: false,
})

export const { useUploadImageMutation } = imagesApi;
