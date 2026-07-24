import type { AuthTokens } from '../../store/authSlice'
import { baseAuthenticatedApi } from '../base/baseAuthenticatedApi'
import type { LoginRequest, SignupRequest } from '../requests/authRequests'

export const authApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthTokens, LoginRequest>({
      query: ({ authorization }) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          Authorization: authorization,
        },
      }),
    }),
    signup: builder.mutation<void, SignupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useSignupMutation } = authApi
