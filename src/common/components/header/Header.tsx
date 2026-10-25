import { Menu } from "../../icons";
import useCurrentUserProfile from "@hooks/user/useCurrentUserProfile";
import useHeaderVisibility from "@hooks/ui/useHeaderVisibility";
import { Brand, Greeting, HeaderRoot, Logo, MenuButton } from "./Header.styles";
import NotificationBell from "@/notifications/components/notification_bell/NotificationBell";

type HeaderProps = {
  onMenuClick?: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  const { username } = useCurrentUserProfile();
  const isVisible = useHeaderVisibility();

  return (
    <HeaderRoot $isVisible={isVisible}>
      <Brand>
        <MenuButton type="button" aria-label="Abrir menu" onClick={onMenuClick}>
          <Menu aria-hidden="true" />
        </MenuButton>
        <Logo>
          <img src="/logo.svg" alt="Manada Solidaria" />
        </Logo>
        <Greeting>Hola, {username}</Greeting>
      </Brand>

      <NotificationBell />
    </HeaderRoot>
  );
}

export default Header;
