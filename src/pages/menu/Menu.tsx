import type { ComponentType, SVGProps } from 'react'
import { useState } from 'react'
import {
  BriefcaseMedical,
  ChevronRight,
  HandHeart,
  Heart,
  House,
  Info,
  LogOut,
  Map,
  PawPrint,
  User,
  Users,
} from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Modal from '../../components/modal/Modal'

type IconProps = SVGProps<SVGSVGElement>

type MenuProps = {
  username: string
  email: string
  onNavigate?: () => void
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
    title: 'Navegaci\u00f3n',
    items: [
      { label: 'Inicio', path: '/home', activePath: '/home', icon: House },
      { label: 'Mi perfil', path: '/home', activePath: '/mi-perfil', icon: User },
      { label: 'Servicios', path: '/home', activePath: '/servicios', icon: BriefcaseMedical },
      { label: 'Comunidad', path: '/home', activePath: '/comunidad', icon: Users },
      { label: 'Mapa', path: '/mapa', activePath: '/mapa', icon: Map },
      { label: 'Casos felices', path: '/home', activePath: '/casos-felices', icon: Heart },
    ],
  },
  {
    title: 'Colaboraci\u00f3n',
    items: [
      { label: 'Casos urgentes', path: '/home', activePath: '/casos-urgentes', icon: Info },
      {
        label: 'Animales publicados',
        path: '/home',
        activePath: '/animales-publicados',
        icon: PawPrint,
      },
      { label: 'Campa\u00f1as', path: '/campanias', activePath: '/campanias', icon: HandHeart },
    ],
  },
]

function Menu({ username, email, onNavigate }: MenuProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const activePath = (location.state as MenuLocationState | null)?.from ?? location.pathname
  const closeLogoutModal = () => setIsLogoutModalOpen(false)
  const confirmLogout = () => {
    setIsLogoutModalOpen(false)
    navigate('/login')
  }

  return (
    <MenuRoot aria-label={'Men\u00fa principal'}>
      <Profile>
        <Avatar src={profileImage} alt={`Foto de perfil de ${username}`} width="50" height="50" />
        <UserData>
          <Username>{username}</Username>
          <Email>{email}</Email>
        </UserData>
      </Profile>

      <MenuNav aria-label={'Opciones del men\u00fa'}>
        {sections.map((section) => (
          <MenuSectionBlock key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <Items>
              {section.items.map((item) => (
                <MenuLink
                  activePath={activePath}
                  item={item}
                  key={item.label}
                  onNavigate={onNavigate}
                />
              ))}
            </Items>
          </MenuSectionBlock>
        ))}

        <LogoutButton type="button" onClick={() => setIsLogoutModalOpen(true)}>
          <ItemContent>
            <LogOut aria-hidden="true" />
            <span>{'Cerrar sesi\u00f3n'}</span>
          </ItemContent>
          <ChevronRight aria-hidden="true" />
        </LogoutButton>
      </MenuNav>

      <Modal
        isOpen={isLogoutModalOpen}
        title={'Cerrar sesi\u00f3n'}
        primaryLabel={'Cerrar sesi\u00f3n'}
        secondaryLabel="Cancelar"
        onPrimaryAction={confirmLogout}
        onSecondaryAction={closeLogoutModal}
      >
        <p>{'\u00bfQuer\u00e9s salir de la aplicaci\u00f3n?'}</p>
      </Modal>
    </MenuRoot>
  )
}

function MenuLink({
  item,
  activePath,
  onNavigate,
}: {
  item: MenuChildItem
  activePath?: string
  onNavigate?: () => void
}) {
  const Icon = item.icon
  const isSelected = activePath === item.activePath

  return (
    <MenuItemLink
      to={item.path}
      $isSelected={isSelected}
      aria-current={isSelected ? 'page' : undefined}
      onClick={onNavigate}
    >
      <ItemContent>
        <Icon aria-hidden="true" />
        <span>{item.label}</span>
      </ItemContent>
      {!isSelected && <ChevronRight aria-hidden="true" />}
    </MenuItemLink>
  )
}

const MenuRoot = styled.section`
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surfacePlain};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 18px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  flex: 0 0 50px;
  border-radius: 999px;
  object-fit: cover;
`

const UserData = styled.div`
  min-width: 0;
`

const UserText = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Username = styled(UserText)`
  color: ${({ theme }) => theme.colors.brand};
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
`

const Email = styled(UserText)`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
`

const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 0 24px;
`

const MenuSectionBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 8px;
    padding-top: 9px;
  }

  & + &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 24px;
    left: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`

const SectionTitle = styled.h2`
  margin: 0;
  padding: 8px 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: uppercase;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const menuItemStyles = `
  position: relative;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 22px;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  font-family: Montserrat, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: rgb(234 95 9 / 8%);
  }

  &:focus-visible {
    outline: 3px solid rgb(234 95 9 / 28%);
    outline-offset: -3px;
  }

  svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    stroke-width: 2.25;
  }
`

const MenuItemLink = styled(NavLink)<{ $isSelected: boolean }>`
  ${menuItemStyles}
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.brand : theme.colors.text)};

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: -8px;
    width: 4px;
    border-radius: 0;
    background: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.brand : 'transparent'};
    transition: background 160ms ease;
  }
`

const LogoutButton = styled.button`
  ${menuItemStyles}
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.error};
`

const ItemContent = styled.span`
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export default Menu
