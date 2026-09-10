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
const formatVetAddress = (address?: string | null, number?: number | null) => {
  if (!address && !number) {
    return "Dirección no disponible";
  }

  return [address, number].filter(Boolean).join(" ");
};
export default function Vets() {
  const navigate = useNavigate();
  const { data: vets, isLoading, isError, error } = useGetVetsQuery();
  const toast = useToast();
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    console.error("Error obteniendo veterinarias:", error);
    return <div>Error al cargar las veterinarias</div>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate("/home")}>
          <Arrow aria-hidden="true" />
        </S.BackButton>

        <S.Title>Veterinarias</S.Title>
      </S.Header>

      <S.VetsList>
        {vets?.map((vet) => {
          const todayHours = getTodayHours(vet.calendar, getCurrentDayOfWeek());
          const schedule = formatSchedule(vet.calendar);

          return (
            <VetsCard
              key={vet.id}
              name={vet.name}
              address={formatVetAddress(
                vet.location.address,
                vet.location.number,
              )}
              todayHours={todayHours}
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
              onEmail={() => {
                if (!vet.email) {
                  toast.error("No existe correo electrónico asociado");
                  return;
                }
                const email = encodeURIComponent(vet.email);
                const subject = encodeURIComponent(`Consulta - ${vet.name}`);
                const body = encodeURIComponent(
                  `Hola, me comunico con ustedes a través de Manada Solidaria.`,
                );
                window.open(
                  `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`,
                  "_blank",
                );
              }}
            />
          );
        })}
      </S.VetsList>
    </S.Container>
  );
}
