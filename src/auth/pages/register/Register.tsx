import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '@auth/app/api/authApi'
import { useToast } from '@hooks/toast/useToast'
import * as S from './Register.styles'
import { registerSchema, type RegisterFormValues } from '../../app/schemas/registerSchema'
import type { Role } from '@/users/app/types/User.types'
import { Eye, EyeOff, HandHeart, PawPrint, CarFront } from '@icons/index.ts'
import { ErrorMessage } from '@components/index.ts'

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
    const roles: Role[] = []

    if (values.isRescuer) {
      roles.push('RESCUER')
    }

    if (values.wantsTransporter) {
      roles.push('CARRIAGE')
    }

    signup({
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
    <S.RegisterPanel>
      <S.RegisterContainer>
        <S.RegisterContent>
          <S.AppLogo src="/logo.svg" alt="Manada Solidaria" />
          <S.RegisterTitle>
            ¡Bienvenido a la <br /> Manada!
          </S.RegisterTitle>
          <S.RegisterSubtitle>
            Formá parte de nuestra comunidad de rescatistas y voluntarios.
          </S.RegisterSubtitle>

          <S.Form onSubmit={handleSubmit(handleRegister)} noValidate>
            <S.Field>
              <S.FieldLabel htmlFor="username">
                Nombre de usuario <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
              </S.FieldLabel>
              <S.Input
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
              <ErrorMessage
                id="register-username-error"
                message={errors.username?.message}
              />
            </S.Field>

            <S.Field>
              <S.FieldLabel htmlFor="phone">Número de teléfono</S.FieldLabel>
              <S.Input
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
              <ErrorMessage id="register-phone-error" message={errors.phone?.message} />
            </S.Field>

            <S.Field>
              <S.FieldLabel htmlFor="email">
                Correo electrónico <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
              </S.FieldLabel>
              <S.Input
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
              <ErrorMessage id="register-email-error" message={errors.email?.message} />
            </S.Field>

            <S.Field>
              <S.FieldLabel htmlFor="password">
                Contraseña <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
              </S.FieldLabel>
              <S.PasswordInputWrapper>
                <S.Input
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
                <S.PasswordToggle
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  disabled={isLoading}
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                >
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
              <ErrorMessage
                id="register-password-error"
                message={errors.password?.message}
              />
            </S.Field>

            <S.Field>
              <S.FieldLabel htmlFor="confirmPassword">
                Repetir contraseña <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
              </S.FieldLabel>
              <S.PasswordInputWrapper>
                <S.Input
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
                <S.PasswordToggle
                  type="button"
                  aria-label={
                    showConfirmPassword ? 'Ocultar repetir contraseña' : 'Mostrar repetir contraseña'
                  }
                  disabled={isLoading}
                  onClick={() => setShowConfirmPassword((currentValue) => !currentValue)}
                >
                  {showConfirmPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
              <ErrorMessage
                id="register-confirm-password-error"
                message={errors.confirmPassword?.message}
              />
            </S.Field>

            <S.SwitchGroup>
              <S.SwitchRow>
                <S.SwitchLabelContent>
                  <HandHeart aria-hidden="true" />
                  <span>¿Sos rescatista?</span>
                </S.SwitchLabelContent>
                <S.SwitchInput type="checkbox" disabled={isLoading} {...register('isRescuer')} />
                <S.SwitchControl aria-hidden="true" />
              </S.SwitchRow>
              <S.SwitchRow>
                <S.SwitchLabelContent>
                  <CarFront aria-hidden="true" />
                  <span>¿Deseas ser transportista?</span>
                </S.SwitchLabelContent>
                <S.SwitchInput type="checkbox" disabled={isLoading} {...register('wantsTransporter')} />
                <S.SwitchControl aria-hidden="true" />
              </S.SwitchRow>
            </S.SwitchGroup>

            <S.HelpText>
              Esta información podrás modificarla en cualquier momento desde tu perfil
            </S.HelpText>

            <S.PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrarse'}
              <PawPrint aria-hidden="true" />
            </S.PrimaryButton>

            <S.LoginText>
              ¿Ya tienes cuenta? <S.LoginLink to="/login">Inicia sesión</S.LoginLink>
            </S.LoginText>
          </S.Form>
        </S.RegisterContent>
      </S.RegisterContainer>
      <S.RegisterFooter>© 2026 Manada Solidaria - Cuidando huellas juntos</S.RegisterFooter>
    </S.RegisterPanel>
  )
}

export default Register
