import { useNavigate } from "react-router-dom";
import { BriefcaseMedical, Clock, Phone } from "@icons/index";
import Stethoscope from "@/common/icons/Stethoscope";
import * as S from "./vetGuardButton.styles";

const VET_GUARD_PHONE_NUMBER = "0353154791156";
const VET_GUARD_DISPLAY_PHONE_NUMBER = "0353 154791156";
const VET_PATH = "/veterinarias";

type VetGuardButtonProps = {
  isActive: boolean;
  className?: string;
  phoneNumber?: string;
  phoneDisplayNumber?: string;
  vetPath?: string;
  activeTitle?: string;
  activeDescription?: string;
  inactiveTitle?: string;
  inactiveDescription?: string;
  desktopReminder?: string;
};

function VetGuardButton({
  isActive,
  className,
  phoneNumber = VET_GUARD_PHONE_NUMBER,
  phoneDisplayNumber = VET_GUARD_DISPLAY_PHONE_NUMBER,
  vetPath = VET_PATH,
  activeTitle = "¿Necesitás ayuda urgente?",
  activeDescription = "La guardia se encuentra disponible en este momento para atender emergencias.",
  inactiveTitle = "La guardia no se encuentra disponible.",
  inactiveDescription = "Consultá las veterinarias disponibles",
  desktopReminder = "Recordá: el sistema de guardia rotativo es únicamente para urgencias",
}: VetGuardButtonProps) {
  const navigate = useNavigate();

  const title = isActive ? activeTitle : inactiveTitle;
  const description = isActive ? activeDescription : inactiveDescription;
  const mobileStatusLabel = isActive ? "Guardia Activa" : "Guardia Inactiva";
  const desktopStatusLabel = isActive
    ? "Guardia Veterinaria Activa"
    : "Guardia Veterinaria Inactiva";
  const actionLabel = isActive ? "Llamar a la guardia" : "Veterinarias";
  const ActionIcon = isActive ? Phone : BriefcaseMedical;
  const handleAction = () => {
    if (isActive) {
      window.location.href = `tel:${phoneNumber}`;
      return;
    }

    navigate(vetPath);
  };

  return (
    <S.Wrapper className={className}>
      <S.Card $isActive={isActive}>
        <S.Header>
          <S.Title>{title}</S.Title>

          <S.StatusBadge $isActive={isActive}>
            <S.StatusDot $isActive={isActive} aria-hidden="true" />
            <S.MobileOnly>{mobileStatusLabel}</S.MobileOnly>
            <S.DesktopOnly>{desktopStatusLabel}</S.DesktopOnly>
          </S.StatusBadge>
        </S.Header>

        <S.DescriptionRow $isActive={isActive}>
          <Stethoscope aria-hidden="true" />
          <S.Description>{description}</S.Description>
        </S.DescriptionRow>

        <S.ActionButton
          type="button"
          onClick={handleAction}
          $isActive={isActive}
        >
          <ActionIcon aria-hidden="true" />
          {actionLabel}
        </S.ActionButton>
      </S.Card>

      <S.DesktopContactCard>
        {isActive ? (
          <>
            <S.ContactTitle>Teléfono de la guardia</S.ContactTitle>

            <S.ContactPhoneRow>
              <Phone aria-hidden="true" />
              <S.ContactPhone>{phoneDisplayNumber}</S.ContactPhone>
            </S.ContactPhoneRow>

            <S.ContactReminderRow>
              <Clock
                width="24"
                height="24"
                color="#8D8580"
                aria-hidden="true"
              />
              <S.ContactReminder>{desktopReminder}</S.ContactReminder>
            </S.ContactReminderRow>
          </>
        ) : (
          <>
            <S.ContactReminderRow>
              <Clock
                width="24"
                height="24"
                color="#8D8580"
                aria-hidden="true"
              />
              <S.ContactReminder>{desktopReminder}</S.ContactReminder>
            </S.ContactReminderRow>

            <S.ActionButton
              type="button"
              onClick={handleAction}
              $isActive={isActive}
              $desktop
            >
              <BriefcaseMedical aria-hidden="true" />
              {actionLabel}
            </S.ActionButton>
          </>
        )}
      </S.DesktopContactCard>
    </S.Wrapper>
  );
}

export default VetGuardButton;
