import { baseAuthenticatedApi } from '@services/base/baseAuthenticatedApi'
import type { CampaignDetailsResponse, CampaignPageResponse, FundraisingCampaignPageResponse, FundraisingCampaignResponse } from "@app/types/Campaign.types";
import type { CampaignType, CreateCampaignRequest, EditCampaignMutationRequest } from "@services/requests/createCampaignRequest";
import type { UpdateFundraisingCampaignRequest } from '@services/requests/updateCampaignRequest';
import type { CampaignFilter } from '@/campaigns/utils/CampaignUtils';



export interface GetCampaignsRequest {
  category?: CampaignFilter;
  size?: number;
  type?: CampaignType;
}

export const campaignApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCampaign: builder.mutation<void, string>({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["userPosts", "Campaigns"],
    }),

    getCampaigns: builder.query<
      CampaignPageResponse,
      GetCampaignsRequest | undefined
    >({
      query: (params) => ({
        url: "/campaigns",
        method: "GET",
        params,
      }),
      providesTags: ["Campaigns"],
    }),
    getFundraisingCampaigns: builder.query<FundraisingCampaignPageResponse, void>({
      query: () => ({
        url: "/campaigns/fundraising_campaigns",
        method: "GET",
      }),
    }),

    getCampaign: builder.query<CampaignDetailsResponse, string>({
      query: (campaignId) => `/campaigns/${campaignId}`,
      providesTags: ['Campaigns'],
    }),

    getFundraisingById: builder.query<FundraisingCampaignResponse, string>({
      query: (postId) => ({
        url: `/campaigns/${postId}`,
        method: "GET",
      }),
      providesTags: ['Campaigns'],
    }),

    updateFundraisingCampaign: builder.mutation<void, { postId: string; body: UpdateFundraisingCampaignRequest }>({
      query: ({ postId, body }) => ({
        url: `/campaigns/${postId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Campaigns', 'userPosts'],
    }),
    
    editCampaign: builder.mutation<void, EditCampaignMutationRequest>({
      query: ({ campaignId, body }) => ({
        url: `/campaigns/${campaignId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Campaigns', 'userPosts'],
    }),

    createCampaign: builder.mutation<void, CreateCampaignRequest>({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Campaigns", "userPosts"],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useDeleteCampaignMutation,
  useGetFundraisingByIdQuery,
  useUpdateFundraisingCampaignMutation,
  useCreateCampaignMutation,
  useEditCampaignMutation,
  useGetCampaignQuery,
  useGetCampaignsQuery,
  useGetFundraisingCampaignsQuery,
} = campaignApi;
