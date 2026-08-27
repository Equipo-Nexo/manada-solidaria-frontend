import { baseApi } from '@app/services/base/baseApi'
import type {
  AuthenticationCredentialJSON,
  PasskeyAuthenticationResponse,
  PublicKeyCredentialRequestOptionsJSON,
} from '@auth/app/webauthn/webAuthn.types'

const authenticationOptionsPath =
  import.meta.env.VITE_PASSKEY_AUTHENTICATION_OPTIONS_PATH ?? '/webauthn/authenticate/options'
const authenticationPath = import.meta.env.VITE_PASSKEY_AUTHENTICATION_PATH ?? '/login/webauthn'

export const passkeyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPasskeyAuthenticationOptions: builder.mutation<
      PublicKeyCredentialRequestOptionsJSON,
      void
    >({
      query: () => ({
        url: authenticationOptionsPath,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    authenticateWithPasskey: builder.mutation<
      PasskeyAuthenticationResponse,
      AuthenticationCredentialJSON
    >({
      query: (body) => ({
        url: authenticationPath,
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
