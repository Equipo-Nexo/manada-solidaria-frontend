import { useNavigate } from "react-router-dom";
import type { Notification } from "../../app/types/notifications.types";
import * as S from "./NotificationItem.styles";
import { useMarkNotificationAsReadMutation } from "@/notifications/app/api/notificationsApi";
import { formatDateTimeLong } from "@/common/utils/DateTime";

type NotificationItemProps = {
  notification: Notification;
  onSelect?: () => void;
};

function NotificationItem({ notification, onSelect }: NotificationItemProps) {
  const navigate = useNavigate();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const { title, description, createdAt, readed, redirectTo } = notification;

  const canNavigate =
    !!redirectTo &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//") &&
    !redirectTo.includes("\\");

  const handleClick = async () => {
    if (!canNavigate || !redirectTo) return;
    if (!readed) {
      try {
        await markNotificationAsRead(notification.id).unwrap();
      } catch {
        return;
      }
    }
    onSelect?.();
    navigate(redirectTo);
  };

  const { date, time } = formatDateTimeLong(createdAt);

  const content = (
    <>
      <S.Header>
        <S.Title>{title}</S.Title>
        {!readed && <S.UnreadIndicator aria-label="Sin leer" />}
      </S.Header>
      <S.Description>{description}</S.Description>
      <S.DateText>
        {date}, {time}
      </S.DateText>
    </>
  );

  return (
    <S.Item $unread={!readed}>
      {canNavigate ? (
        <S.ItemButton type="button" onClick={handleClick}>
          {content}
        </S.ItemButton>
      ) : (
        <S.ItemContent>{content}</S.ItemContent>
      )}
    </S.Item>
  );
}

export default NotificationItem;
