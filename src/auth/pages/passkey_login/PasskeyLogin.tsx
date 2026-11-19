import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  usePasskeyLogin,
  type PasskeyLoginFailureReason,
} from '@auth/hooks/usePasskeyLogin'
import { isWebAuthnSupported } from '@auth/app/webauthn/webAuthnAuthentication'
import { getAuthNavigationState } from '@auth/utils/authNavigation'
import { Fingerprint } from '@icons/index.ts'
import * as S from './PasskeyLogin.styles'

type ScreenStatus = 'ready' | 'waiting' | 'success' | PasskeyLoginFailureReason

const statusCopy: Record<ScreenStatus, { title: string; description: string }> = {
  ready: {
    title: 'Preparando el acceso seguro',
    description: 'En un momento, tu dispositivo te pedirá que confirmes tu identidad.',
  },
  waiting: {
    title: 'Confirmá tu identidad',
    description: 'Seguí las indicaciones de tu dispositivo para continuar.',
  },
  success: {
    title: '¡Listo!',
    description: 'Estamos ingresando a tu cuenta.',
  },
  cancelled: {
    title: 'El intento se canceló',
    description: 'Podés volver a intentarlo cuando quieras o ingresar con tu contraseña.',
  },
  'cancelled-or-unavailable': {
    title: 'No pudimos completar el acceso',
    description: 'Intentá nuevamente o ingresá con tu contraseña.',
  },
  unsupported: {
    title: 'El acceso con passkey no está disponible en este navegador',
    description: 'Podés ingresar de forma segura con tu usuario y contraseña.',
  },
  network: {
    title: 'No pudimos conectarnos',
    description: 'Revisá tu conexión e intentá nuevamente.',
  },
  rejected: {
    title: 'No pudimos validar el acceso',
    description: 'Intentá nuevamente o ingresá con tu contraseña.',
  },
  unknown: {
    title: 'Algo no salió como esperábamos',
    description: 'Podés volver a intentarlo o ingresar con tu contraseña.',
  },
}

function PasskeyLogin() {
  const location = useLocation()
  const navigate = useNavigate()
  const { loginWithPasskey, cancelPasskeyLogin, isLoading } = usePasskeyLogin()
  const passkeySupported = isWebAuthnSupported()
  const [status, setStatus] = useState<ScreenStatus>(
    passkeySupported ? 'ready' : 'unsupported',
  )
  const automaticAttemptStartedRef = useRef(false)
  const attemptInProgressRef = useRef(false)
  const mountedRef = useRef(false)

  const attemptPasskeyLogin = useCallback(async () => {
    if (!passkeySupported || attemptInProgressRef.current) {
      if (!passkeySupported) setStatus('unsupported')
      return
    }

    attemptInProgressRef.current = true
    setStatus('waiting')

    try {
      const result = await loginWithPasskey({ showFeedback: false })

      if (!mountedRef.current) return

      if (result.status === 'success') {
        setStatus('success')
        return
      }

      setStatus(result.reason)
    } catch {
      if (mountedRef.current) setStatus('unknown')
    } finally {
      attemptInProgressRef.current = false
    }
  }, [loginWithPasskey, passkeySupported])

  useEffect(() => {
    let effectIsActive = true
    mountedRef.current = true

    queueMicrotask(() => {
      if (!effectIsActive || automaticAttemptStartedRef.current) return

      automaticAttemptStartedRef.current = true
      void attemptPasskeyLogin()
    })

    return () => {
      effectIsActive = false
      mountedRef.current = false
      cancelPasskeyLogin()
    }
  }, [attemptPasskeyLogin, cancelPasskeyLogin])

  const handlePasswordLogin = () => {
    cancelPasskeyLogin()

    navigate(
      { pathname: '/login', search: location.search },
      {
        replace: true,
        state: { ...getAuthNavigationState(location), usePassword: true },
      },
    )
  }

  const visibleStatus = isLoading ? 'waiting' : status
  const copy = statusCopy[visibleStatus]
  const interactionPending = isLoading || status === 'waiting' || status === 'success'

  return (
    <S.Page aria-labelledby="passkey-login-title">
      <S.Card>
        <S.BrandLogo src="/logo.svg" alt="Manada Solidaria" />

        <S.FingerprintBadge aria-hidden="true">
          <Fingerprint />
        </S.FingerprintBadge>

        <S.Title id="passkey-login-title">¡Qué bueno verte de nuevo!</S.Title>
        <S.Subtitle>Ingresá de forma rápida y segura</S.Subtitle>
        <S.Explanation>
          Usá la huella, el reconocimiento facial o el PIN de este dispositivo. No
          necesitás escribir tu contraseña.
        </S.Explanation>

        <S.StatusPanel role="status" aria-live="polite" aria-atomic="true">
          <S.StatusIndicator $active={visibleStatus === 'waiting'} aria-hidden="true" />
          <S.StatusContent>
            <S.StatusTitle>{copy.title}</S.StatusTitle>
            <S.StatusDescription>{copy.description}</S.StatusDescription>
          </S.StatusContent>
        </S.StatusPanel>

        <S.Actions>
          <S.PrimaryButton
            type="button"
            disabled={!passkeySupported || interactionPending}
            aria-busy={interactionPending}
            onClick={() => void attemptPasskeyLogin()}
          >
            <Fingerprint aria-hidden="true" />
            {!passkeySupported
              ? 'Passkey no disponible'
              : interactionPending
                ? 'Esperando confirmación…'
                : 'Reintentar con passkey'}
          </S.PrimaryButton>
          <S.SecondaryButton type="button" onClick={handlePasswordLogin}>
            Ingresar con contraseña
          </S.SecondaryButton>
        </S.Actions>
      </S.Card>

      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  )
}

export default PasskeyLogin
