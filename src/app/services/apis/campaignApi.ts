import { baseAuthenticatedApi } from "../base/baseAuthenticatedApi";
import type { CampaignPageResponse } from "../../types/Campaign.types";
import type {
  CampaignType,
  CreateCampaignRequest,
} from "../requests/createCampaignRequest";

export type CampaignCategory =
  | "DONATION"
  | "CASTRATION"
  | "VACCINATION"
  | "DEWORMING"
  | "OTHER";

export interface GetCampaignsRequest {
  category?: CampaignCategory;
  size?: number;
  type?: CampaignType;
}

export const campaignApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCampaign: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/campaigns/${postId}`,
        method: "DELETE",
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
    getFundraisingCampaigns: builder.query<CampaignPageResponse, void>({
      query: () => ({
        url: "/campaigns/fundraising_campaigns",
        method: "GET",
      }),
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
  useGetCampaignsQuery,
  useGetFundraisingCampaignsQuery,
  useCreateCampaignMutation,
} = campaignApi;
