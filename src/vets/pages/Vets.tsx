import Arrow from "@/common/icons/Arrow";
import * as S from "./Vets.styles";
import { useNavigate } from "react-router-dom";
import VetsCard from "@/common/components/vets_card/vetsCard";
import { useGetVetsQuery } from "../app/api/vetsApi";
import { openWhatsApp } from "@/common/utils/Whatsapp";
import {
  formatSchedule,
  getCurrentDayOfWeek,
  getTodayHours,
} from "@/vets/utils/VetScheduleUtils";
import { useToast } from "@/common/hooks/toast/useToast";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import { openGmail } from "@/common/utils/Gmail";
export default function Vets() {
  const navigate = useNavigate();
  const { data: vets, isLoading, isError, refetch } = useGetVetsQuery();
  const toast = useToast();
  const formatVetAddress = (
    address?: string | null,
    number?: number | null,
  ) => {
    if (!address && !number) {
      return "Dirección no disponible";
    }
    return [address, number].filter(Boolean).join(" ");
  };

  if (isLoading) {
    return <PawLoader label="Cargando veterinarias..." />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate("/home")}>
          <Arrow aria-hidden="true" />
        </S.BackButton>

        <S.Title>Veterinarias</S.Title>
      </S.Header>
      {isError && (
        <S.MessageContainer role="alert">
          <Message
            message="No se pudieron cargar las veterinarias."
            iconName="pawPrint"
          />
          <S.RetryButton type="button" onClick={() => void refetch()}>
            Reintentar
          </S.RetryButton>
        </S.MessageContainer>
      )}
      {!isError && (
        <S.VetsList>
          {vets?.map((vet) => {
            const today = getCurrentDayOfWeek();
            const todayHours = getTodayHours(vet.calendar, today);
            const schedule = formatSchedule(vet.calendar, today);
            return (
              <VetsCard
                key={vet.id}
                name={vet.name}
                address={formatVetAddress(
                  vet.location.address,
                  vet.location.number,
                )}
                todayHours={todayHours}
                description={vet.description}
                imageUrl={
                  vet.profilePictureUrl
                    ? `${import.meta.env.VITE_CLOUDFLARE_URL}${vet.profilePictureUrl}`
                    : undefined
                }
                imageAlt={`Foto de ${vet.name}`}
                schedule={schedule}
                onContact={() =>
                  openWhatsApp(
                    `${vet.phoneNumber.areaCode}${vet.phoneNumber.number}`,
                    `Hola ${vet.name}, me comunico con ustedes a través de Manada Solidaria.`,
                  )
                }
                onMap={() => {
                  navigate(
                    `/mapa?latitude=${vet.location.latitude}&longitude=${vet.location.longitude}`,
                  );
                }}
                onEmail={() => {
                  if (!vet.email) {
                    toast.error("No existe correo electrónico asociado");
                    return;
                  }
                  openGmail(
                    vet.email,
                    `Consulta - ${vet.name}`,
                    `Hola ${vet.name}, me comunico con ustedes a través de Manada Solidaria.`,
                  );
                }}
              />
            );
          })}
        </S.VetsList>
      )}
    </S.Container>
  );
}
