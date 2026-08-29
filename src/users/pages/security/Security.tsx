import { useNavigate } from 'react-router-dom'
import { usePasskeyRegistration } from '@auth/hooks/usePasskeyRegistration'
import { isWebAuthnSupported } from '@auth/app/webauthn/webAuthnAuthentication'
import { ArrowLeft, Check, Lock } from '@/common/icons'
import SecurityIcon from '@/common/icons/Security'
import { Advice } from '@/common/components'
import * as S from './Security.styles'

function Security() {
  const navigate = useNavigate()
  const { configurePasskey, isLoading } = usePasskeyRegistration()
  const isPasskeySupported = isWebAuthnSupported()

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>
        <S.PageTitle>Privacidad y Seguridad</S.PageTitle>
      </S.Header>

      <S.Intro>
        <S.HeroIcon><SecurityIcon /></S.HeroIcon>
        <S.IntroTitle>Protegé el acceso a tu cuenta</S.IntroTitle>
        <S.IntroText>
          Configurá una passkey para ingresar de forma rápida y segura usando el bloqueo de tu dispositivo.
        </S.IntroText>
      </S.Intro>

      <S.PasskeyCard>
        <S.CardHeader>
          <S.CardIcon><Lock aria-hidden="true" /></S.CardIcon>
          <div>
            <S.CardTitle>Acceso con passkey</S.CardTitle>
            <S.CardSubtitle>Sin contraseñas difíciles de recordar</S.CardSubtitle>
          </div>
        </S.CardHeader>

        <S.Benefits>
          <li><Check aria-hidden="true" />Usá tu huella, rostro o PIN del dispositivo.</li>
          <li><Check aria-hidden="true" />La información biométrica nunca se comparte.</li>
          <li><Check aria-hidden="true" />Reduce el riesgo de robo de contraseña.</li>
        </S.Benefits>

        {!isPasskeySupported && (
          <S.UnsupportedMessage role="status">
            Este navegador o dispositivo no admite passkeys.
          </S.UnsupportedMessage>
        )}

        <S.PasskeyButton
          type="button"
          disabled={!isPasskeySupported || isLoading}
          onClick={() => void configurePasskey()}
        >
          {isLoading ? 'Configurando passkey...' : 'Configurar passkey'}
        </S.PasskeyButton>
      </S.PasskeyCard>

      <Advice title="" advice="Podés seguir iniciando sesión con tu usuario y contraseña aunque configures una passkey." />
    </S.Page>
  )
}

export default Security
