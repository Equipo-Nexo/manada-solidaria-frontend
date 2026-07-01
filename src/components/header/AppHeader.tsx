import { Bell, Dog } from 'lucide-react'
import './AppHeader.css'

type AppHeaderProps = {
  username: string
}

function AppHeader({ username }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo" aria-label="Manada Solidaria">
          <Dog aria-hidden="true" />
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
