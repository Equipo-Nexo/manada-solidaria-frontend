import { baseAuthenticatedApi } from '../../../common/app/services/base/baseAuthenticatedApi'
import type { GetUserPostsResponse } from '../../../common/app/services/responses/userResponses';
import type { GetUserProfileResponse } from './responses/GetUserProfileResponse';

export const usersApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<GetUserPostsResponse[], string>({
      query: (type) => ({
        url: `/users/posts`,
        params: { type },
      }),
      providesTags: ['userPosts']
    }),
    getUserProfile: builder.query<GetUserProfileResponse, string>({
      query: (userId) => ({
        url: `/users/${userId}/profile`,
      }),
      providesTags: ['userProfile']
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserPostsQuery, useGetUserProfileQuery } = usersApi;
