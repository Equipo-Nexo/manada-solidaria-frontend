import type { CreateCampaignRequest } from "../requests/createCampaignRequest";
import { baseApi } from "../base/baseApi";

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateCampaignMutation } = campaignApi;
