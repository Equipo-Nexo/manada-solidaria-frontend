import type { ComponentType, SVGProps } from 'react'
import { useLocation } from 'react-router-dom'
import { HandHeart, House, Map, Menu, PawPrint } from '../icons'
import { useToast } from '../../hooks/useToast'
import {
  BottomNav,
  BottomNavContent,
  BottomNavItem,
  PublishButton,
  PublishWrapper,
} from './Navbar.styles'

type IconProps = SVGProps<SVGSVGElement>

type RouteNavItem = {
  type: 'route'
  title: string
  path: string
  icon: ComponentType<IconProps>
}

type ActionNavItem = {
  type: 'action'
  title: string
  icon: ComponentType<IconProps>
  action: 'publish'
}

type NavItem = RouteNavItem | ActionNavItem

const navItems: NavItem[] = [
  { type: 'route', title: 'Inicio', path: '/home', icon: House },
  { type: 'route', title: 'Campa\u00f1as', path: '/campanias', icon: HandHeart },
  { type: 'action', title: 'Publicar', icon: PawPrint, action: 'publish' },
  { type: 'route', title: 'Mapa', path: '/mapa', icon: Map },
  { type: 'route', title: 'M\u00e1s', path: '/menu', icon: Menu },
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
        {navItems.map((item) => (
          <NavbarItem
            key={item.title}
            item={item}
            currentPath={location.pathname}
            onPublish={handlePublish}
          />
        ))}
      </BottomNavContent>
    </BottomNav>
  )
}

function NavbarItem({
  item,
  currentPath,
  onPublish,
}: {
  item: NavItem
  currentPath: string
  onPublish: () => void
}) {
  if (item.type === 'action') {
    return <NavbarAction item={item} onPublish={onPublish} />
  }

  return <NavbarLink item={item} currentPath={currentPath} />
}

function NavbarLink({ item, currentPath }: { item: RouteNavItem; currentPath: string }) {
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

function NavbarAction({ item, onPublish }: { item: ActionNavItem; onPublish: () => void }) {
  const Icon = item.icon

  return (
    <PublishWrapper>
      <PublishButton type="button" aria-label={item.title} onClick={onPublish}>
        <Icon aria-hidden="true" />
      </PublishButton>
      <span>{item.title}</span>
    </PublishWrapper>
  )
}

export default Navbar
