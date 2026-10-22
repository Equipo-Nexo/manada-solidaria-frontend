import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import useAuth from "@hooks/auth/useAuth";
import {
  useGetUserNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from "../app/api/notificationsApi";
import NotificationList from "../components/notification_list/NotificationList";
import * as S from "./NotificationPage.styles";
import Arrow from "@/common/icons/Arrow";
import Check from "@/common/icons/Check";
function NotificationPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { data, isLoading, isError, refetch } = useGetUserNotificationsQuery(
    userId ?? skipToken,
  );
  const [markAllNotificationsAsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsAsReadMutation();
  const notifications = data?.notifications ?? [];
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead().unwrap();
    } catch (error) {
      console.error("Error al marcar las notificaciones como leídas", error);
    }
  };

  return (
    <S.Page>
      <S.Header>
        <S.BackButton
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Volver al inicio"
        >
          <Arrow aria-hidden="true" />
        </S.BackButton>

        <S.Title>Notificaciones</S.Title>
        {data?.hasUnreadNotification && (
          <S.MarkAllButton
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
            aria-busy={isMarkingAll}
          >
            <Check aria-hidden="true" />
            <span>{isMarkingAll ? "Marcando..." : "Marcar todas como leídas"}</span>
          </S.MarkAllButton>
        )}
      </S.Header>

      <S.Content>
        {isLoading ? (
          <S.Message>Cargando notificaciones...</S.Message>
        ) : isError ? (
          <S.ErrorContainer>
            <S.Message>No pudimos cargar tus notificaciones.</S.Message>

            <S.RetryButton type="button" onClick={() => refetch()}>
              Reintentar
            </S.RetryButton>
          </S.ErrorContainer>
        ) : (
          <NotificationList notifications={notifications} />
        )}
      </S.Content>
    </S.Page>
  );
}

export default NotificationPage;
