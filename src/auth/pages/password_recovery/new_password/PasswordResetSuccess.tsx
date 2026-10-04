import * as S from "./PasswordResetSuccess.styles";
import { RoundedCheck } from "@/common/icons/RoundedCheck";

export default function PasswordResetSuccess() {
  return (
    <S.Page>
      <S.Panel>
        <S.Content>
          <S.SuccessIcon aria-hidden="true">
            <RoundedCheck width={50} height={50} />
          </S.SuccessIcon>
          <S.Title>¡Listo!</S.Title>
          <S.Message>
            <S.Description>
              Tu contraseña fue modificada correctamente.
            </S.Description>
            <S.Description>
              Ya podés iniciar sesión con tu nueva contraseña.
            </S.Description>
          </S.Message>
          <S.LoginLink to="/login" replace>
            Ir al inicio de sesión
          </S.LoginLink>
        </S.Content>
      </S.Panel>
      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  );
}
