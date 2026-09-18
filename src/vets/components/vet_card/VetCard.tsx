import { useId, useState } from "react";
import { ChevronRight, Phone, Map, Mail } from "@/common/icons";
import * as S from "./VetCard.styles";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/common/hooks/toast/useToast";
import {
  formatSchedule,
  getCurrentDayOfWeek,
  getTodayHours,
} from "@/vets/utils/VetScheduleUtils";
import type { VetResponse } from "@/vets/app/api/responses/vetsResponse";
import { openWhatsApp } from "@/common/utils/Whatsapp";
import { openGmail } from "@/common/utils/Gmail";

export type ScheduleDay = {
  day: string;
  hours: string;
  isToday: boolean;
};

export type VetCardProps = {
  vet: VetResponse;
  className?: string;
};

function VetCard({ vet, className }: VetCardProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const scheduleId = useId();

  const navigate = useNavigate();
  const toast = useToast();

  const today = getCurrentDayOfWeek();

  const todayHours = getTodayHours(vet.calendar, today);
  const schedule = formatSchedule(vet.calendar, today);

  const hasSchedule = Boolean(schedule.length);

  const imageUrl = vet.profilePictureUrl
    ? `${import.meta.env.VITE_CLOUDFLARE_URL}${vet.profilePictureUrl}`
    : undefined;
  const formatVetAddress = (
    address?: string | null,
    number?: number | null,
  ) => {
    if (!address && !number) {
      return "Dirección no disponible";
    }
    return [address, number].filter(Boolean).join(" ");
  };
  const address = formatVetAddress(vet.location.address, vet.location.number);

  const handleContact = () => {
    openWhatsApp(
      `${vet.phoneNumber.areaCode}${vet.phoneNumber.number}`,
      `Hola ${vet.name}, me comunico con ustedes a través de Manada Solidaria.`,
    );
  };

  const handleMap = () => {
    navigate(
      `/mapa?latitude=${vet.location.latitude}&longitude=${vet.location.longitude}`,
    );
  };

  const handleEmail = () => {
    if (!vet.email) {
      toast.error("No existe correo electrónico asociado");
      return;
    }

    openGmail(
      vet.email,
      `Consulta - ${vet.name}`,
      `Hola ${vet.name}, me comunico con ustedes a través de Manada Solidaria.`,
    );
  };

  return (
    <S.Card className={className}>
      <S.Details>
        <S.ImageWrapper>
          {imageUrl ? (
            <S.Image src={imageUrl} alt={`Foto de ${vet.name}`} />
          ) : (
            <S.ImagePlaceholder aria-hidden="true" />
          )}
        </S.ImageWrapper>

        <S.Information>
          <S.Name title={vet.name}>{vet.name}</S.Name>
          <S.Address title={address}>{address}</S.Address>
          <S.TodayHours title={todayHours}>{todayHours}</S.TodayHours>
        </S.Information>
      </S.Details>

      <S.Actions>
        <S.ContactButton
          type="button"
          onClick={handleContact}
          disabled={!vet.phoneNumber?.areaCode || !vet.phoneNumber?.number}
        >
          <Phone aria-hidden="true" />
          Contactar
        </S.ContactButton>

        <S.IconButton
          type="button"
          aria-label={`Ver ubicación de ${vet.name}`}
          onClick={handleMap}
        >
          <Map aria-hidden="true" />
        </S.IconButton>
        {vet.email && (
          <S.IconButton
            type="button"
            aria-label={`Enviar correo a ${vet.name}`}
            onClick={handleEmail}
          >
            <Mail aria-hidden="true" />
          </S.IconButton>
        )}
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
          {vet.description && <S.Description>{vet.description}</S.Description>}
          {schedule.map(({ day, hours, isToday }) => (
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

export default VetCard;
