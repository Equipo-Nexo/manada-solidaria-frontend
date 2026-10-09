import { baseAuthenticatedApi } from '@app/services/base/baseAuthenticatedApi'
import type {
  PublicKeyCredentialCreationOptionsJSON,
  RegisterPasskeyRequest,
  RegisterPasskeyResponse,
} from '@auth/app/webauthn/webAuthn.types'

export const passkeyRegistrationApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getPasskeyRegistrationOptions: builder.mutation<
      PublicKeyCredentialCreationOptionsJSON,
      void
    >({
      query: () => ({
        url: '/webauthn/register/options',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    registerPasskey: builder.mutation<RegisterPasskeyResponse, RegisterPasskeyRequest>({
      query: (body) => ({
        url: '/webauthn/register',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPasskeyRegistrationOptionsMutation,
  useRegisterPasskeyMutation,
} = passkeyRegistrationApi
