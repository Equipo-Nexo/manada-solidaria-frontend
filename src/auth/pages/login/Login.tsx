import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from '@icons/index.ts'
import { ErrorMessage } from '@components/index.ts'
import { useLoginMutation } from '@auth/app/api/authApi'
import { loginSuccess } from '@store/authSlice'
import { useAppDispatch } from '@store/hooks'
import { useAppPermissions } from '@hooks/permissions/useAppPermissions'
import { useToast } from '@hooks/toast/useToast'
import * as S from './Login.styles'
import { loginSchema, type LoginFormValues } from '@auth/app/schemas/loginSchema'
import { scrollToFirstFormError } from '@utils/scrollToFirstFormError'
import { isWebAuthnSupported } from '@auth/app/webauthn/webAuthnAuthentication'
import { usePasskeyLogin } from '@auth/hooks/usePasskeyLogin'
declare const __APP_VERSION__: string;

function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useAppDispatch()
  const { requestLoginPermissions } = useAppPermissions()
  const [login, { isLoading }] = useLoginMutation()
  const {
    cancelConditionalLogin,
    loginWithPasskey,
    startConditionalLogin,
    isLoading: isPasskeyLoading,
  } = usePasskeyLogin()
  const [showPassword, setShowPassword] = useState(false)
  const passkeySupported = isWebAuthnSupported()
  const isAuthenticating = isLoading || isPasskeyLoading
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    const startTimer = window.setTimeout(() => void startConditionalLogin(), 0)

    return () => {
      window.clearTimeout(startTimer)
      cancelConditionalLogin()
    }
  }, [cancelConditionalLogin, startConditionalLogin])

  const handleLogin = ({ username, password }: LoginFormValues) => {
    cancelConditionalLogin()
    const authorization = `Basic ${btoa(`${username}:${password}`)}`

    login({ authorization })
      .unwrap()
      .then((tokens) => {
        dispatch(loginSuccess(tokens))
        void requestLoginPermissions()
        navigate('/home', { replace: true })
      })
      .catch(() => {
        toast.error(
          'No fue posible iniciar tu sesión',
          'Revisá tu usuario y contraseña e intentá nuevamente.',
        )
      })
  }

  const handleForgotPassword = () => {
    console.log('Olvidé mi contraseña')
  }

  return (
    <S.LoginPanel>
      <S.LoginContainer>
        <S.LoginContent>
          <S.AppLogo src="/logo.svg" alt="Manada Solidaria" />
          <S.AppTitle>
            Manada
            <br />
            Solidaria
          </S.AppTitle>
          <S.AppDescription>
            Ayudemos juntos a quienes más <br />
            lo necesitan.
          </S.AppDescription>

          <S.Form onSubmit={handleSubmit(handleLogin, scrollToFirstFormError)} aria-busy={isAuthenticating} noValidate>
            <div>
              <S.WelcomeTitle>¡Hola de nuevo!</S.WelcomeTitle>
              <S.WelcomeSubtitle>Inicia sesión para seguir ayudando</S.WelcomeSubtitle>
            </div>

            <S.FormFields>
              <S.Field>
                <S.FieldHeader htmlFor="username">
                  <User aria-hidden="true" />
                  <span>Usuario</span>
                </S.FieldHeader>
                <S.Input
                  id="username"
                  type="text"
                  placeholder="usuario"
                  autoComplete="username webauthn"
                  disabled={isAuthenticating}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={Boolean(errors.username)}
                  $hasError={Boolean(errors.username)}
                  {...register('username')}
                />
                <ErrorMessage id="username-error" message={errors.username?.message} />
              </S.Field>

              <S.Field>
                <S.FieldHeader htmlFor="password">
                  <Lock aria-hidden="true" />
                  <span>Contraseña</span>
                </S.FieldHeader>
                <S.PasswordInputWrapper>
                  <S.Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={showPassword ? 'contraseña' : '********'}
                    autoComplete="current-password"
                    disabled={isAuthenticating}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    aria-invalid={Boolean(errors.password)}
                    $hasError={Boolean(errors.password)}
                    {...register('password')}
                  />
                  <S.PasswordToggle
                    type="button"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    disabled={isAuthenticating}
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </S.PasswordToggle>
                </S.PasswordInputWrapper>
                <ErrorMessage id="password-error" message={errors.password?.message} />
              </S.Field>

              <S.RecoveryButton type="button" onClick={handleForgotPassword}>
                Olvidé mi contraseña
              </S.RecoveryButton>

              <S.PrimaryButton type="submit" disabled={isAuthenticating}>
                {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
              </S.PrimaryButton>

              {passkeySupported && (
                <>
                  <S.LoginDivider>
                    <span>o</span>
                  </S.LoginDivider>
                  <S.PasskeyButton
                    type="button"
                    disabled={isAuthenticating}
                    onClick={() => void loginWithPasskey()}
                  >
                    {isPasskeyLoading ? 'Esperando confirmación...' : 'Ingresar con passkey'}
                  </S.PasskeyButton>
                </>
              )}
            </S.FormFields>
          </S.Form>

          <S.RegisterText>
            ¿No tienes cuenta? <S.RegisterLink href="/registro">Regístrate</S.RegisterLink>
          </S.RegisterText>
        </S.LoginContent>
      </S.LoginContainer>
      <S.LoginFooter>© 2026 Manada Solidaria - Cuidando huellas juntos</S.LoginFooter>
      <S.LoginFooter>v{__APP_VERSION__}</S.LoginFooter>
    </S.LoginPanel>
  )
}

export default Login
