import { useCallback } from 'react'
import {
  useGetPasskeyRegistrationOptionsMutation,
  useRegisterPasskeyMutation,
} from '@auth/app/api/passkeyRegistrationApi'
import { createPasskeyCredential } from '@auth/app/webauthn/webAuthnRegistration'
import { useToast } from '@hooks/toast/useToast'

function isUserCancellation(error: unknown): boolean {
  return error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'AbortError')
}

export function usePasskeyRegistration() {
  const toast = useToast()
  const [getOptions, optionsState] = useGetPasskeyRegistrationOptionsMutation()
  const [registerPasskey, registrationState] = useRegisterPasskeyMutation()

  const configurePasskey = useCallback(async () => {
    try {
      const options = await getOptions().unwrap()
      const credential = await createPasskeyCredential(options)
      const result = await registerPasskey({
        publicKey: {
          credential,
          label: 'Passkey de Manada Solidaria',
        },
      }).unwrap()

      if (!result.success) {
        throw new Error('PASSKEY_REGISTRATION_REJECTED')
      }

      toast.success(
        'Passkey configurada',
        'Ya podés usarla para iniciar sesión sin contraseña.',
      )
    } catch (error) {
      if (isUserCancellation(error)) {
        toast.information(
          'Configuración cancelada',
          'No se creó ninguna passkey. Podés intentarlo nuevamente cuando quieras.',
        )
        return
      }

      toast.error(
        'No fue posible configurar la passkey',
        'Intentá nuevamente o verificá la configuración de seguridad del dispositivo.',
      )
    }
  }, [getOptions, registerPasskey, toast])

  return {
    configurePasskey,
    isLoading: optionsState.isLoading || registrationState.isLoading,
  }
}
