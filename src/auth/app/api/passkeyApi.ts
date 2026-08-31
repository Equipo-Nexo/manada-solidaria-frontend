import { baseApi } from '@app/services/base/baseApi'
import type {
  AuthenticationCredentialJSON,
  PasskeyAuthenticationResponse,
  PublicKeyCredentialRequestOptionsJSON,
} from '@auth/app/webauthn/webAuthn.types'

export const passkeyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPasskeyAuthenticationOptions: builder.mutation<
      PublicKeyCredentialRequestOptionsJSON,
      void
    >({
      query: () => ({
        url: '/webauthn/authenticate/options',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    authenticateWithPasskey: builder.mutation<
      PasskeyAuthenticationResponse,
      AuthenticationCredentialJSON
    >({
      query: (body) => ({
        url: '/login/webauthn',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPasskeyAuthenticationOptionsMutation,
  useAuthenticateWithPasskeyMutation,
} = passkeyApi
