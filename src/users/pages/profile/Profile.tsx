
import { ArrowLeft, Camera, ChevronRight, Info, Pencil } from "@/common/icons";
import * as S from "./Profile.styles"
import RescueIcon from "@icons/HandHeart";
import TransitIcon from "@icons/TransitIcon";
import TransportIcon from "@icons/CarFront";
import UserIcon from "@icons/User";
import HistoryIcon from "@icons/History";
import Image from "../../../../public/pwa-192.png";
import { useState, type SVGProps } from "react";
import { BottomSheet, Modal } from "@/common/components";
import LogoutIcon from "@icons/LogOut";
import { useCamera } from "@hooks/camera/useCamera";
import Gallery from "@icons/Gallery";
import { useNavigate } from "react-router-dom";
import { logout } from "@store/authSlice";
import { useAppDispatch } from "@store/hooks";

const OutlinedRescueIcon = (props: SVGProps<SVGSVGElement>) => (
    <RescueIcon variant="outlined" {...props} />
)

const CenteredTransportIcon = ({ style, ...props }: SVGProps<SVGSVGElement>) => (
    <TransportIcon
        {...props}
        style={{ ...style, transform: "translateX(1px)" }}
    />
)

const rolesInformation = new Map([
    ["Rescatista", {
        description: "Como rescatista, sos quien encuentra, asiste y da visibilidad a animales en situación de calle, abandono o peligro. Podés publicar sus casos para que la comunidad pueda colaborar, además de campañas de donación.",
        Icon: OutlinedRescueIcon,
    }],
    ["Hogar de tránsito", {
        description: "Como hogar de tránsito ofrecés un espacio temporal y seguro para animales que aún no tienen un hogar definitivo, cuidándolos mientras esperan su adopción.",
        Icon: TransitIcon,
    }],
    ["Transportista", {
        description: "Como transportista, ayudás a trasladar animales de forma segura: desde el lugar del rescate hacia veterinarias, hogares de tránsito o su nuevo hogar definitivo. Cuando se necesite un traslado urgente, vas a recibir una notificación desde la app, y sos vos quien decide si podés tomarlo o no según tu disponibilidad.",
        Icon: CenteredTransportIcon,
    }],
] as const);

type RoleName = "Rescatista" | "Hogar de tránsito" | "Transportista";

