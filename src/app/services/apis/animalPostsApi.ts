import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type {
  AnimalPostsPage,
  GetAnimalPostsRequest,
} from '../requests/animalPostRequests'

export const animalPostsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimalPosts: builder.query<AnimalPostsPage, GetAnimalPostsRequest>({
      query: ({ status, type, page = 0, size = 10 }) => ({
        url: '/animal-posts',
        params: {
          ...(status ? { status } : {}),
          ...(type ? { type } : {}),
          page,
          size,
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAnimalPostsQuery } = animalPostsApi
