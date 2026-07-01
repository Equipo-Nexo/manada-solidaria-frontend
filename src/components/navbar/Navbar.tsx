import type { ComponentType, SVGProps } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HandHeart, House, Map, Menu, PawPrint } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import './Navbar.css'

type IconProps = SVGProps<SVGSVGElement>

type NavItem = {
  title: string
  path: string
  icon: ComponentType<IconProps>
}

const navItems: NavItem[] = [
  { title: 'Inicio', path: '/home', icon: House },
  { title: 'Campañas', path: '/campanias', icon: HandHeart },
  { title: 'Mapa', path: '/mapa', icon: Map },
  { title: 'Más', path: '/menu', icon: Menu },
]

function Navbar() {
  const toast = useToast()
  const location = useLocation()

  const handlePublish = () => {
    toast.information({
      title: 'Error al publicar',
      description: 'Ocurrió un error al intentar publicar tu notificación.',
    })
  }

  return (
    <nav className="bottom-navbar" aria-label="Navegación principal">
      <div className="bottom-navbar__content">
        <NavbarLink item={navItems[0]} currentPath={location.pathname} />
        <NavbarLink item={navItems[1]} currentPath={location.pathname} />

        <div className="bottom-navbar__publish-wrapper">
          <button
            className="bottom-navbar__publish-button"
            type="button"
            aria-label="Publicar"
            onClick={handlePublish}
          >
            <PawPrint aria-hidden="true" />
          </button>
          <span>Publicar</span>
        </div>

        <NavbarLink item={navItems[2]} currentPath={location.pathname} />
        <NavbarLink item={navItems[3]} currentPath={location.pathname} />
      </div>
    </nav>
  )
}

function NavbarLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const Icon = item.icon
  const state = item.path === '/menu' ? { from: currentPath } : undefined

  return (
    <NavLink
      to={item.path}
      state={state}
      className={({ isActive }) =>
        `bottom-navbar__item${isActive ? ' bottom-navbar__item--active' : ''}`
      }
    >
      <Icon aria-hidden="true" />
      <span>{item.title}</span>
    </NavLink>
  )
}

export default Navbar
