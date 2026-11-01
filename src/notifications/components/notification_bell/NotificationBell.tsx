import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { Bell } from "@icons/index";
import useAuth from "@hooks/auth/useAuth";
import { useGetUserNotificationsQuery } from "../../app/api/notificationsApi";
import * as S from "./NotificationBell.styles";
import NotificationsPopover from "../notification_popover/NotificationPopover";
import { useCallback, useEffect, useRef, useState } from "react";
function NotificationBell() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const { data } = useGetUserNotificationsQuery(userId ?? skipToken);
  const hasUnreadNotifications = data?.hasUnreadNotification ?? false;
  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);
  const handleClick = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      setIsPopoverOpen(false);
      navigate("/notificaciones");
      return;
    }
    setIsPopoverOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleScreenChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsPopoverOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <S.BellContainer>
      <S.BellButton
        ref={bellRef}
        type="button"
        aria-label="Notificaciones"
        aria-expanded={isPopoverOpen}
        onClick={handleClick}
      >
        <Bell aria-hidden="true" />
        {hasUnreadNotifications && <S.UnreadDot aria-hidden="true" />}
      </S.BellButton>

      {isPopoverOpen && (
        <NotificationsPopover
          onClose={handleClosePopover}
          triggerRef={bellRef}
        />
      )}
    </S.BellContainer>
  );
}

export default NotificationBell;
