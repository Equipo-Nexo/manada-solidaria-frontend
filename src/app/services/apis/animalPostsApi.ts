import { baseApi } from '../base/baseApi'
import type {
  AnimalPostsPage,
  GetAnimalPostsRequest,
} from '../requests/animalPostRequests'

export const animalPostsApi = baseApi.injectEndpoints({
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
      providesTags: ['AnimalPosts'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAnimalPostsQuery } = animalPostsApi
