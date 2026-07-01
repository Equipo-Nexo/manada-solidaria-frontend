import type { ComponentType, SVGProps } from 'react'
import { BriefcaseMedical, ChevronRight, HandHeart, Heart, House, Info, LogOut, Map, PawPrint, User, Users } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import './Menu.css'

type IconProps = SVGProps<SVGSVGElement>

type MenuProps = {
  username: string
  email: string
}

type MenuChildItem = {
  label: string
  path: string
  activePath: string
  icon: ComponentType<IconProps>
}

type MenuSection = {
  title: string
  items: MenuChildItem[]
}

type MenuLocationState = {
  from?: string
}

const profileImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22 viewBox=%220 0 50 50%22%3E%3Crect width=%2250%22 height=%2250%22 rx=%2225%22 fill=%22%23F5E7D4%22/%3E%3Ccircle cx=%2225%22 cy=%2219%22 r=%229%22 fill=%22%23A95C28%22/%3E%3Cpath d=%22M10 44c2.5-9 8.5-14 15-14s12.5 5 15 14%22 fill=%22%23A95C28%22/%3E%3C/svg%3E'

const sections: MenuSection[] = [
  {
    title: 'Navegación',
    items: [
      { label: 'Inicio', path: '/home', activePath: '/home', icon: House },
      { label: 'Mi perfil', path: '/home', activePath: '/mi-perfil', icon: User },
      { label: 'Servicios', path: '/home', activePath: '/servicios', icon: BriefcaseMedical },
      { label: 'Comunidad', path: '/home', activePath: '/comunidad', icon: Users },
      { label: 'Mapa', path: '/home', activePath: '/mapa', icon: Map },
      { label: 'Casos felices', path: '/home', activePath: '/casos-felices', icon: Heart },
    ],
  },
  {
    title: 'Colaboración',
    items: [
      { label: 'Casos urgentes', path: '/home', activePath: '/casos-urgentes', icon: Info },
      {
        label: 'Animales publicados',
        path: '/home',
        activePath: '/animales-publicados',
        icon: PawPrint,
      },
      { label: 'Campañas', path: '/home', activePath: '/campanias', icon: HandHeart },
    ],
  },
]

function Menu({ username, email }: MenuProps) {
  const location = useLocation()
  const activePath = (location.state as MenuLocationState | null)?.from

  return (
    <section className="hamburger-menu" aria-label="Menú principal">
      <div className="hamburger-menu__profile">
        <img
          className="hamburger-menu__avatar"
          src={profileImage}
          alt={`Foto de perfil de ${username}`}
          width="50"
          height="50"
        />
        <div className="hamburger-menu__user-data">
          <p className="hamburger-menu__username">{username}</p>
          <p className="hamburger-menu__email">{email}</p>
        </div>
      </div>

      <nav className="hamburger-menu__nav" aria-label="Opciones del menú">
        {sections.map((section) => (
          <div className="hamburger-menu__section" key={section.title}>
            <h2 className="hamburger-menu__section-title">{section.title}</h2>
            <div className="hamburger-menu__items">
              {section.items.map((item) => (
                <MenuLink activePath={activePath} item={item} key={item.label} />
              ))}
            </div>
          </div>
        ))}

        <NavLink to="/login" className="hamburger-menu__item hamburger-menu__item--logout">
          <span className="hamburger-menu__item-content">
            <LogOut aria-hidden="true" />
            <span>Cerrar sesión</span>
          </span>
          <ChevronRight aria-hidden="true" />
        </NavLink>
      </nav>
    </section>
  )
}

function MenuLink({ item, activePath }: { item: MenuChildItem; activePath?: string }) {
  const Icon = item.icon
  const isSelected = activePath === item.activePath

  return (
    <NavLink
      to={item.path}
      className={`hamburger-menu__item${isSelected ? ' hamburger-menu__item--active' : ''}`}
      aria-current={isSelected ? 'page' : undefined}
    >
      <span className="hamburger-menu__item-content">
        <Icon aria-hidden="true" />
        <span>{item.label}</span>
      </span>
      {!isSelected && <ChevronRight aria-hidden="true" />}
    </NavLink>
  )
}

export default Menu
