import type { Notification } from "../../app/types/notifications.types";
import NotificationItem from "../notification_item/NotificationItem";
import * as S from "./NotificationList.styles";

type NotificationListProps = {
  notifications: Notification[];
  onNotificationSelect?: () => void;
};

function NotificationList({
  notifications,
  onNotificationSelect,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <S.EmptyState>
        <S.EmptyTitle>No tienes notificaciones</S.EmptyTitle>
        <S.EmptyDescription>
          Cuando tengas novedades, van a aparecer acá.
        </S.EmptyDescription>
      </S.EmptyState>
    );
  }

  return (
    <S.List>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onSelect={onNotificationSelect}
        />
      ))}
    </S.List>
  );
}

export default NotificationList;
