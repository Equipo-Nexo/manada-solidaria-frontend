import {
    ArrowLeft,
    ChevronRight,
    Phone,
} from '@/common/icons'
import * as S from './Community.styles'
import { useNavigate } from 'react-router-dom'
import { CategorySelector } from '@/common/components'
import { theme } from '@/common/styles/theme'
import { useState } from 'react'
import { useGetUsersQuery } from '@/users/app/api/usersApi'
import { UserType, type UserRole } from '@/users/app/api/requests/GetUsersRequest'
import {
    NOT_FOUND_IMAGE_URL,
    normalizeImageUrl,
} from '@/common/utils/CommonUtils'
import { capitalizeFirstLetter } from '@/common/utils/TextFormater'
import PawLoader from '@/common/components/pawLoader/PawLoader'

const roleConfig = {
    [UserType.Rescatistas]: {
        label: 'Rescatista',
        backgroundColor: `${theme.colors.statusFoundBackground}`,
        textColor: `${theme.colors.success}`,
    },
    [UserType.Tránsitos]: {
        label: 'Tránsito',
        backgroundColor: theme.colors.neutral,
        textColor: theme.colors.secondary,
    },
    [UserType.Transportistas]: {
        label: 'Transportista',
        backgroundColor: theme.colors.neutral,
        textColor: theme.colors.brand,
    },
    [UserType.Comunidad]: {
        label: 'Comunidad',
        backgroundColor: theme.colors.tertiary,
        textColor: theme.colors.statusAdoptionText,
    },
    [UserType.Veterinarios]: {
        label: 'Veterinario',
        backgroundColor: theme.colors.soft,
        textColor: theme.colors.darkColor,
    },
} as const

export default function Community() {
    const categoryLabels: Record<UserType, string> = {
        [UserType.Todos]: 'Todos',
        [UserType.Comunidad]: 'Comunidad',
        [UserType.Rescatistas]: 'Rescatistas',
        [UserType.Transportistas]: 'Transportistas',
        [UserType.Tránsitos]: 'Tránsitos',
        [UserType.Veterinarios]: 'Veterinarios',
    }

    const categories: UserType[] = [
        UserType.Todos,
        UserType.Comunidad,
        UserType.Rescatistas,
        UserType.Transportistas,
        UserType.Tránsitos,
        UserType.Veterinarios,
    ]

    const [selectedCategory, setSelectedCategory] = useState<UserType>(
        UserType.Todos,
    )

    const { data: usersData, isLoading } = useGetUsersQuery({
        role: selectedCategory,
    })

    const totalMembers = usersData?.length ?? 0

    const navigate = useNavigate()

    interface CardInterface {
        id: string,
        profileImageURL: string | null,
        username: string,
        roles: UserRole[],
        areaCode?: string,
        number?: string
    }

    const Card = ({ id, profileImageURL, username, roles, areaCode, number }: CardInterface) => {
        return (
            <S.Card key={id}>
                <S.ProfilePhotoContainer>
                    <S.ProfilePhoto src={normalizeImageUrl(profileImageURL) || NOT_FOUND_IMAGE_URL} alt="Foto de perfil del usuario" />
                </S.ProfilePhotoContainer>
                <S.MemberInfo>
                    <S.MemberName>{username}</S.MemberName>
                    <S.MemberRoles>
                        {roles.map((role) => {
                            const config = roleConfig[role]

                            return (
                                <S.MemberRole
                                    key={role}
                                    $backgroundColor={config.backgroundColor}
                                    $textColor={config.textColor}
                                >
                                    {config.label}
                                </S.MemberRole>
                            )
                        })}
                    </S.MemberRoles>
                    {number && (
                        <S.MemberPhoneNumber><Phone />{areaCode} - {number}</S.MemberPhoneNumber>
                    )}
                </S.MemberInfo>
                <ChevronRight />
            </S.Card>
        )
    }


    return (
        <S.MainContainer>
            <S.Header>
                <S.BackButton type="button" onClick={() => navigate('/home')} aria-label="Volver">
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Comunidad</S.PageTitle>
                    <S.PageSubtitle>
                        {totalMembers} miembros encontrados
                    </S.PageSubtitle>
                </S.TitlesContainer>
            </S.Header>
            <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                getCategoryLabel={(category) => categoryLabels[category]}
                ariaLabel="Filtrar miembros por rol"
            />
            <S.CardsContainer>
                {isLoading && <PawLoader aria-label="Cargando miembros de la comunidad" />}
                {usersData?.map((user) => (
                    <Card
                        key={user.id}
                        id={user.id}
                        profileImageURL={user.profileImageURL}
                        username={capitalizeFirstLetter(user.username)}
                        roles={user.roles}
                        areaCode={user.phoneNumber?.areaCode}
                        number={user.phoneNumber?.number}
                    />
                ))}
            </S.CardsContainer>
        </S.MainContainer>
    )
}
