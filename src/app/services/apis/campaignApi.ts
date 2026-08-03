import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { CampaignDetailsResponse, CampaignPageResponse } from "../../types/Campaign.types";
import type { CreateCampaignRequest, EditCampaignMutationRequest } from "../requests/createCampaignRequest";

export type CampaignCategory =
  | "DONATION"
  | "CASTRATION"
  | "VACCINATION"
  | "DEWORMING"
  | "OTHER";

export interface GetCampaignsRequest {
  category?: CampaignCategory;
  size?: number;
}

export const campaignApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCampaign: builder.mutation<void, string>({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userPosts', 'Campaigns']
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
      providesTags: ['Campaigns'],
    }),

    getCampaign: builder.query<CampaignDetailsResponse, string>({
      query: (campaignId) => `/campaigns/${campaignId}`,
      providesTags: ['Campaigns'],
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
      invalidatesTags: ['Campaigns', 'userPosts'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useEditCampaignMutation,
  useGetCampaignQuery,
  useGetCampaignsQuery,
} = campaignApi;
