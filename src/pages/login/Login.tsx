import { Eye, EyeOff, Lock, User } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppDescription,
  AppLogo,
  AppTitle,
  Field,
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

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/home')
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
          <AppDescription>Ayudemos juntos a quienes más <br />lo necesitan.</AppDescription>

          <Form onSubmit={handleLogin}>
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
                <Input id="username" name="username" type="text" placeholder="usuario" />
              </Field>

              <Field>
                <FieldHeader htmlFor="password">
                  <Lock aria-hidden="true" />
                  <span>Contraseña</span>
                </FieldHeader>
                <PasswordInputWrapper>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="contraseña"
                  />
                  <PasswordToggle
                    type="button"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </PasswordToggle>
                </PasswordInputWrapper>
              </Field>

              <RecoveryButton type="button" onClick={handleForgotPassword}>
                Olvidé mi contraseña
              </RecoveryButton>

              <PrimaryButton type="submit">Iniciar Sesión</PrimaryButton>
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
