import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'

export type GetUserPostsResponse = {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  createdSince: number;
  postType: string;
}

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
