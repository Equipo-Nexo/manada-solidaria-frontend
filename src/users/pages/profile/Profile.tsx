
import { ArrowLeft, Camera, ChevronRight, HandHeart, Info, Pencil } from "@/common/icons";
import * as S from "./Profile.styles"
import TransitIcon from "@/common/icons/Home";
import TransportIcon from "@icons/CarFront";
import SecurityIcon from '@icons/Security';
import UserIcon from "@icons/User";
import HistoryIcon from "@icons/History";
import { useState, type ComponentType, type SVGProps } from "react";
import { BottomSheet, Modal } from "@/common/components";
import CameraCapture from "@/common/components/cameraCapture/CameraCapture";
import LogoutIcon from "@icons/LogOut";
import { useCamera } from "@hooks/camera/useCamera";
import Gallery from "@icons/Gallery";
import { useNavigate } from "react-router-dom";
import { logout } from "@store/authSlice";
import { useAppDispatch } from "@store/hooks";
import useAuth from "@/common/hooks/auth/useAuth";
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useUpdateUserRolesMutation,
} from "@/users/app/api/usersApi";
import { normalizeImageUrl } from "@/common/utils/CommonUtils";
import type { Role } from "@/users/app/types/User.types";
import { useToast } from "@hooks/toast/useToast";
import { useGetPresignedUrlMutation } from "@/common/app/services/apis/imagesApi";
import { useUploadImageMutation } from "@/common/app/services/apis/cloudflareApi";
import { rolesInformation, type RoleInformation } from "./Utils.profile";
import type { RoleName } from "@/users/app/types/User.types";
import type { HandHeartProps } from '@icons/HandHeart'


const roleCodes: Record<RoleName, Role> = {
    "Rescatista": "RESCUER",
    "Hogar de tránsito": "TRANSITIONAL_HOME",
    "Transportista": "CARRIAGE",
};

const roleLabels: Record<Role, RoleName> = {
    RESCUER: "Rescatista",
    TRANSITIONAL_HOME: "Hogar de tránsito",
    CARRIAGE: "Transportista",
};

const editableRoles = Object.values(roleCodes);

const getRequestError = (error: unknown) => {
    if (!error || typeof error !== "object" || !("data" in error)) return undefined
    const data = error.data
    if (typeof data === "string") return data
    if (!data || typeof data !== "object") return undefined
    if ("message" in data && typeof data.message === "string") return data.message
    if ("errors" in data && Array.isArray(data.errors)) return data.errors.join(" ")
    return undefined
}

