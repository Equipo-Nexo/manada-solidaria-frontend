import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'

export const animalPostApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAnimalPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/animal-posts/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userPosts']
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteAnimalPostMutation } = animalPostApi;
