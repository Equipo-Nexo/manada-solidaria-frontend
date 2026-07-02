import { Bell, Menu } from 'lucide-react'
import useCurrentUserProfile from '../../hooks/user/useCurrentUserProfile'
import { Brand, Greeting, HeaderRoot, IconButton, Logo, MenuButton } from './Header.styles'

type HeaderProps = {
  onMenuClick?: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  const { username } = useCurrentUserProfile()

  return (
    <HeaderRoot>
      <Brand>
        <MenuButton type="button" aria-label="Abrir menu" onClick={onMenuClick}>
          <Menu aria-hidden="true" />
        </MenuButton>
        <Logo>
          <img src="/logo.svg" alt="Manada Solidaria" />
        </Logo>
        <Greeting>Hola, {username}</Greeting>
      </Brand>

      <IconButton type="button" aria-label="Notificaciones">
        <Bell aria-hidden="true" />
      </IconButton>
    </HeaderRoot>
  )
}

export default Header
