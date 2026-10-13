import { baseAuthenticatedApi } from "@common/app/services/base/baseAuthenticatedApi";
import type { AdoptionFormRequest } from "./requests/AdoptionFormRequest";
import type { AdoptionCategory } from "../types/AdoptionForm.types";
import type { AdoptionFormDetailResponse } from "./responses/adoptionFormDetailResponse";

export const adoptionFormsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<AdoptionCategory[], void>({
      query: () => "/questions",
    }),
    createAdoptionForm: builder.mutation<void, AdoptionFormRequest>({
      query: (body) => ({
        url: "/adoption-forms",
        method: "POST",
        body,
      }),
    }),
    getAdoptionFormDetail: builder.query<AdoptionFormDetailResponse, string>({
      query: (adoptionFormId) => `/adoption-forms/${adoptionFormId}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuestionsQuery,
  useCreateAdoptionFormMutation,
  useGetAdoptionFormDetailQuery,
} = adoptionFormsApi;
