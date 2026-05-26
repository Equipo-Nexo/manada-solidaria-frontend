import { NavLink } from 'react-router-dom'
import './BottomNav.css'

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className="bottom-nav__item">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Inicio</span>
      </NavLink>
      <NavLink to="/posts" className="bottom-nav__item">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Publicaciones</span>
      </NavLink>
    </nav>
  )
}
