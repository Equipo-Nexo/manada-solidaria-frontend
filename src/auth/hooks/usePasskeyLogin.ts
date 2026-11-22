import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useAuthenticateWithPasskeyMutation,
  useGetPasskeyAuthenticationOptionsMutation,
} from '@auth/app/api/passkeyApi'
import { requestPasskeyCredential } from '@auth/app/webauthn/webAuthnAuthentication'
import { setPasskeyPreferred } from '@auth/services/passkeyPreference'
import { getPostAuthDestination } from '@auth/utils/authNavigation'
import { useAppPermissions } from '@hooks/permissions/useAppPermissions'
import { useToast } from '@hooks/toast/useToast'
import { loginSuccess } from '@store/authSlice'
import { useAppDispatch } from '@store/hooks'

export type PasskeyLoginFailureReason =
  | 'cancelled'
  | 'cancelled-or-unavailable'
  | 'unsupported'
  | 'network'
  | 'rejected'
  | 'unknown'

export type PasskeyLoginResult =
  | { status: 'success' }
  | { status: 'failed'; reason: PasskeyLoginFailureReason }

type PasskeyLoginOptions = {
  showFeedback?: boolean
}

type AbortableRequest = {
  abort: () => void
}

function hasErrorName(error: unknown, name: string): boolean {
  return Boolean(
    error
      && typeof error === 'object'
      && 'name' in error
      && error.name === name,
  )
}

function classifyPasskeyError(error: unknown): PasskeyLoginFailureReason {
  if (hasErrorName(error, 'AbortError')) {
    return 'cancelled'
  }

  if (hasErrorName(error, 'NotAllowedError')) {
    return 'cancelled-or-unavailable'
  }

  if (error instanceof Error) {
    if (error.message === 'WEBAUTHN_UNSUPPORTED') {
      return 'unsupported'
    }

    if (error.message === 'PASSKEY_NOT_SELECTED') {
      return 'cancelled-or-unavailable'
    }
  }

  if (error && typeof error === 'object' && 'status' in error) {
    if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
      return 'network'
    }

    if (typeof error.status === 'number') {
      return 'rejected'
    }
  }

  return 'unknown'
}

export function usePasskeyLogin() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { requestLoginPermissions } = useAppPermissions()
  const [getOptions] = useGetPasskeyAuthenticationOptionsMutation()
  const [authenticate] = useAuthenticateWithPasskeyMutation()
  const [isLoading, setIsLoading] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)
  const apiRequestRef = useRef<AbortableRequest | null>(null)
  const inFlightRef = useRef<Promise<PasskeyLoginResult> | null>(null)
  const programmaticCancellationRef = useRef(false)
  const destination = getPostAuthDestination(location)

  const cancelPasskeyLogin = useCallback(() => {
    programmaticCancellationRef.current = true
    controllerRef.current?.abort()
    controllerRef.current = null
    apiRequestRef.current?.abort()
    apiRequestRef.current = null
  }, [])

  const showFailureFeedback = useCallback((reason: PasskeyLoginFailureReason) => {
    if (reason === 'cancelled') {
      return
    }

    if (reason === 'cancelled-or-unavailable') {
      toast.information(
        'Ingreso no completado',
        'Podés volver a intentarlo o usar tu contraseña.',
      )
      return
    }

    if (reason === 'unsupported') {
      toast.information(
        'Passkeys no disponibles',
        'Este navegador o dispositivo no admite el ingreso con passkey.',
      )
      return
    }

    if (reason === 'network') {
      toast.error(
        'No pudimos conectarnos',
        'Revisá tu conexión e intentá nuevamente o ingresá con tu contraseña.',
      )
      return
    }

    toast.error(
      'No fue posible ingresar con passkey',
      'Podés intentarlo nuevamente o ingresar con tu contraseña.',
    )
  }, [toast])

  const loginWithPasskey = useCallback(({
    showFeedback = true,
  }: PasskeyLoginOptions = {}): Promise<PasskeyLoginResult> => {
    if (inFlightRef.current) {
      return inFlightRef.current
    }

    programmaticCancellationRef.current = false
    const controller = new AbortController()
    controllerRef.current = controller
    setIsLoading(true)

    const attempt = (async (): Promise<PasskeyLoginResult> => {
      try {
        const optionsRequest = getOptions()
        apiRequestRef.current = optionsRequest
        const options = await optionsRequest.unwrap()

        if (apiRequestRef.current === optionsRequest) {
          apiRequestRef.current = null
        }

        if (controller.signal.aborted) {
          throw new DOMException('Passkey request cancelled', 'AbortError')
        }

        const credential = await requestPasskeyCredential(options, {
          signal: controller.signal,
        })
        const authenticationRequest = authenticate(credential)
        apiRequestRef.current = authenticationRequest
        const tokens = await authenticationRequest.unwrap()

        if (apiRequestRef.current === authenticationRequest) {
          apiRequestRef.current = null
        }

        if (controller.signal.aborted) {
          throw new DOMException('Passkey request cancelled', 'AbortError')
        }

        setPasskeyPreferred()
        dispatch(loginSuccess(tokens))
        void requestLoginPermissions()
        navigate(destination, { replace: true })

        return { status: 'success' }
      } catch (error) {
        const reason = classifyPasskeyError(error)

        if (showFeedback && !programmaticCancellationRef.current) {
          showFailureFeedback(reason)
        }

        return { status: 'failed', reason }
      }
    })()

    const trackedAttempt = attempt.finally(() => {
      if (controllerRef.current === controller) {
        controllerRef.current = null
      }

      apiRequestRef.current = null
      programmaticCancellationRef.current = false
      setIsLoading(false)

      if (inFlightRef.current === trackedAttempt) {
        inFlightRef.current = null
      }
    })

    inFlightRef.current = trackedAttempt
    return trackedAttempt
  }, [
    authenticate,
    destination,
    dispatch,
    getOptions,
    navigate,
    requestLoginPermissions,
    showFailureFeedback,
  ])

  useEffect(() => cancelPasskeyLogin, [cancelPasskeyLogin])

  return {
    cancelPasskeyLogin,
    loginWithPasskey,
    isLoading,
  }
}
