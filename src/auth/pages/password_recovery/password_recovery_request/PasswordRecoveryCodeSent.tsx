import * as S from "./PasswordRecoveryCodeSent.styles";

export default function PasswordRecoveryCodeSent() {
  return (
    <S.Page>
      <S.Panel aria-labelledby="code-sent-title">
        <S.Content>
          <S.PaperPlane
            src="/password-recovery-paper-plane.svg"
            alt=""
            aria-hidden="true"
          />
          <S.Title id="code-sent-title">Código enviado</S.Title>
          <S.Message>
            <S.Description>
              Si existe una cuenta asociada a ese correo, te enviaremos un
              código de verificación.
            </S.Description>
            <S.Description>
              Revisá tu casilla de mail y también la carpeta de Spam.
            </S.Description>
          </S.Message>
          <S.Actions>
            <S.ContinueButton type="button">Continuar</S.ContinueButton>
            <S.BackLink to="/login">Volver al inicio de sesión</S.BackLink>
          </S.Actions>
        </S.Content>
      </S.Panel>
      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  );
}
