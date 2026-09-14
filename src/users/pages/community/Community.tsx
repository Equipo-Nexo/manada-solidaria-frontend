import {
    ArrowLeft
} from '@/common/icons'
import * as S from './Community.styles'
import { useNavigate } from 'react-router-dom'
import { CategorySelector } from '@/common/components'
import { useState } from 'react'
import { useGetUsersQuery } from '@/users/app/api/usersApi'
import { UserType } from '@/users/app/api/requests/GetUsersRequest'
import { capitalizeFirstLetter } from '@/common/utils/TextFormater'
import PawLoader from '@/common/components/pawLoader/PawLoader'
import CommunityCard from './components/CommunityCard'
import { categories, categoryLabels } from '@/users/utils/CommunityUtils'

export default function Community() {


    const [selectedCategory, setSelectedCategory] = useState<UserType>(
        UserType.Todos,
    )

    const { data: usersData, isLoading } = useGetUsersQuery({
        role: selectedCategory,
    })

    const totalMembers = usersData?.length ?? 0

    const navigate = useNavigate()

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
                    <CommunityCard
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
