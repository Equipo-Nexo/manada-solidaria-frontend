import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { GetUserPostsResponse } from '../responses/userResponses';

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
