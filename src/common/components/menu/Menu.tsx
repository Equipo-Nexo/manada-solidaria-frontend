import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import {
  BriefcaseMedical,
  ChevronRight,
  HandHeart,
  Heart,
  History,
  House,
  Info,
  LogOut,
  Map,
  PawPrint,
  User,
  Users,
} from "@icons/index.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@components/index.ts";
import { logout } from "@store/authSlice";
import { useAppDispatch } from "@store/hooks";
import useCurrentUserProfile from "@hooks/user/useCurrentUserProfile";
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
} from "./Menu.styles";

type IconProps = SVGProps<SVGSVGElement>;

type MenuProps = {
  onNavigate?: () => void;
};

type MenuChildItem = {
  label: string;
  path: string;
  activePath: string;
  icon: ComponentType<IconProps>;
};

type MenuSection = {
  title: string;
  items: MenuChildItem[];
};

type MenuLocationState = {
  from?: string;
};

const sections: MenuSection[] = [
  {
    title: "Navegaci\u00f3n",
    items: [
      { label: "Inicio", path: "/home", activePath: "/home", icon: House },
      {
        label: "Mi perfil",
        path: "/mi-perfil",
        activePath: "/mi-perfil",
        icon: User,
      },
      {
        label: "Mis publicaciones",
        path: "/mis-publicaciones",
        activePath: "/mis-publicaciones",
        icon: History,
      },
      {
        label: "Servicios",
        path: "/servicios",
        activePath: "/servicios",
        icon: BriefcaseMedical,
      },
      {
        label: "Comunidad",
        path: "/comunidad",
        activePath: "/comunidad",
        icon: Users,
      },
      { label: "Mapa", path: "/mapa", activePath: "/mapa", icon: Map },
      {
        label: "Casos felices",
        path: "/casos-felices",
        activePath: "/casos-felices",
        icon: Heart,
      },
    ],
  },
  {
    title: "Colaboraci\u00f3n",
    items: [
      {
        label: "Casos urgentes",
        path: "/colectas",
        activePath: "/casos-urgentes",
        icon: Info,
      },
      {
        label: "Animales publicados",
        path: "/animales",
        activePath: "/animales",
        icon: PawPrint,
      },
      {
        label: "Campa\u00f1as",
        path: "/campanias",
        activePath: "/campanias",
        icon: HandHeart,
      },
    ],
  },
];

function Menu({ onNavigate }: MenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, username, profileImage } = useCurrentUserProfile();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const activePath =
    (location.state as MenuLocationState | null)?.from ?? location.pathname;
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <MenuRoot aria-label={"Men\u00fa principal"}>
      <Profile>
        <Avatar
          src={profileImage}
          alt={`Foto de perfil de ${username}`}
          width="50"
          height="50"
        />
        <UserData>
          <Username>{username}</Username>
          <Email>{email}</Email>
        </UserData>
      </Profile>

      <MenuNav aria-label={"Opciones del men\u00fa"}>
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
            <span>{"Cerrar sesi\u00f3n"}</span>
          </ItemContent>
          <ChevronRight aria-hidden="true" />
        </LogoutButton>
      </MenuNav>

      <Modal
        isOpen={isLogoutModalOpen}
        title={"Cerrar sesi\u00f3n"}
        primaryLabel={"Cerrar sesi\u00f3n"}
        secondaryLabel="Cancelar"
        onPrimaryAction={confirmLogout}
        onSecondaryAction={closeLogoutModal}
      >
        <p>{"\u00bfQuer\u00e9s salir de la aplicaci\u00f3n?"}</p>
      </Modal>
    </MenuRoot>
  );
}

function MenuLink({
  item,
  activePath,
  onNavigate,
}: {
  item: MenuChildItem;
  activePath?: string;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const isSelected = activePath === item.activePath;

  return (
    <MenuItemLink
      to={item.path}
      $isSelected={isSelected}
      aria-current={isSelected ? "page" : undefined}
      onClick={onNavigate}
    >
      <ItemContent>
        <Icon aria-hidden="true" />
        <span>{item.label}</span>
      </ItemContent>
      {!isSelected && <ChevronRight aria-hidden="true" />}
    </MenuItemLink>
  );
}

export default Menu;
