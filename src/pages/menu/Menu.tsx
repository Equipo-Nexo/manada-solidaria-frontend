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
} from '../../components/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import {
  Avatar,
  Email,
  ItemContent,
  Items,
  LogoutButton,
  MenuItemLink,
  MenuNav,
  MenuRoot,
  MenuSectionBlock,
  Profile,
  SectionTitle,
  UserData,
  Username,
} from './Menu.styles'

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

export default Menu
