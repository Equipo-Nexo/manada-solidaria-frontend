import { baseAuthenticatedApi } from "@common/app/services/base/baseAuthenticatedApi";
import type { AdoptionFormRequest } from "./requests/AdoptionFormRequest";
import type { AdoptionCategory } from "../types/AdoptionForm.types";
import type { FormResponse } from "../types/FormResponse.types";
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

    getForms: builder.query<FormResponse, { filter: string }>({
      query: ({ filter }) => ({
        url: "/users/adoption-forms",
        params: { filter },
      }),
      providesTags: ["AdoptionForms"],
    }),

    getAdoptionFormDetail: builder.query<AdoptionFormDetailResponse, string>({
      query: (adoptionFormId) => `/adoption-forms/${adoptionFormId}`,
      providesTags: ["AdoptionForms"],
    }),
    markAdoptionFormAsRead: builder.mutation<void, string>({
      query: (adoptionFormId) => ({
        url: `/adoption-forms/${adoptionFormId}/read`,
        method: "POST",
      }),
      invalidatesTags: ["AdoptionForms"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuestionsQuery,
  useCreateAdoptionFormMutation,
  useGetFormsQuery,
  useGetAdoptionFormDetailQuery,
  useMarkAdoptionFormAsReadMutation,
} = adoptionFormsApi;
