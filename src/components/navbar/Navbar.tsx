import type { ComponentType, SVGProps } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HandHeart, House, Map, Menu, PawPrint } from 'lucide-react'
import PublishOptions from '../publishOptions/PublishOptions'
import {
  BottomNav,
  BottomNavButton,
  BottomNavContent,
  BottomNavItem,
  PublishButton,
  PublishWrapper,
} from './Navbar.styles'

type IconProps = SVGProps<SVGSVGElement>

type NavItem = {
  title: string
  path: string
  icon: ComponentType<IconProps>
}

const navItems: NavItem[] = [
  { title: 'Inicio', path: '/home', icon: House },
  { title: 'Campa\u00f1as', path: '/campanias', icon: HandHeart },
  { title: 'Mapa', path: '/mapa', icon: Map },
]

type NavbarProps = {
  isMenuOpen: boolean
  onMenuClick: () => void
}

function Navbar({ isMenuOpen, onMenuClick }: NavbarProps) {
  const [isPublishOptionsOpen, setIsPublishOptionsOpen] = useState(false)
  const location = useLocation()

  return (
    <BottomNav aria-label={'Navegaci\u00f3n principal'}>
      <BottomNavContent>
        <NavbarLink item={navItems[0]} currentPath={location.pathname} />
        <NavbarLink item={navItems[1]} currentPath={location.pathname} />

        <PublishWrapper>
          <PublishButton
            type="button"
            aria-label="Publicar"
            aria-expanded={isPublishOptionsOpen}
            onClick={() => setIsPublishOptionsOpen((isOpen) => !isOpen)}
          >
            <PawPrint aria-hidden="true" />
          </PublishButton>
          <span>Publicar</span>
        </PublishWrapper>

        <NavbarLink item={navItems[2]} currentPath={location.pathname} />
        <NavbarMenuButton isActive={isMenuOpen} onClick={onMenuClick} />
      </BottomNavContent>
      <PublishOptions
        isOpen={isPublishOptionsOpen}
        placement="mobile"
        onClose={() => setIsPublishOptionsOpen(false)}
      />
    </BottomNav>
  )
}

function NavbarLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
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
