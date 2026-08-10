import { baseAuthenticatedApi } from '../../../common/app/services/base/baseAuthenticatedApi'
import type { GetUserPostsResponse } from '../../../common/app/services/responses/userResponses';

export const usersApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<GetUserPostsResponse[], string>({
      query: (type) => ({
        url: `/users/posts`,
        params: { type },
      }),
      providesTags: ['userPosts']
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserPostsQuery } = usersApi;
