import type { AuthTokens } from '@store/authSlice'

export type PublicKeyCredentialDescriptorJSON = Omit<PublicKeyCredentialDescriptor, 'id'> & {
  id: string
}

export type PublicKeyCredentialRequestOptionsJSON = Omit<
  PublicKeyCredentialRequestOptions,
  'allowCredentials' | 'challenge'
> & {
  allowCredentials?: PublicKeyCredentialDescriptorJSON[]
  challenge: string
}

export type AuthenticationCredentialJSON = {
  id: string
  rawId: string
  response: {
    authenticatorData: string
    clientDataJSON: string
    signature: string
    userHandle: string | null
  }
  type: PublicKeyCredential['type']
  clientExtensionResults: AuthenticationExtensionsClientOutputs
  authenticatorAttachment: string | null
}

export type PasskeyAuthenticationResponse = AuthTokens

export type PublicKeyCredentialCreationOptionsJSON = Omit<
  PublicKeyCredentialCreationOptions,
  'challenge' | 'excludeCredentials' | 'user'
> & {
  challenge: string
  excludeCredentials?: PublicKeyCredentialDescriptorJSON[]
  user: Omit<PublicKeyCredentialUserEntity, 'id'> & { id: string }
}

export type RegistrationCredentialJSON = {
  id: string
  rawId: string
  response: {
    attestationObject: string
    clientDataJSON: string
    transports: string[]
  }
  type: PublicKeyCredential['type']
  clientExtensionResults: AuthenticationExtensionsClientOutputs
  authenticatorAttachment: string | null
}

export type RegisterPasskeyRequest = {
  publicKey: {
    credential: RegistrationCredentialJSON
    label: string
  }
}

export type RegisterPasskeyResponse = {
  success: boolean
}
