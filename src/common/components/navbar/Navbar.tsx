import type { ComponentType, SVGProps } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Users, House, Map, Menu, PawPrint } from '../../icons'
import {
  BottomNav,
  BottomNavButton,
  BottomNavContent,
  BottomNavItem,
  PublishButton,
  PublishWrapper,
} from './Navbar.styles'
import PublishOptions from '../publishOptions/PublishOptions'

type IconProps = SVGProps<SVGSVGElement>

type RouteNavItem = {
  type: 'route'
  title: string
  path: string
  icon: ComponentType<IconProps>
}

const navItems: RouteNavItem[] = [
  { type: 'route', title: 'Inicio', path: '/home', icon: House },
  { type: 'route', title: 'Comunidad', path: '/home', icon: Users },
  { type: 'route', title: 'Mapa', path: '/mapa', icon: Map },
]

function Navbar() {
  const [isPublishOptionsOpen, setIsPublishOptionsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isMenuRoute = location.pathname === '/menu'

  return (
    <BottomNav aria-label={'Navegaci\u00f3n principal'} $isMenuOpen={isMenuRoute}>
      <BottomNavContent>
        <NavbarLink item={navItems[0]} currentPath={location.pathname} />
        <NavbarLink item={navItems[1]} currentPath={location.pathname} />

        <PublishWrapper>
          <PublishButton
            type="button"
            aria-label="Publicar"
            aria-expanded={isPublishOptionsOpen}
            onClick={() => {
              setIsPublishOptionsOpen((isOpen) => !isOpen)
            }}
          >
            <PawPrint aria-hidden="true" />
          </PublishButton>
          <span>Publicar</span>
        </PublishWrapper>

        <NavbarLink item={navItems[2]} currentPath={location.pathname} />
        <NavbarMenuButton isActive={isMenuRoute} onClick={() => navigate('/menu')} />
      </BottomNavContent>
      <PublishOptions
        isOpen={isPublishOptionsOpen}
        placement="mobile"
        onClose={() => setIsPublishOptionsOpen(false)}
      />
    </BottomNav>
  )
}

function NavbarLink({
  item,
  currentPath,
}: {
  item: RouteNavItem
  currentPath: string
}) {
  const Icon = item.icon
  const isActive = currentPath === item.path

  return (
    <BottomNavItem to={item.path} $isActive={isActive}>
      <Icon aria-hidden="true" />
      <span>{item.title}</span>
    </BottomNavItem>
  )
}

function NavbarMenuButton({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <BottomNavButton
      type="button"
      aria-label={'Abrir men\u00fa'}
      $isActive={isActive}
      onClick={onClick}
    >
      <Menu aria-hidden="true" />
      <span>{'M\u00e1s'}</span>
    </BottomNavButton>
  )
}

export default Navbar
