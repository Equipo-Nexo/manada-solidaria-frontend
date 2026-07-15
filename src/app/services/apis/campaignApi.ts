import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'

export const campaignApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCampaign: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/campaigns/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userPosts']
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteCampaignMutation } = campaignApi;
