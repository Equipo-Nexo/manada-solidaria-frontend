import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import useAuth from "@hooks/auth/useAuth";
import {
  useGetUserNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from "../../app/api/notificationsApi";
import NotificationList from "../notification_list/NotificationList";
import * as S from "./NotificationPopover.styles";
import { Check, X } from "@/common/icons";

type NotificationsPopoverProps = {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

function NotificationsPopover({
  onClose,
  triggerRef,
}: NotificationsPopoverProps) {
  const { userId } = useAuth();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError, refetch } = useGetUserNotificationsQuery(
    userId ?? skipToken,
  );
  const [markAllNotificationsAsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsAsReadMutation();

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead().unwrap();
    } catch (error) {
      console.error("Error al marcar las notificaciones como leídas", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, triggerRef]);

  const notifications = data?.notifications ?? [];

  return (
    <S.Popover ref={popoverRef} role="region" aria-label="Notificaciones">
      <S.Header>
        <S.HeaderTop>
          <S.Title>Notificaciones</S.Title>
          <S.CloseButton
            type="button"
            onClick={onClose}
            aria-label="Cerrar notificaciones"
          >
            <X aria-hidden="true" />
          </S.CloseButton>
        </S.HeaderTop>
        {data?.hasUnreadNotification && (
          <S.MarkAllButton
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
          >
            <Check aria-hidden="true" />
            {isMarkingAll ? "Marcando..." : "Marcar todas como leídas"}
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
          <NotificationList
            notifications={notifications}
            onNotificationSelect={onClose}
          />
        )}
      </S.Content>
    </S.Popover>
  );
}

export default NotificationsPopover;
