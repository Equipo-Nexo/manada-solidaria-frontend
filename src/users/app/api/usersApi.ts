import { baseAuthenticatedApi } from '../../../common/app/services/base/baseAuthenticatedApi'
import type { GetUserPostsResponse } from '../../../common/app/services/responses/userResponses';
import type { EditPersonalDataRequest } from './requests/EditPersonalDataRequest';
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
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['userProfile']
    }),
    editUserPersonalData: builder.mutation<void, EditPersonalDataRequest>({
      query: (personalData) => ({
        url: '/users',
        method: 'PUT',
        body: personalData,
      }),
      invalidatesTags: ['userProfile'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserPostsQuery,
  useGetUserProfileQuery,
  useEditUserPersonalDataMutation,
} = usersApi;
