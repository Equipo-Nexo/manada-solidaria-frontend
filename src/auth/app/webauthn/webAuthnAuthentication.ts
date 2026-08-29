import { arrayBufferToBase64Url, base64UrlToArrayBuffer } from './webAuthnEncoding'
import type {
  AuthenticationCredentialJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from './webAuthn.types'

export function isWebAuthnSupported(): boolean {
  return typeof window !== 'undefined'
    && 'PublicKeyCredential' in window
    && Boolean(navigator.credentials)
}

export async function isConditionalMediationSupported(): Promise<boolean> {
  if (!isWebAuthnSupported()) {
    return false
  }

  const credentialType = PublicKeyCredential as typeof PublicKeyCredential & {
    isConditionalMediationAvailable?: () => Promise<boolean>
  }

  return credentialType.isConditionalMediationAvailable
    ? credentialType.isConditionalMediationAvailable()
    : false
}

export async function requestPasskeyCredential(
  options: PublicKeyCredentialRequestOptionsJSON,
  requestOptions: {
    mediation?: CredentialMediationRequirement
    signal?: AbortSignal
  } = {},
): Promise<AuthenticationCredentialJSON> {
  if (!isWebAuthnSupported()) {
    throw new Error('WEBAUTHN_UNSUPPORTED')
  }

  const credential = await navigator.credentials.get({
    publicKey: {
      ...options,
      challenge: base64UrlToArrayBuffer(options.challenge),
      allowCredentials: options.allowCredentials?.map((descriptor) => ({
        ...descriptor,
        id: base64UrlToArrayBuffer(descriptor.id),
      })),
    },
    mediation: requestOptions.mediation,
    signal: requestOptions.signal,
  })

  if (!(credential instanceof PublicKeyCredential)) {
    throw new Error('PASSKEY_NOT_SELECTED')
  }

  const response = credential.response
  if (!(response instanceof AuthenticatorAssertionResponse)) {
    throw new Error('INVALID_PASSKEY_RESPONSE')
  }

  return {
    id: credential.id,
    rawId: arrayBufferToBase64Url(credential.rawId),
    response: {
      authenticatorData: arrayBufferToBase64Url(response.authenticatorData),
      clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
      signature: arrayBufferToBase64Url(response.signature),
      userHandle: response.userHandle ? arrayBufferToBase64Url(response.userHandle) : null,
    },
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: credential.authenticatorAttachment,
  }
}
