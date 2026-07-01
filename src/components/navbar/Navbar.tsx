import type { ComponentType, SVGProps } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HandHeart, House, Map, Menu, PawPrint } from 'lucide-react'
import styled from 'styled-components'
import { useToast } from '../../hooks/useToast'

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

const BottomNav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`

const BottomNavContent = styled.div`
  width: min(100%, ${({ theme }) => theme.layout.contentMaxWidth});
  height: ${({ theme }) => theme.layout.mobileNavHeight};
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  background: ${({ theme }) => theme.colors.surface};
`

const BottomNavItem = styled(NavLink)<{ $isActive: boolean }>`
  position: relative;
  width: 78px;
  height: 60px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.text)};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-decoration: none;
  transition: color 160ms ease;

  &::before {
    content: '';
    position: absolute;
    top: -9px;
    left: 50%;
    width: 54px;
    height: 4px;
    border-radius: 0 0 999px 999px;
    background: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : 'transparent')};
    transform: translateX(-50%);
    transition: background 160ms ease;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2;
  }
`

const PublishWrapper = styled.div`
  position: relative;
  align-self: stretch;
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;

  span {
    position: absolute;
    top: 46px;
  }
`

const PublishButton = styled.button`
  position: absolute;
  top: -35px;
  left: 50%;
  width: 70px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  box-shadow: 0 8px 18px rgb(169 92 40 / 28%);
  cursor: pointer;
  transform: translateX(-50%);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translate(-50%, -2px);
    box-shadow: 0 12px 22px rgb(169 92 40 / 32%);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2.5;
  }
`

export default Navbar
