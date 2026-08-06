import { baseAuthenticatedApi } from '@common/app/services/base/baseAuthenticatedApi'
import type {
  CreateAnimalPostRequest,
  EditAnimalPostMutationRequest,
  GetAnimalPostsRequest,
} from './requests/animalPostRequests'
import type { AnimalPostResponse } from './responses/animalPostResponses'
import type { Page } from '@/common/app/types/Page'

export const animalPostsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimalPosts: builder.query<Page<AnimalPostResponse>, GetAnimalPostsRequest>({
      query: ({ status, type, page = 0, size = 10 }) => ({
        url: '/animal-posts',
        params: {
          ...(status ? { status } : {}),
          ...(type ? { type } : {}),
          page,
          size,
        },
      }),
      providesTags: ['AnimalPosts'],
    }),

    getAnimalPost: builder.query<AnimalPostResponse, string>({
      query: (postId) => `/animal-posts/${postId}`,
      providesTags: ['AnimalPosts'],
    }),

    deleteAnimalPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/animal-posts/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['AnimalPosts', 'userPosts'],
    }),

    editAnimalPost: builder.mutation<void, EditAnimalPostMutationRequest>({
      query: ({ postId, body }) => ({
        url: `/animal-posts/${postId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AnimalPosts', 'userPosts'],
    }),

    createAnimalPost: builder.mutation<AnimalPostResponse, CreateAnimalPostRequest>({
      query: (body) => ({
        url: '/animal-posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AnimalPosts', 'userPosts'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateAnimalPostMutation,
  useDeleteAnimalPostMutation,
  useGetAnimalPostQuery,
  useGetAnimalPostsQuery,
  useEditAnimalPostMutation
} = animalPostsApi