function Profile() {

    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)

    const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false)

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const [selectedRole, setSelectedRole] = useState<RoleInformation | null>(null)

    const [roleOverrides, setRoleOverrides] = useState<Partial<Record<Role, boolean>>>({})

    const {
        capturedPhoto,
        chooseFromGallery,
        capturePhoto,
        cameraDevices,
        setZoom,
        status,
        stopCamera,
        stream,
        switchCamera,
        takePhoto,
        zoom,
        zoomRange,
    } = useCamera()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const toaster = useToast()

    const { userId } = useAuth();

    const { data: userData } = useGetUserProfileQuery(userId);

    const [updateUserRoles] = useUpdateUserRolesMutation()
    const [getPresignedUrl, { isLoading: isGettingPresignedUrl }] = useGetPresignedUrlMutation()
    const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation()
    const [updateUserProfile, { isLoading: isUpdatingProfile }] = useUpdateUserProfileMutation()
    const isSavingPhoto = isGettingPresignedUrl || isUploadingImage || isUpdatingProfile

    const activeRoles = editableRoles.filter((roleCode) =>
        roleOverrides[roleCode] ?? userData?.roles.includes(roleCode) ?? false,
    )

    function handleRoleInformation(roleName: RoleName) {
        setSelectedRole(rolesInformation[roleName]);
        setOpenBottomSheet(true);
    }

    const handleRoleChange = async (roleCode: Role, enabled: boolean) => {
        const previousOverride = roleOverrides[roleCode]
        const roles = enabled
            ? Array.from(new Set([...activeRoles, roleCode]))
            : activeRoles.filter((activeRole) => activeRole !== roleCode)

        setRoleOverrides((current) => ({ ...current, [roleCode]: enabled }))

        try {
            await updateUserRoles({ roles }).unwrap()
            toaster.success(
                "Rol actualizado",
                enabled
                    ? `El rol ${roleLabels[roleCode]} se activó correctamente.`
                    : `El rol ${roleLabels[roleCode]} se desactivó correctamente.`,
            )
        } catch {
            setRoleOverrides((current) => {
                const restored = { ...current }
                if (previousOverride === undefined) delete restored[roleCode]
                else restored[roleCode] = previousOverride
                return restored
            })
            toaster.error("No pudimos actualizar tus roles")
        }
    }

    const updateProfilePhoto = async (file: File) => {
        if (!userData) {
            toaster.error("No pudimos cargar los datos actuales del perfil")
            return
        }

        let presigned
        try {
            presigned = await getPresignedUrl({
                contentType: file.type,
                fileSize: file.size,
            }).unwrap()
        } catch (error) {
            toaster.error("No pudimos preparar la imagen", getRequestError(error))
            return
        }

        try {
            await uploadImage({
                url: presigned.uploadUrl,
                image: file,
                contentType: file.type,
            }).unwrap()
        } catch (error) {
            toaster.error("No pudimos subir la imagen", getRequestError(error))
            return
        }

        const currentPhone = userData.profile.phoneNumber

        try {
            await updateUserProfile({
                name: userData.profile.name,
                lastname: userData.profile.lastname,
                email: userData.profile.email,
                phoneNumber: currentPhone,
                profileImageURL: presigned.imageId,
            }).unwrap()
            toaster.success("Foto de perfil actualizada")
        } catch (error) {
            toaster.error("No pudimos actualizar la foto de perfil", getRequestError(error))
        }
    }

    const handleTakePhoto = async () => {
        setIsPhotoSheetOpen(false)
        await takePhoto()
    }

    const handleCapturePhoto = async (video: HTMLVideoElement) => {
        const photo = await capturePhoto(video)
        if (photo?.file) await updateProfilePhoto(photo.file)
    }

    const handleChooseFromGallery = async () => {
        const photo = await chooseFromGallery()
        setIsPhotoSheetOpen(false)
        if (photo?.file) await updateProfilePhoto(photo.file)
    }

    const storedProfileImage = userData?.profile.profileImageURL ?? ''
    const profileImage = capturedPhoto?.url
        || normalizeImageUrl(storedProfileImage)

    const confirmLogout = () => {
        setIsLogoutModalOpen(false)
        dispatch(logout())
        navigate("/login", { replace: true })
    }

    const SwitchRoleComponent = (
        Rolename: RoleName,
        Icon: ComponentType<SVGProps<SVGSVGElement>>,
        iconProps?: HandHeartProps,
    ) => {
        const roleCode = roleCodes[Rolename]
        const isActive = activeRoles.includes(roleCode)

        return (
            <S.SwitchGroup>
                <S.SwitchRow>
                    <S.SwitchLabelContent>
                        <S.RoleIcon $size="large"><Icon {...iconProps} aria-hidden="true" /></S.RoleIcon>
                        <S.RoleName>{Rolename}</S.RoleName>
                        <S.InfoIcon type="button" aria-label={`Información sobre el rol de ${Rolename}`} onClick={() => handleRoleInformation(Rolename)}>
                            <Info aria-hidden="true" />
                        </S.InfoIcon>
                    </S.SwitchLabelContent>
                    <S.SwitchToggle>
                        <S.SwitchInput
                            type="checkbox"
                            checked={isActive}
                            aria-label={`${isActive ? "Desactivar" : "Activar"} rol de ${Rolename}`}
                            onChange={(event) => {
                                void handleRoleChange(roleCode, event.target.checked)
                            }}
                        />
                        <S.SwitchControl aria-hidden="true" />
                    </S.SwitchToggle>
                </S.SwitchRow>
            </S.SwitchGroup>
        )
    }
    const ItemComponent = (
        Icon: ComponentType<SVGProps<SVGSVGElement>>,
        label: string,
        description?: string,
        route?: string,
    ) => {
        return (
            <S.Item
                $interactive={Boolean(route)}
                role={route ? 'link' : undefined}
                tabIndex={route ? 0 : undefined}
                onClick={() => route && navigate(route)}
                onKeyDown={(event) => {
                    if (route && (event.key === 'Enter' || event.key === ' ')) {
                        event.preventDefault()
                        navigate(route)
                    }
                }}
            >
                <S.RoleIcon><Icon aria-hidden="true" /></S.RoleIcon>
                <S.ItemInfo>
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
                ariaLabel={selectedRole ? `Información sobre el rol ${selectedRole.name}` : "Información del rol"}
            >
                <S.BottomSheetContent>
                    {selectedRole && (
                        <S.BottomSheetRoleIcon>
                            <selectedRole.Icon {...selectedRole.iconProps} aria-hidden="true" />
                        </S.BottomSheetRoleIcon>
                    )}
                    <S.BottomSheetTitle>{selectedRole?.name}</S.BottomSheetTitle>
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
                        disabled={status === "requesting" || isSavingPhoto}
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
                        disabled={status === "requesting" || isSavingPhoto}
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
            {stream && (
                <CameraCapture
                    stream={stream}
                    canSwitchCamera={cameraDevices.length > 1}
                    zoom={zoom}
                    zoomRange={zoomRange}
                    onCapture={handleCapturePhoto}
                    onClose={stopCamera}
                    onSwitchCamera={switchCamera}
                    onZoomChange={setZoom}
                />
            )}
            <S.Header>
                <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Mi Perfil</S.PageTitle>
                </S.TitlesContainer>
            </S.Header>
            <S.ProfileImageContainer>
                <S.ProfileImageWrapper>
                    <S.ProfileImage src={profileImage} alt={`Foto de perfil de usuario`} />
                    <S.EditProfileImageButton
                        type="button"
                        aria-label="Editar foto de perfil"
                        disabled={isSavingPhoto}
                        onClick={() => setIsPhotoSheetOpen(true)}
                    >
                        <Pencil aria-hidden="true" />
                    </S.EditProfileImageButton>
                </S.ProfileImageWrapper>
                <S.ProfileName>{userData?.username}</S.ProfileName>
                <S.ProfileEmail>{userData?.profile.email}</S.ProfileEmail>
            </S.ProfileImageContainer>
            <S.OptionsContainer>
                <S.RolesContainer>
                    <S.Label>Roles Actuales</S.Label>
                    <S.Description>Activá los roles que querés cumplir en la red. Tocá el ícono de información para saber en qué consiste cada uno.</S.Description>
                    <S.RolesList>
                        {SwitchRoleComponent("Rescatista", HandHeart, { variante: 'outlined' })}
                        {SwitchRoleComponent("Hogar de tránsito", TransitIcon)}
                        {SwitchRoleComponent("Transportista", TransportIcon)}
                    </S.RolesList>
                </S.RolesContainer>
                <S.ItemsMainContainer>
                    <S.Label>Cuenta y Actividad</S.Label>
                    <S.Description>Accedé a tus publicaciones y actualizá tus datos personales cuando lo necesites.</S.Description>
                    <S.ItemsList>
                        {ItemComponent(UserIcon, "Datos personales", "Corroborá y editá tus datos personales", "/mi-perfil/datos-personales")}
                        {ItemComponent(HistoryIcon, "Mis publicaciones", "Editá y eliminá tus publicaciones", "/mis-publicaciones")}
                    </S.ItemsList>
                </S.ItemsMainContainer>
                <S.ItemsMainContainer>
                    <S.Label>Configuración</S.Label>
                    <S.ItemsList>
                        {ItemComponent(SecurityIcon, "Privacidad y Seguridad", "Configurá el acceso con passkey", "/mi-perfil/seguridad")}
                    </S.ItemsList>
                </S.ItemsMainContainer>
            </S.OptionsContainer>
            <S.LogoutButton type="button" onClick={() => setIsLogoutModalOpen(true)}>
                <LogoutIcon aria-hidden="true" />
                Cerrar sesión
            </S.LogoutButton>
        </S.MainContainer>
    )
}
export default Profile;
