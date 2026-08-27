import { baseAuthenticatedApi } from '@app/services/base/baseAuthenticatedApi'
import type {
  PublicKeyCredentialCreationOptionsJSON,
  RegisterPasskeyRequest,
  RegisterPasskeyResponse,
} from '@auth/app/webauthn/webAuthn.types'

const registrationOptionsPath =
  import.meta.env.VITE_PASSKEY_REGISTRATION_OPTIONS_PATH ?? '/webauthn/register/options'
const registrationPath = import.meta.env.VITE_PASSKEY_REGISTRATION_PATH ?? '/webauthn/register'

export const passkeyRegistrationApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getPasskeyRegistrationOptions: builder.mutation<
      PublicKeyCredentialCreationOptionsJSON,
      void
    >({
      query: () => ({
        url: registrationOptionsPath,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    registerPasskey: builder.mutation<RegisterPasskeyResponse, RegisterPasskeyRequest>({
      query: (body) => ({
        url: registrationPath,
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
