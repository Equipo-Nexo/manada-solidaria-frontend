import { Bell, Menu } from '../icons'
import { Brand, Greeting, Header, IconButton, Logo, MenuButton } from './AppHeader.styles'

type AppHeaderProps = {
  username: string
  onMenuClick?: () => void
}

function AppHeader({ username, onMenuClick }: AppHeaderProps) {
  return (
    <Header>
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
    </Header>
  )
}

export default AppHeader
