import { useState } from "react";
import { ArrowLeft, Pencil, Trash } from "../../components/icons"
import * as S from "./MyPosts.styles"
import { useGetUserPostsQuery, type GetUserPostsResponse } from "../../app/services/apis/usersApi";
import { useNavigate } from "react-router-dom";
import { useDeleteCampaignMutation } from "../../app/services/apis/campaignApi";
import { useDeleteAnimalPostMutation } from "../../app/services/apis/animalPostApi";
import { useToast } from "../../hooks/toast/useToast";
import { UserPostUtil } from "../../utils/UserPostUtils";

function MyPosts() {
    const navigate = useNavigate()
    const toast = useToast()
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const { data: userPosts, isLoading } = useGetUserPostsQuery(selectedFilter);
    const [deleteCampaign] = useDeleteCampaignMutation();
    const [deleteAnimalPost] = useDeleteAnimalPostMutation();
    const handleBackButtonClick = () => {
        navigate('/home', { replace: true })
    }

    const handleEditButton = () => {
        // Handle edit button click logic here
    }

    const handleDeleteButton = async (post: GetUserPostsResponse) => {
        const deletePostByType: Record<string, (postId: string) => Promise<void>> = {
            campaign: (postId) => deleteCampaign(postId).unwrap(),
            animal: (postId) => deleteAnimalPost(postId).unwrap(),
        }
        const deletePost = deletePostByType[post.postType]

        try {
            await deletePost(post.id)
            toast.success(
                'Publicación eliminada',
                'La publicación se eliminó correctamente.'
            )
        } catch {
            toast.error(
                'No pudimos eliminar la publicación',
                'Intentá nuevamente en unos minutos.'
            )
        }
    }

  return (
    <S.MyPostsRoot>
        <S.HeaderContainer>
            <S.BackRowButton onClick={handleBackButtonClick}>
                <ArrowLeft />
            </S.BackRowButton>
            <S.HeaderTextContainer>
                <S.HeaderTitle>Mis Publicaciones</S.HeaderTitle>
                <S.ResultsCount>{userPosts?.length ?? 0} resultados</S.ResultsCount>
            </S.HeaderTextContainer>
        </S.HeaderContainer>
        <S.Content>
            <S.FiltersContainer>
                <S.Filter
                    $isSelected={selectedFilter === ''}
                    onClick={() => setSelectedFilter('')}
                >
                    Todos
                </S.Filter>
                <S.Filter
                    $isSelected={selectedFilter === 'animal'}
                    onClick={() => setSelectedFilter('animal')}
                >
                    Animales
                </S.Filter>
                <S.Filter
                    $isSelected={selectedFilter === 'campaign'}
                    onClick={() => setSelectedFilter('campaign')}
                >
                    Campañas
                </S.Filter>
            </S.FiltersContainer>
            <S.CardsContainer>
                {!isLoading && userPosts?.length === 0 && (
                    <S.EmptyState>
                        <S.EmptyStateTitle>No se encontraron publicaciones</S.EmptyStateTitle>
                        <S.EmptyStateDescription>
                            Cuando realices una publicación, aparecerá en esta sección.
                        </S.EmptyStateDescription>
                    </S.EmptyState>
                )}
                {userPosts?.map((post) => {
                    return (
                        <S.Card key={post.id}>
                            <S.CardImage src={'https://pub-5a96b6f532a84093aad74b71706eddd4.r2.dev/development/1113630f-d565-4715-bed1-8e6ff89d6178'} alt={post.title} />
                            <S.CardContent>
                                <S.CardInformationContainer>
                                    <S.CardTitle>{post.title}</S.CardTitle>
                                    <S.CreatedSince>{post.createdSince == 0 ? 'Publicado hoy' : `Publicado hace ${post.createdSince} días`}</S.CreatedSince>
                                    {
                                        post.status && (
                                            <S.Status
                                                $backgroundColor={UserPostUtil[post.status] && UserPostUtil[post.status].backgroundColor}
                                                $fontColor={UserPostUtil[post.status] && UserPostUtil[post.status].fontColor}
                                            >{UserPostUtil[post.status] && UserPostUtil[post.status].text}</S.Status>
                                        )
                                    }
                                </S.CardInformationContainer>
                                <S.ButtonsContainer>
                                    <S.Button onClick={handleEditButton}>
                                        <Pencil />
                                    </S.Button>
                                    <S.Button onClick={() => handleDeleteButton(post)}>
                                        <Trash />
                                    </S.Button>
                                </S.ButtonsContainer>
                            </S.CardContent>
                        </S.Card>
                    );
                })}
            </S.CardsContainer>
        </S.Content>
    </S.MyPostsRoot>
  )
}

export default MyPosts
