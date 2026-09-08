import { baseAuthenticatedApi } from '../../../common/app/services/base/baseAuthenticatedApi'
import type { GetUserPostsResponse } from '../../../common/app/services/responses/userResponses';
import type { GetUserProfileResponse } from './responses/GetUserProfileResponse';
import type { UpdateUserRolesRequest } from './requests/UpdateUserRolesRequest';
import type { UpdateUserProfileRequest } from './requests/UpdateUserProfileRequest';
import type { GetUsersResponse } from './responses/GetUsersResponse';
import type { GetUsersRequest } from './requests/GetUsersRequest';

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
    updateUserProfile: builder.mutation<void, UpdateUserProfileRequest>({
      query: (body) => ({
        url: '/users/profile',
        method: 'PUT',
        body,
        responseHandler: 'text',
      }),
      transformResponse: () => undefined,
      invalidatesTags: ['userProfile'],
    }),
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: `/users`,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserPostsQuery,
  useGetUserProfileQuery,
  useUpdateUserRolesMutation,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
} = usersApi;
