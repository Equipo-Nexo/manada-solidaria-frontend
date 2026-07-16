import { baseApi } from '../base/baseApi'
import type { CreateAnimalPostRequest } from '../requests/animalPostRequests'
import type { AnimalPostResponse } from '../responses/animalPostResponses'

export const animalPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateAnimalPostMutation } = animalPostApi
