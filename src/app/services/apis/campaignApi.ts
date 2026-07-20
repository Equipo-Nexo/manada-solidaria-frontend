import type { CampaignPageResponse } from "../../types/Campaign.types";
import { baseApi } from "../base/baseApi";
type CampaignCategory =
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
    getCampaigns: builder.query<CampaignPageResponse, GetCampaignsRequest>({
      query: (params) => ({
        url: "/campaigns",
        method: "GET",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCampaignsQuery } = campaignApi;
