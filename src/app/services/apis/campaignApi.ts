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
}

export const campaignApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCampaign: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/campaigns/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['userPosts']
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
    }),
    createCampaign: builder.mutation<void, CreateCampaignRequest>({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteCampaignMutation, useGetCampaignsQuery, useCreateCampaignMutation } = campaignApi;