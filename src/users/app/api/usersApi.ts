import { baseAuthenticatedApi } from '../../../common/app/services/base/baseAuthenticatedApi'
import type { GetUserPostsResponse } from '../../../common/app/services/responses/userResponses';
import type { GetUserProfileResponse } from './responses/GetUserProfileResponse';
import type { UpdateUserRolesRequest } from './requests/UpdateUserRolesRequest';

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
    updateUserRoles: builder.mutation<void, UpdateUserRolesRequest>({
      query: (body) => ({
        url: '/users/roles',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['userProfile'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserPostsQuery,
  useGetUserProfileQuery,
  useUpdateUserRolesMutation,
} = usersApi;
