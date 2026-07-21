import { baseApi } from "../base/baseApi";
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

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignPageResponse, GetCampaignsRequest | void>({
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
});

export const {
  useGetCampaignsQuery,
  useCreateCampaignMutation,
} = campaignApi;