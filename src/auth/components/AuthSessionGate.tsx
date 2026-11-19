import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PawLoader from '@/common/components/pawLoader/PawLoader'
import { useRefreshSessionMutation } from '@auth/app/api/authApi'
import { useLogout } from '@hooks/auth/useLogout'
import {
  logout,
  sessionCheckStarted,
  sessionRestored,
  sessionVerificationFailed,
  type AuthTokens,
} from '@store/authSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as S from './AuthSessionGate.styles'

let sessionRefreshPromise: Promise<AuthTokens> | null = null

function isInvalidSessionError(error: unknown): boolean {
  if (!error || typeof error !== 'object' || !('status' in error)) {
    return false
  }

  return error.status === 401 || error.status === 403
}

function AuthSessionGate({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { performLogout } = useLogout()
  const sessionStatus = useAppSelector((state) => state.auth.sessionStatus)
  const [refreshSession] = useRefreshSessionMutation()

  useEffect(() => {
    if (sessionStatus !== 'checking') return

    let isSubscribed = true

    if (!sessionRefreshPromise) {
      const refreshPromise = refreshSession().unwrap()
      sessionRefreshPromise = refreshPromise

      void refreshPromise.then(
        () => {
          if (sessionRefreshPromise === refreshPromise) {
            sessionRefreshPromise = null
          }
        },
        () => {
          if (sessionRefreshPromise === refreshPromise) {
            sessionRefreshPromise = null
          }
        },
      )
    }

    const refreshPromise = sessionRefreshPromise

    void refreshPromise.then(
      (tokens) => {
        if (isSubscribed) {
          dispatch(sessionRestored(tokens))
        }
      },
      (error: unknown) => {
        if (!isSubscribed) return

        dispatch(
          isInvalidSessionError(error) ? logout() : sessionVerificationFailed(),
        )
      },
    )

    return () => {
      isSubscribed = false
    }
  }, [dispatch, refreshSession, sessionStatus])

  if (sessionStatus === 'checking') {
    return (
      <S.SessionPage>
        <PawLoader label="Verificando sesión..." size="large" />
      </S.SessionPage>
    )
  }

  if (sessionStatus === 'verification-failed') {
    return (
      <S.SessionPage>
        <S.ErrorPanel role="alert">
          <S.ErrorTitle>No pudimos verificar tu sesión</S.ErrorTitle>
          <S.ErrorDescription>
            Revisá tu conexión e intentá nuevamente. También podés ingresar de
            nuevo con tu usuario y contraseña.
          </S.ErrorDescription>
          <S.ErrorActions>
            <S.PrimaryButton
              type="button"
              onClick={() => dispatch(sessionCheckStarted())}
            >
              Reintentar
            </S.PrimaryButton>
            <S.SecondaryButton
              type="button"
              onClick={() => void performLogout(location)}
            >
              Ingresar con contraseña
            </S.SecondaryButton>
          </S.ErrorActions>
        </S.ErrorPanel>
      </S.SessionPage>
    )
  }

  return children
}

export default AuthSessionGate
