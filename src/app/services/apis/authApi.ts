import type { AuthTokens } from '../../store/authSlice'
import type { LoginRequest } from '../requests/authRequests'
import { baseApi } from '../base/baseApi'

export const authApi = baseApi.injectEndpoints({
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
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = authApi
