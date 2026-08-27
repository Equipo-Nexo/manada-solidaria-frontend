import { usePasskeyRegistration } from '@auth/hooks/usePasskeyRegistration'
import { isWebAuthnSupported } from '@auth/app/webauthn/webAuthnAuthentication'
import * as S from './Profile.styles'

export default function Profile() {
  const { configurePasskey, isLoading } = usePasskeyRegistration()
  const passkeySupported = isWebAuthnSupported()

  return (
    <S.Container>
      <S.PasskeyButton
        type="button"
        disabled={!passkeySupported || isLoading}
        onClick={() => void configurePasskey()}
      >
        {isLoading ? 'Configurando passkey...' : 'Configurar passkey'}
      </S.PasskeyButton>
    </S.Container>
  )
}
