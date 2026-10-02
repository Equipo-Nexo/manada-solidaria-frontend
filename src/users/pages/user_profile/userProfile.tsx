import { ArrowLeft } from '@/common/icons';
import * as S from './userProfile.styles';
import { useNavigate, useParams } from 'react-router-dom';
import ContactCardComponent from '@/common/components/contact_details_component/ContactCardDetails';
import { CategorySelector, Loader, Message, ScrollHint } from '@/common/components';
import { useRef, useState } from 'react';
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
            <S.MetricValue>{value}</S.MetricValue>
            <S.MetricLabel>{label}</S.MetricLabel>
        </S.Metric>
    )
}

function UserProfile() {

    const navigate = useNavigate();

    const { userId } = useParams<{ userId: string }>();

    const [selectedCategory, setSelectedCategory] = useState<UserPostType>('animal');
    const publicationsRef = useRef<HTMLDivElement>(null);
    const [reservedSpace, setReservedSpace] = useState({ userId, height: 0 });

    const { data: latestData, currentData: data, isFetching: isLoading, isError, refetch } = useGetExternalUserProfileQuery(
        userId ? { userId, type: selectedCategory } : skipToken,
    );

    // Keep the same user's profile visible while fetching a different post category.
    const profileData = data ?? (latestData?.id === userId ? latestData : undefined);

    const handleCategoryChange = (category: UserPostType) => {
        if (category === selectedCategory) return;

        const publications = publicationsRef.current;
        if (publications) {
            // Retain enough page height to prevent the browser from clamping the scroll,
            // including when the next category has fewer posts or no posts at all.
            setReservedSpace({
                userId,
                height: Math.max(0, window.innerHeight - publications.getBoundingClientRect().top),
            });
        }

        setSelectedCategory(category);
    };

    const PHONE_NUMBER = profileData?.profile?.phoneNumber
        ? `${profileData.profile.phoneNumber.areaCode}${profileData.profile.phoneNumber.number}`
        : ""

    const profileImage = normalizeImageUrl(profileData?.profile?.profileImageURL);

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
                    <S.PageTitle>Perfil de {profileData?.username}</S.PageTitle>
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
                        <S.ProfileName>{profileData?.username}</S.ProfileName>
                        <S.ProfileEmail>{profileData?.profile?.email}</S.ProfileEmail>
                        <S.RolesContainer>
                            {profileData?.roles.map((role) => {
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
                            <MetricComponent value={profileData?.posts.length?.toString() || '0'} label="Publicaciones realizadas" />
                            <MetricComponent value="5" label="Casos exitosos" />
                            <MetricComponent value="10 meses" label="En la comunidad" />
                        </S.MetricsContainer>
                        {PHONE_NUMBER && (
                            <ContactCardComponent phoneNumber={PHONE_NUMBER} areaCode={profileData!.profile!.phoneNumber!.areaCode} number={profileData!.profile!.phoneNumber!.number} message={`¡Hola! Me comunico desde Manada Solidaria`} />
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
                            onCategoryChange={handleCategoryChange}
                            getCategoryLabel={(category) => categories.get(category) || category}
                            ariaLabel="Filtrar publicaciones por categoría"
                        />
                    </S.PublicationsHeader>

                    <S.PublicationsContainer
                        ref={publicationsRef}
                        aria-live="polite"
                        aria-busy={isLoading}
                        $minHeight={reservedSpace.userId === userId ? reservedSpace.height : 0}
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
