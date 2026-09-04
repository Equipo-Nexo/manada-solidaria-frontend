import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAuthenticateWithPasskeyMutation,
  useGetPasskeyAuthenticationOptionsMutation,
} from '@auth/app/api/passkeyApi'
import {
  isConditionalMediationSupported,
  requestPasskeyCredential,
} from '@auth/app/webauthn/webAuthnAuthentication'
import type { AuthenticationCredentialJSON } from '@auth/app/webauthn/webAuthn.types'
import { useAppPermissions } from '@hooks/permissions/useAppPermissions'
import { useToast } from '@hooks/toast/useToast'
import { loginSuccess } from '@store/authSlice'
import { useAppDispatch } from '@store/hooks'

function isUserCancellation(error: unknown): boolean {
  return error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'AbortError')
}

export function usePasskeyLogin() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { requestLoginPermissions } = useAppPermissions()
  const [getOptions] = useGetPasskeyAuthenticationOptionsMutation()
  const [authenticate, authenticationState] = useAuthenticateWithPasskeyMutation()
  const [isManualLoginLoading, setIsManualLoginLoading] = useState(false)
  const conditionalControllerRef = useRef<AbortController | null>(null)

  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");

  const finishPasskeyLogin = useCallback(async (credential: AuthenticationCredentialJSON) => {
    const tokens = await authenticate(credential).unwrap()

    dispatch(loginSuccess(tokens))
    void requestLoginPermissions()
    navigate(redirect ? redirect : '/home', { replace: true })
  }, [authenticate, dispatch, navigate, requestLoginPermissions])

  const cancelConditionalLogin = useCallback(() => {
    conditionalControllerRef.current?.abort()
    conditionalControllerRef.current = null
  }, [])

  const loginWithPasskey = useCallback(async () => {
    cancelConditionalLogin()
    setIsManualLoginLoading(true)

    try {
      const options = await getOptions().unwrap()
      const credential = await requestPasskeyCredential(options)
      await finishPasskeyLogin(credential)
    } catch (error) {
      if (isUserCancellation(error)) {
        toast.information(
          'Ingreso cancelado',
          'No se seleccionó ninguna passkey. Podés intentarlo nuevamente cuando quieras.',
        )
        return
      }

      toast.error(
        'No fue posible ingresar con passkey',
        'Verificá que tengas una passkey registrada e intentá nuevamente.',
      )
    } finally {
      setIsManualLoginLoading(false)
    }
  }, [cancelConditionalLogin, finishPasskeyLogin, getOptions, toast])

  const startConditionalLogin = useCallback(async () => {
    cancelConditionalLogin()

    if (!(await isConditionalMediationSupported())) {
      return
    }

    const controller = new AbortController()
    conditionalControllerRef.current = controller

    try {
      const options = await getOptions().unwrap()
      if (controller.signal.aborted) return

      const credential = await requestPasskeyCredential(options, {
        mediation: 'conditional',
        signal: controller.signal,
      })
      if (controller.signal.aborted) return

      await finishPasskeyLogin(credential)
    } catch (error) {
      if (!isUserCancellation(error) && !controller.signal.aborted) {
        console.error('Conditional passkey login failed', error)
      }
    } finally {
      if (conditionalControllerRef.current === controller) {
        conditionalControllerRef.current = null
      }
    }
  }, [cancelConditionalLogin, finishPasskeyLogin, getOptions])

  return {
    cancelConditionalLogin,
    loginWithPasskey,
    startConditionalLogin,
    isLoading: isManualLoginLoading || authenticationState.isLoading,
  }
}
