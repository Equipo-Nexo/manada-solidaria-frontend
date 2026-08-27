
import { ArrowLeft, Camera, ChevronRight, Info, Pencil } from "@/common/icons";
import * as S from "./Profile.styles"
import RescueIcon from "@icons/HandHeart";
import TransitIcon from "@icons/TransitIcon";
import TransportIcon from "@icons/CarFront";
import UserIcon from "@icons/User";
import HistoryIcon from "@icons/History";
import { useState, type SVGProps } from "react";
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
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import type { UserRole } from "@/users/app/api/responses/GetUserProfileResponse";
import { useToast } from "@hooks/toast/useToast";
import { useGetPresignedUrlMutation } from "@/common/app/services/apis/imagesApi";
import { useUploadImageMutation } from "@/common/app/services/apis/cloudflareApi";

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

const roleCodes: Record<RoleName, UserRole> = {
    "Rescatista": "RESCUER",
    "Hogar de tránsito": "TRANSITIONAL_HOME",
    "Transportista": "CARRIAGE",
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

    const [role, setRole] = useState<RoleName | null>(null)

    const [roleOverrides, setRoleOverrides] = useState<Partial<Record<UserRole, boolean>>>({})

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

    const selectedRole = role ? rolesInformation.get(role) : undefined;

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

    function handleRoleInformation(role: RoleName) {
        setOpenBottomSheet(true);
        setRole(role);
    }

    const handleRoleChange = async (roleCode: UserRole, enabled: boolean) => {
        const previousOverride = roleOverrides[roleCode]
        const roles = enabled
            ? Array.from(new Set([...activeRoles, roleCode]))
            : activeRoles.filter((activeRole) => activeRole !== roleCode)

        setRoleOverrides((current) => ({ ...current, [roleCode]: enabled }))

        try {
            await updateUserRoles({ roles }).unwrap()
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
        const phoneNumber = typeof currentPhone === "string"
            ? currentPhone || null
            : currentPhone
                ? `${currentPhone.areaCode}${currentPhone.number}` || null
                : null

        try {
            await updateUserProfile({
                name: userData.profile.name,
                lastname: userData.profile.lastname,
                email: userData.profile.email,
                phoneNumber,
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

    const storedProfileImage = userData?.profile.profileImageURL ?? userData?.profile.profileImageUrl
    const profileImage = capturedPhoto?.url
        || (storedProfileImage
            ? /^(https?:|blob:|data:)/i.test(storedProfileImage)
                ? storedProfileImage
                : `${import.meta.env.VITE_CLOUDFLARE_URL}${storedProfileImage}`
            : NOT_FOUND_IMAGE_URL)

    const confirmLogout = () => {
        setIsLogoutModalOpen(false)
        dispatch(logout())
        navigate("/login", { replace: true })
    }

    const SwitchComponent = (Rolename: RoleName, Icon: React.ComponentType) => {
        const roleCode = roleCodes[Rolename]
        const isActive = activeRoles.includes(roleCode)

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
    const ItemComponent = (Icon: React.ComponentType, label: string, route: string, description?: string) => {
        return (
            <S.Item>
                <S.RoleIcon><Icon aria-hidden="true" /></S.RoleIcon>
                <S.ItemInfo onClick={() => navigate(route)}>
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
                    <S.PageTitle>Mi perfil</S.PageTitle>
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
