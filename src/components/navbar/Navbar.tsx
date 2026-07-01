import type { ComponentType, SVGProps } from 'react'
import { useLocation } from 'react-router-dom'
import { HandHeart, House, Map, Menu, PawPrint } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import {
  BottomNav,
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
  { title: 'M\u00e1s', path: '/menu', icon: Menu },
]

function Navbar() {
  const toast = useToast()
  const location = useLocation()

  const handlePublish = () => {
    toast.information({
      title: 'Error al publicar',
      description: 'Ocurri\u00f3 un error al intentar publicar tu notificaci\u00f3n.',
    })
  }

  return (
    <BottomNav aria-label={'Navegaci\u00f3n principal'}>
      <BottomNavContent>
        <NavbarLink item={navItems[0]} currentPath={location.pathname} />
        <NavbarLink item={navItems[1]} currentPath={location.pathname} />

        <PublishWrapper>
          <PublishButton type="button" aria-label="Publicar" onClick={handlePublish}>
            <PawPrint aria-hidden="true" />
          </PublishButton>
          <span>Publicar</span>
        </PublishWrapper>

        <NavbarLink item={navItems[2]} currentPath={location.pathname} />
        <NavbarLink item={navItems[3]} currentPath={location.pathname} />
      </BottomNavContent>
    </BottomNav>
  )
}

function NavbarLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const Icon = item.icon
  const state = item.path === '/menu' ? { from: currentPath } : undefined
  const isActive = currentPath === item.path

  return (
    <BottomNavItem to={item.path} state={state} $isActive={isActive}>
      <Icon aria-hidden="true" />
      <span>{item.title}</span>
    </BottomNavItem>
  )
}

export default Navbar
