import { yupResolver } from '@hookform/resolvers/yup'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../app/services/apis/authApi'
import { loginSuccess } from '../../app/store/authSlice'
import { useAppDispatch } from '../../app/store/hooks'
import { useToast } from '../../hooks/useToast'
import {
  AppDescription,
  AppLogo,
  AppTitle,
  Field,
  FieldError,
  FieldHeader,
  FormFields,
  Form,
  Input,
  LoginContainer,
  LoginContent,
  LoginFooter,
  LoginPanel,
  PasswordInputWrapper,
  PasswordToggle,
  PrimaryButton,
  RecoveryButton,
  RegisterLink,
  RegisterText,
  WelcomeSubtitle,
  WelcomeTitle,
} from './Login.styles'
import { loginSchema, type LoginFormValues } from './loginSchema'

function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
  })

  const handleLogin = ({ username, password }: LoginFormValues) => {
    const authorization = `Basic ${btoa(`${username}:${password}`)}`

    return login({ authorization })
      .unwrap()
      .then((tokens) => {
        dispatch(loginSuccess(tokens))
        navigate('/home', { replace: true })
      })
      .catch(() => {
        toast.error(
          'No pudimos iniciar sesión',
          'Revisá tu usuario y contraseña e intentá nuevamente.',
        )
      })
  }

  const handleForgotPassword = () => {
    console.log('Olvidé mi contraseña')
  }

  return (
    <LoginPanel>
      <LoginContainer>
        <LoginContent>
          <AppLogo src="/logo.svg" alt="Manada Solidaria" />
          <AppTitle>
            Manada
            <br />
            Solidaria
          </AppTitle>
          <AppDescription>
            Ayudemos juntos a quienes más <br />
            lo necesitan.
          </AppDescription>

          <Form onSubmit={handleSubmit(handleLogin)} aria-busy={isLoading} noValidate>
            <div>
              <WelcomeTitle>¡Bienvenido!</WelcomeTitle>
              <WelcomeSubtitle>Inicia sesión para seguir ayudando</WelcomeSubtitle>
            </div>

            <FormFields>
              <Field>
                <FieldHeader htmlFor="username">
                  <User aria-hidden="true" />
                  <span>Usuario</span>
                </FieldHeader>
                <Input
                  id="username"
                  type="text"
                  placeholder="usuario"
                  autoComplete="username"
                  disabled={isLoading}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={Boolean(errors.username)}
                  $hasError={Boolean(errors.username)}
                  {...register('username')}
                />
                {errors.username?.message && (
                  <FieldError id="username-error">{errors.username.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldHeader htmlFor="password">
                  <Lock aria-hidden="true" />
                  <span>Contraseña</span>
                </FieldHeader>
                <PasswordInputWrapper>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={showPassword ? 'contraseña' : '********'}
                    autoComplete="current-password"
                    disabled={isLoading}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    aria-invalid={Boolean(errors.password)}
                    $hasError={Boolean(errors.password)}
                    {...register('password')}
                  />
                  <PasswordToggle
                    type="button"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    disabled={isLoading}
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </PasswordToggle>
                </PasswordInputWrapper>
                {errors.password?.message && (
                  <FieldError id="password-error">{errors.password.message}</FieldError>
                )}
              </Field>

              <RecoveryButton type="button" onClick={handleForgotPassword}>
                Olvidé mi contraseña
              </RecoveryButton>

              <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
              </PrimaryButton>
            </FormFields>
          </Form>

          <RegisterText>
            ¿No tienes cuenta? <RegisterLink href="/registro">Regístrate</RegisterLink>
          </RegisterText>
        </LoginContent>
      </LoginContainer>
      <LoginFooter>© 2026 Manada Solidaria - Cuidando huellas juntos</LoginFooter>
    </LoginPanel>
  )
}

export default Login
