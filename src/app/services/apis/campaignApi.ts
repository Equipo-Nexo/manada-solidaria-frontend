import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { CampaignPageResponse } from "../../types/Campaign.types";
import type { CreateCampaignRequest } from "../requests/createCampaignRequest";

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
      query: (postId) => ({
        url: `/campaigns/${postId}`,
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

export const { useDeleteCampaignMutation, useGetCampaignsQuery, useCreateCampaignMutation } = campaignApi;
