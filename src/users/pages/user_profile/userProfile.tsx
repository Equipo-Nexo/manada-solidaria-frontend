import { ArrowLeft } from '@/common/icons';
import * as S from './userProfile.styles';
import { useNavigate, useParams } from 'react-router-dom';
import ContactCardComponent from '@/common/components/contact_details_component/ContactCardDetails';
import { CategorySelector, Loader, Message, ScrollHint } from '@/common/components';
import { useState } from 'react';
import type { UserPostType } from '@/common/app/services/responses/userResponses';
import { publicationMessages } from '@/common/utils/Messages';
import { useGetExternalUserProfileQuery } from '@/users/app/api/usersApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { roleConfig } from '@/users/utils/CommunityUtils';
import { normalizeImageUrl } from '@/common/utils/CommonUtils';
import CardSelector from '@/users/utils/CardSelectorUserProfile';

interface MetricsComponentProps {
    value: string;
    label: string;
}

function MetricComponent({ value, label }: MetricsComponentProps) {
    return (
        <S.Metric>
            <S.MetricTitle>{value}</S.MetricTitle>
            <S.MetricDescription>{label}</S.MetricDescription>
        </S.Metric>
    )
}

function UserProfile() {

    const navigate = useNavigate();

    const { userId } = useParams<{ userId: string }>();

    const [selectedCategory, setSelectedCategory] = useState<UserPostType>('animal');

    const { data, isLoading, isFetching, isError, refetch } = useGetExternalUserProfileQuery(
        userId ? { userId, type: selectedCategory } : skipToken,
    );

    const PHONE_NUMBER = data?.profile?.phoneNumber
        ? `${data.profile.phoneNumber.areaCode}${data.profile.phoneNumber.number}`
        : ""

    const profileImage = normalizeImageUrl(data?.profile?.profileImageURL);

    const categories = new Map<UserPostType, string>([
        ["animal", "Animales"],
        ["campaign", "Campañas"],
        ["fundraising", "Colectas"],
    ]);

    return (
        <S.MainContainer>
            <S.Header>
                <S.BackButton
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Volver"
                >
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Perfil de {data?.username}</S.PageTitle>
                    <S.PageSubtitle>
                    </S.PageSubtitle>
                </S.TitlesContainer>
            </S.Header>
            <S.SecondaryContainer>
                <S.ProfileSidebar>
                    <S.ProfilePanel>
                        <S.ProfileImage
                            src={profileImage}
                            alt={`Foto de perfil de usuario`}
                        />
                        <S.ProfileName>{data?.username}</S.ProfileName>
                        <S.ProfileEmail>{data?.profile?.email}</S.ProfileEmail>
                        <S.RolesContainer>
                            {data?.roles.map((role) => {
                                const config = roleConfig[role]
                                return (
                                    <S.Role
                                        key={role}
                                        $backgroundColor={config.backgroundColor}
                                        $textColor={config.textColor}
                                    >
                                        {config.label}
                                    </S.Role>
                                )
                            })}
                        </S.RolesContainer>
                        <S.UserInfo>Miembro desde Marzo 2025</S.UserInfo>
                    </S.ProfilePanel>
                    <S.ProfileDetails>
                        <S.MetricsContainer>
                            <MetricComponent value={data?.posts.length?.toString() || '0'} label="Publicaciones realizadas" />
                            <MetricComponent value="5" label="Casos exitosos" />
                            <MetricComponent value="10 meses" label="En la comunidad" />
                        </S.MetricsContainer>
                        {PHONE_NUMBER && (
                            <ContactCardComponent phoneNumber={PHONE_NUMBER} areaCode={data!.profile!.phoneNumber!.areaCode} number={data!.profile!.phoneNumber!.number} message={`¡Hola! Me comunico desde Manada Solidaria`} />
                        )}
                    </S.ProfileDetails>
                </S.ProfileSidebar>

                <S.PublicationsSection aria-labelledby="profile-publications-title">
                    <S.PublicationsHeader>
                        <S.TitleContainer>
                            <S.PublicationsTitle id="profile-publications-title">Publicaciones del usuario <S.PublicationsAmount>({data?.posts.length})</S.PublicationsAmount></S.PublicationsTitle>
                        </S.TitleContainer>
                        <CategorySelector
                            categories={Array.from(categories.keys())}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            getCategoryLabel={(category) => categories.get(category) || category}
                            ariaLabel="Filtrar publicaciones por categoría"
                        />
                    </S.PublicationsHeader>

                    <S.PublicationsContainer
                        aria-live="polite"
                        aria-busy={isFetching}
                        $hasPosts={!isLoading && !isError && Boolean(data?.posts?.length)}
                    >
                        {isLoading && (
                            <S.MessageContainer>
                                <Loader label={publicationMessages.loading} />
                            </S.MessageContainer>
                        )}

                        {isError && (
                            <S.MessageContainer role="alert">
                                <Message message={publicationMessages.loadError} iconName="pawPrint" />
                                <S.RetryButton type="button" onClick={() => void refetch()}>
                                    Reintentar
                                </S.RetryButton>
                            </S.MessageContainer>
                        )}

                        {!isLoading && !isError && data?.posts?.length === 0 && (
                            <S.MessageContainer>
                                <Message message={publicationMessages.noPosts} iconName="pawPrint" />
                            </S.MessageContainer>
                        )}

                        {!isLoading &&
                            !isError &&
                            data?.posts?.map((post) => {
                                return (
                                    <CardSelector key={post.id} post={post} />
                                )
                            })}
                    </S.PublicationsContainer>
                </S.PublicationsSection>

            </S.SecondaryContainer>
            <ScrollHint />

        </S.MainContainer >
    )

}
export default UserProfile;
