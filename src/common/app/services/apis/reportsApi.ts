import type { CreateReportRequest } from "../../types/Report.types";
import { baseAuthenticatedApi } from "../base/baseAuthenticatedApi";

export const reportsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation<void, CreateReportRequest>({
      query: (body) => ({
        url: "/reports",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReportMutation } = reportsApi;
