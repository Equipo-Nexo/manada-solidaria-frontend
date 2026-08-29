import { arrayBufferToBase64Url, base64UrlToArrayBuffer } from './webAuthnEncoding'
import { isWebAuthnSupported } from './webAuthnAuthentication'
import type {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON,
} from './webAuthn.types'

export async function createPasskeyCredential(
  options: PublicKeyCredentialCreationOptionsJSON,
): Promise<RegistrationCredentialJSON> {
  if (!isWebAuthnSupported()) {
    throw new Error('WEBAUTHN_UNSUPPORTED')
  }

  const credential = await navigator.credentials.create({
    publicKey: {
      ...options,
      challenge: base64UrlToArrayBuffer(options.challenge),
      user: {
        ...options.user,
        id: base64UrlToArrayBuffer(options.user.id),
      },
      excludeCredentials: options.excludeCredentials?.map((descriptor) => ({
        ...descriptor,
        id: base64UrlToArrayBuffer(descriptor.id),
      })),
    },
  })

  if (!(credential instanceof PublicKeyCredential)) {
    throw new Error('PASSKEY_NOT_CREATED')
  }

  const response = credential.response
  if (!(response instanceof AuthenticatorAttestationResponse)) {
    throw new Error('INVALID_PASSKEY_RESPONSE')
  }

  return {
    id: credential.id,
    rawId: arrayBufferToBase64Url(credential.rawId),
    response: {
      attestationObject: arrayBufferToBase64Url(response.attestationObject),
      clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
      transports: response.getTransports(),
    },
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: credential.authenticatorAttachment,
  }
}
