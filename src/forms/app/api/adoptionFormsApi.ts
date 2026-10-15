import { baseAuthenticatedApi } from '@common/app/services/base/baseAuthenticatedApi';
import type { AdoptionFormRequest } from './requests/AdoptionFormRequest';
import type { AdoptionCategory } from '../types/AdoptionForm.types';

export const adoptionFormsApi = baseAuthenticatedApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<AdoptionCategory[], void>({
            query: () => '/questions',
        }),
        createAdoptionForm: builder.mutation<void, AdoptionFormRequest>({
            query: (body) => ({
                url: '/adoption-forms',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetQuestionsQuery, useCreateAdoptionFormMutation } = adoptionFormsApi;
