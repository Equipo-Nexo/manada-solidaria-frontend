import { Bell, Menu } from 'lucide-react'
import './AppHeader.css'

type AppHeaderProps = {
  username: string
  onMenuClick?: () => void
}

function AppHeader({ username, onMenuClick }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <button
          className="app-header__menu-button"
          type="button"
          aria-label="Abrir menú"
          onClick={onMenuClick}
        >
          <Menu aria-hidden="true" />
        </button>
        <div className="app-header__logo">
          <img src="/logo.svg" alt="Manada Solidaria" />
        </div>
        <p className="app-header__greeting">Hola, {username}</p>
      </div>

      <button className="app-header__notifications" type="button" aria-label="Notificaciones">
        <Bell aria-hidden="true" />
      </button>
    </header>
  )
}

export default AppHeader
