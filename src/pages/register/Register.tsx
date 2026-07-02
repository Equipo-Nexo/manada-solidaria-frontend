import { yupResolver } from '@hookform/resolvers/yup'
import { CarFront, Eye, EyeOff, HandHeart, PawPrint } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation, type SignupRole } from '../../app/services/apis/authApi'
import { useToast } from '../../hooks/toast/useToast'
import {
  AppLogo,
  Field,
  FieldError,
  FieldLabel,
  Form,
  HelpText,
  Input,
  LoginLink,
  LoginText,
  PasswordInputWrapper,
  PasswordToggle,
  PrimaryButton,
  RegisterContainer,
  RegisterContent,
  RegisterFooter,
  RegisterPanel,
  RegisterSubtitle,
  RegisterTitle,
  RequiredMark,
  SwitchControl,
  SwitchGroup,
  SwitchInput,
  SwitchLabelContent,
  SwitchRow,
} from './Register.styles'
import { registerSchema, type RegisterFormValues } from './registerSchema'

function Register() {
  const navigate = useNavigate()
  const toast = useToast()
  const [signup, { isLoading }] = useSignupMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      phone: '',
      isRescuer: false,
      wantsTransporter: false,
    },
    mode: 'onTouched',
    resolver: yupResolver(registerSchema),
  })

  const handleRegister = (values: RegisterFormValues) => {
    const roles: SignupRole[] = []

    if (values.isRescuer) {
      roles.push('RESCUER')
    }

    if (values.wantsTransporter) {
      roles.push('CARRIAGE')
    }

    return signup({
      username: values.username,
      password: values.password,
      repeatedPassword: values.confirmPassword,
      email: values.email,
      ...(roles.length > 0 ? { roles } : {}),
    })
      .unwrap()
      .then(() => {
        toast.success('Registro creado', 'Ya podés iniciar sesión con tu cuenta.')
        navigate('/login', { replace: true })
      })
      .catch(() => {
        toast.error('No pudimos registrarte', 'Revisá los datos e intentá nuevamente.')
      })
  }

  return (
    <RegisterPanel>
      <RegisterContainer>
        <RegisterContent>
          <AppLogo src="/logo.svg" alt="Manada Solidaria" />
          <RegisterTitle>¡Bienvenido a la <br/> Manada!</RegisterTitle>
          <RegisterSubtitle>
            Formá parte de nuestra comunidad de rescatistas y voluntarios.
          </RegisterSubtitle>

          <Form onSubmit={handleSubmit(handleRegister)} noValidate>
            <Field>
              <FieldLabel htmlFor="username">
                Nombre de usuario <RequiredMark aria-hidden="true">*</RequiredMark>
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Ej: MacaRescate"
                autoComplete="username"
                disabled={isLoading}
                aria-describedby={errors.username ? 'register-username-error' : undefined}
                aria-invalid={Boolean(errors.username)}
                $hasError={Boolean(errors.username)}
                {...register('username')}
              />
              {errors.username?.message && (
                <FieldError id="register-username-error">{errors.username.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">
                Correo electrónico <RequiredMark aria-hidden="true">*</RequiredMark>
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                disabled={isLoading}
                aria-describedby={errors.email ? 'register-email-error' : undefined}
                aria-invalid={Boolean(errors.email)}
                $hasError={Boolean(errors.email)}
                {...register('email')}
              />
              {errors.email?.message && (
                <FieldError id="register-email-error">{errors.email.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Número de teléfono</FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="3534 0000-0000"
                autoComplete="tel"
                disabled={isLoading}
                aria-describedby={errors.phone ? 'register-phone-error' : undefined}
                aria-invalid={Boolean(errors.phone)}
                $hasError={Boolean(errors.phone)}
                {...register('phone')}
              />
              {errors.phone?.message && (
                <FieldError id="register-phone-error">{errors.phone.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Contraseña <RequiredMark aria-hidden="true">*</RequiredMark>
              </FieldLabel>
              <PasswordInputWrapper>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={showPassword ? 'contraseña' : '********'}
                  autoComplete="new-password"
                  disabled={isLoading}
                  aria-describedby={errors.password ? 'register-password-error' : undefined}
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
                <FieldError id="register-password-error">{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Repetir contraseña <RequiredMark aria-hidden="true">*</RequiredMark>
              </FieldLabel>
              <PasswordInputWrapper>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={showConfirmPassword ? 'contraseña' : '********'}
                  autoComplete="new-password"
                  disabled={isLoading}
                  aria-describedby={
                    errors.confirmPassword ? 'register-confirm-password-error' : undefined
                  }
                  aria-invalid={Boolean(errors.confirmPassword)}
                  $hasError={Boolean(errors.confirmPassword)}
                  {...register('confirmPassword')}
                />
                <PasswordToggle
                  type="button"
                  aria-label={
                    showConfirmPassword ? 'Ocultar repetir contraseña' : 'Mostrar repetir contraseña'
                  }
                  disabled={isLoading}
                  onClick={() => setShowConfirmPassword((currentValue) => !currentValue)}
                >
                  {showConfirmPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </PasswordToggle>
              </PasswordInputWrapper>
              {errors.confirmPassword?.message && (
                <FieldError id="register-confirm-password-error">
                  {errors.confirmPassword.message}
                </FieldError>
              )}
            </Field>

            <SwitchGroup>
              <SwitchRow>
                <SwitchLabelContent>
                  <HandHeart aria-hidden="true" />
                  <span>¿Sos rescatista?</span>
                </SwitchLabelContent>
                <SwitchInput type="checkbox" disabled={isLoading} {...register('isRescuer')} />
                <SwitchControl aria-hidden="true" />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabelContent>
                  <CarFront aria-hidden="true" />
                  <span>¿Deseas ser transportista?</span>
                </SwitchLabelContent>
                <SwitchInput type="checkbox" disabled={isLoading} {...register('wantsTransporter')} />
                <SwitchControl aria-hidden="true" />
              </SwitchRow>
            </SwitchGroup>

            <HelpText>
              Esta información podrás modificarla en cualquier momento desde tu perfil
            </HelpText>

            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrarse'}
              <PawPrint aria-hidden="true" />
            </PrimaryButton>

            <LoginText>
              ¿Ya tienes cuenta? <LoginLink to="/login">Inicia sesión</LoginLink>
            </LoginText>
          </Form>
        </RegisterContent>
      </RegisterContainer>
      <RegisterFooter>© 2026 Manada Solidaria - Cuidando huellas juntos</RegisterFooter>
    </RegisterPanel>
  )
}

export default Register
