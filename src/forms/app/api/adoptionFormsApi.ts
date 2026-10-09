import { baseAuthenticatedApi } from '@common/app/services/base/baseAuthenticatedApi';
import type { AdoptionFormRequest } from './requests/AdoptionFormRequest';
import type { AdoptionCategory } from '../types/AdoptionForm.types';
import type { FormResponse } from '../types/FormResponse.types';

export const adoptionFormsApi = baseAuthenticatedApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<AdoptionCategory[], void>({
            query: () => '/questions',
        }),
        createAdoptionForm: builder.mutation<void, AdoptionFormRequest>({
            query: (body) => ({
                url: '/users/adoption-forms',
                method: 'POST',
                body,
            }),
        }),
        getForms: builder.query<FormResponse, { filter: string }>({
            query: ({ filter }) => ({
                url: `/users/adoption-forms`,
                params: { filter },
            }),

        }),
    }),
    overrideExisting: false,
});

export const { useGetQuestionsQuery, useCreateAdoptionFormMutation, useGetFormsQuery } = adoptionFormsApi;
