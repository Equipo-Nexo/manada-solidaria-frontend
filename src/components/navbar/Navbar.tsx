import type { SVGProps } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { House, HandHeart, Map, Menu, PawPrint } from 'lucide-react'

type IconProps = SVGProps<SVGSVGElement>
type NavItem = { 
  title: string; 
  path: string; 
  icon: React.ComponentType<IconProps> 
}

const navItems: NavItem[] = [
  { title: 'Inicio', path: '/home', icon: House },
  { title: 'Campañas', path: '/campanias', icon: HandHeart },
  { title: 'Mapa', path: '/mapa', icon: Map },
  { title: 'Más', path: '/mas', icon: Menu },
]

function Navbar() {
  const handlePublish = () => {
    console.log('publicar apretado')
  }

  return (
    <nav className="bottom-navbar" aria-label="Navegación principal">
      <div className="bottom-navbar__content">
        <NavbarLink item={navItems[0]} />
        <NavbarLink item={navItems[1]} />

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

        <NavbarLink item={navItems[2]} />
        <NavbarLink item={navItems[3]} />
      </div>
    </nav>
  )
}

function NavbarLink({ item }: { item: NavItem }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path}
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
