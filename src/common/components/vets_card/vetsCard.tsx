import { useId, useState } from "react";
import { ChevronRight, Phone, Map, Mail } from "@/common/icons";
import * as S from "./vetsCards.styles";
export type ScheduleDay = {
  day: string;
  hours: string;
  isToday: boolean;
};
export type VetsCardProps = {
  name: string;
  address: string;
  todayHours: string;
  schedule?: ScheduleDay[];
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
  onContact?: () => void;
  onMap?: () => void;
  onEmail?: () => void;
};

function VetsCard({
  name,
  address,
  todayHours,
  imageUrl,
  imageAlt,
  schedule,
  description,
  className,
  onContact,
  onMap,
  onEmail,
}: VetsCardProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const scheduleId = useId();
  const hasSchedule = Boolean(schedule?.length);
  return (
    <S.Card className={className}>
      <S.Details>
        <S.ImageWrapper>
          {imageUrl ? (
            <S.Image src={imageUrl} alt={imageAlt ?? `Foto de ${name}`} />
          ) : (
            <S.ImagePlaceholder aria-hidden="true" />
          )}
        </S.ImageWrapper>

        <S.Information>
          <S.Name title={name}>{name}</S.Name>
          <S.Address title={address}>{address}</S.Address>
          <S.TodayHours title={todayHours}>{todayHours}</S.TodayHours>
        </S.Information>
      </S.Details>
      <S.Actions>
        <S.ContactButton type="button" onClick={onContact}>
          <Phone aria-hidden="true" />
          Contactar
        </S.ContactButton>
        <S.IconButton
          type="button"
          aria-label={`Ver ubicación de ${name}`}
          onClick={onMap}
        >
          <Map aria-hidden="true" />
        </S.IconButton>

        <S.IconButton
          type="button"
          aria-label={`Enviar correo a ${name}`}
          onClick={onEmail}
        >
          <Mail aria-hidden="true" />
        </S.IconButton>
      </S.Actions>

      <S.ScheduleButton
        type="button"
        disabled={!hasSchedule}
        aria-expanded={hasSchedule ? isScheduleOpen : undefined}
        aria-controls={hasSchedule ? scheduleId : undefined}
        onClick={() => setIsScheduleOpen((isOpen) => !isOpen)}
      >
        {isScheduleOpen ? "Ocultar horarios" : "Ver horarios"}
        <S.ScheduleIcon $isOpen={isScheduleOpen}>
          <ChevronRight aria-hidden="true" />
        </S.ScheduleIcon>
      </S.ScheduleButton>

      {hasSchedule && isScheduleOpen && (
        <S.Schedule id={scheduleId}>
          {description && <S.Description>{description}</S.Description>}
          {schedule?.map(({ day, hours, isToday }) => (
            <S.ScheduleRow key={day} $isToday={isToday}>
              <S.DayInfo>
                <S.DayName>{day}</S.DayName>
                {isToday && <S.TodayLabel>Hoy</S.TodayLabel>}
              </S.DayInfo>
              <S.DayHours>{hours}</S.DayHours>
            </S.ScheduleRow>
          ))}
        </S.Schedule>
      )}
    </S.Card>
  );
}

export default VetsCard;
