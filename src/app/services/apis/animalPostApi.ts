import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { CreateAnimalPostRequest } from '../requests/animalPostRequests'
import type { AnimalPostResponse } from '../responses/animalPostResponses'
import { baseApi } from '../base/baseApi'

export const animalPostApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAnimalPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/animal-posts/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userPosts'],
      async onQueryStarted(_postId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(baseApi.util.invalidateTags(['AnimalPosts']))
        } catch {
          // A failed deletion must keep the existing cached lists intact.
        }
      },
    }),
    createAnimalPost: builder.mutation<AnimalPostResponse, CreateAnimalPostRequest>({
      query: (body) => ({
        url: '/animal-posts',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(baseApi.util.invalidateTags(['AnimalPosts']))
        } catch {
          // A failed creation must keep the existing cached lists intact.
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteAnimalPostMutation, useCreateAnimalPostMutation } = animalPostApi;
