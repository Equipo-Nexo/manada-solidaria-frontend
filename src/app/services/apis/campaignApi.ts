import type { CampaignPageResponse } from "../../types/Campaign.types";
import { baseApi } from "../base/baseApi";

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignPageResponse, void>({
      query: () => ({
        url: "/campaigns",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCampaignsQuery } = campaignApi;
