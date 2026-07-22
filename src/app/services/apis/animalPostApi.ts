import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { CreateAnimalPostRequest } from '../requests/animalPostRequests'
import type { AnimalPostResponse } from '../responses/animalPostResponses'

export const animalPostApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAnimalPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/animal-posts/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userPosts']
    }),
    createAnimalPost: builder.mutation<AnimalPostResponse, CreateAnimalPostRequest>({
      query: (body) => ({
        url: '/animal-posts',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteAnimalPostMutation, useCreateAnimalPostMutation } = animalPostApi;