function Profile() {

    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)

    const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false)

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const [role, setRole] = useState<RoleName | null>(null)

    const { capturedPhoto, chooseFromGallery, status, takePhoto } = useCamera()

    const selectedRole = role ? rolesInformation.get(role) : undefined;

    const Navigate = useNavigate()
    const dispatch = useAppDispatch()

    // const { data: userData } = useGetUserProfileQuery();

    function handleRoleInformation(role: RoleName) {
        setOpenBottomSheet(true);
        setRole(role);
    }

    const handleTakePhoto = async () => {
        const photo = await takePhoto()
        if (photo) setIsPhotoSheetOpen(false)
    }

    const handleChooseFromGallery = async () => {
        const photo = await chooseFromGallery()
        if (photo) setIsPhotoSheetOpen(false)
    }

    const profileImage = capturedPhoto?.url || Image

    const confirmLogout = () => {
        setIsLogoutModalOpen(false)
        dispatch(logout())
        Navigate("/login", { replace: true })
    }

    const SwitchComponent = (Rolename: RoleName, Icon: React.ComponentType) => {
        return (
            <S.SwitchGroup>
                <S.SwitchRow>
                    <S.SwitchLabelContent>
                        <S.RoleIcon $size="large"><Icon aria-hidden="true" /></S.RoleIcon>
                        <S.RoleName>{Rolename}</S.RoleName>
                        <S.InfoIcon type="button" aria-label={`Información sobre el rol de ${Rolename}`} onClick={() => handleRoleInformation(Rolename)}>
                            <Info aria-hidden="true" />
                        </S.InfoIcon>
                    </S.SwitchLabelContent>
                    <S.SwitchToggle>
                        <S.SwitchInput
                            type="checkbox"
                            aria-label={`Activar rol de ${Rolename}`}
                        />
                        <S.SwitchControl aria-hidden="true" />
                    </S.SwitchToggle>
                </S.SwitchRow>
            </S.SwitchGroup>
        )
    }
    const ItemComponent = (Icon: React.ComponentType, label: string, route: string, description?: string) => {
        return (
            <S.Item>
                <S.RoleIcon><Icon aria-hidden="true" /></S.RoleIcon>
                <S.ItemInfo onClick={() => Navigate(route)}>
                    <S.ItemLabel>{label}</S.ItemLabel>
                    <S.ItemDescription>{description}</S.ItemDescription>
                </S.ItemInfo>
                <S.ItemChevron aria-hidden="true">
                    <ChevronRight />
                </S.ItemChevron>
            </S.Item>
        )
    }
    return (
        <S.MainContainer>
            <Modal
                isOpen={isLogoutModalOpen}
                title="Cerrar sesión"
                primaryLabel="Cerrar sesión"
                secondaryLabel="Cancelar"
                onPrimaryAction={confirmLogout}
                onSecondaryAction={() => setIsLogoutModalOpen(false)}
            >
                <p>¿Querés salir de la aplicación?</p>
            </Modal>
            <BottomSheet
                isOpen={openBottomSheet}
                onClose={() => setOpenBottomSheet(false)}
                ariaLabel={role ? `Información sobre el rol ${role}` : "Información del rol"}
            >
                <S.BottomSheetContent>
                    {selectedRole && (
                        <S.BottomSheetRoleIcon>
                            <selectedRole.Icon aria-hidden="true" />
                        </S.BottomSheetRoleIcon>
                    )}
                    <S.BottomSheetTitle>{role}</S.BottomSheetTitle>
                    <S.BottomSheetDescription>{selectedRole?.description}</S.BottomSheetDescription>
                </S.BottomSheetContent>
            </BottomSheet>
            <BottomSheet
                isOpen={isPhotoSheetOpen}
                onClose={() => setIsPhotoSheetOpen(false)}
                ariaLabel="Seleccionar origen de la foto de perfil"
            >
                <S.PhotoSheetHeader>
                    <S.PhotoSheetTitle>Seleccionar origen</S.PhotoSheetTitle>
                    <S.PhotoSheetDescription>¿Desde dónde quieres subir la foto?</S.PhotoSheetDescription>
                </S.PhotoSheetHeader>
                <S.PhotoSheetActions>
                    <S.PhotoSheetAction
                        type="button"
                        disabled={status === "requesting"}
                        onClick={() => void handleTakePhoto()}
                    >
                        <S.PhotoSheetActionIcon><Camera aria-hidden="true" /></S.PhotoSheetActionIcon>
                        <S.PhotoSheetActionCopy>
                            <S.PhotoSheetActionTitle>Tomar foto</S.PhotoSheetActionTitle>
                            <S.PhotoSheetActionDescription>Usa la cámara de tu celular</S.PhotoSheetActionDescription>
                        </S.PhotoSheetActionCopy>
                        <ChevronRight aria-hidden="true" />
                    </S.PhotoSheetAction>
                    <S.PhotoSheetAction
                        type="button"
                        disabled={status === "requesting"}
                        onClick={() => void handleChooseFromGallery()}
                    >
                        <S.PhotoSheetActionIcon><Gallery aria-hidden="true" /></S.PhotoSheetActionIcon>
                        <S.PhotoSheetActionCopy>
                            <S.PhotoSheetActionTitle>Elegir de la galería</S.PhotoSheetActionTitle>
                            <S.PhotoSheetActionDescription>Busca en tus fotos guardadas</S.PhotoSheetActionDescription>
                        </S.PhotoSheetActionCopy>
                        <ChevronRight aria-hidden="true" />
                    </S.PhotoSheetAction>
                </S.PhotoSheetActions>
            </BottomSheet>
            <S.Header>
                <S.BackButton type="button" onClick={() => Navigate(-1)} aria-label="Volver">
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Mi perfil</S.PageTitle>
                </S.TitlesContainer>
            </S.Header>
            <S.ProfileImageContainer>
                <S.ProfileImageWrapper>
                    <S.ProfileImage src={profileImage} alt={`Foto de perfil de usuario`} />
                    <S.EditProfileImageButton
                        type="button"
                        aria-label="Editar foto de perfil"
                        onClick={() => setIsPhotoSheetOpen(true)}
                    >
                        <Pencil aria-hidden="true" />
                    </S.EditProfileImageButton>
                </S.ProfileImageWrapper>
                <S.ProfileName>Abril</S.ProfileName>
                <S.ProfileEmail>abrilconrero@example.com</S.ProfileEmail>
            </S.ProfileImageContainer>
            <S.OptionsContainer>
                <S.RolesContainer>
                    <S.Label>Roles Actuales</S.Label>
                    <S.Description>Activá los roles que querés cumplir en la red. Tocá el ícono de información para saber en qué consiste cada uno.</S.Description>
                    <S.RolesList>
                        {SwitchComponent("Rescatista", OutlinedRescueIcon)}
                        {SwitchComponent("Hogar de tránsito", TransitIcon)}
                        {SwitchComponent("Transportista", CenteredTransportIcon)}
                    </S.RolesList>
                </S.RolesContainer>
                <S.AccountAndActivityContainer>
                    <S.Label>Cuentas y Actividad</S.Label>
                    <S.Description>Accedé a tus publicaciones y actualizá tus datos personales cuando lo necesites.</S.Description>
                    <S.AccountAndActivityList>
                        {ItemComponent(HistoryIcon, "Mis publicaciones", "/mis-publicaciones", "Editá y eliminá tus publicaciones")}
                        {ItemComponent(UserIcon, "Datos personales", "", "")}
                    </S.AccountAndActivityList>
                </S.AccountAndActivityContainer>
            </S.OptionsContainer>
            <S.LogoutButton type="button" onClick={() => setIsLogoutModalOpen(true)}>
                <LogoutIcon aria-hidden="true" />
                Cerrar sesión
            </S.LogoutButton>
        </S.MainContainer>
    )
}
export default Profile;
