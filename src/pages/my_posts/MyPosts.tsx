import { useState, type ReactNode } from "react";
import { ArrowLeft, HandHeart, PawPrint, Pencil, Trash } from "../../components/icons"
import * as S from "./MyPosts.styles"
import { useGetUserPostsQuery } from "../../app/services/apis/usersApi";
import { useNavigate } from "react-router-dom";
import { useDeleteCampaignMutation } from "../../app/services/apis/campaignApi";
import { useDeleteAnimalPostMutation } from "../../app/services/apis/animalPostApi";
import { useToast } from "../../hooks/toast/useToast";
import { UserPostUtil } from "../../utils/UserPostUtils";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { theme } from "../../styles/theme";
import { NOT_FOUND_IMAGE_URL } from "../../utils/CommonUtils";
import type { GetUserPostsResponse } from "../../app/services/responses/userResponses";
import Clock from "../../components/icons/Clock";

type PostFilter = '' | 'animal' | 'campaign';

function MyPosts() {
    const navigate = useNavigate()
    const toast = useToast()
    const [selectedFilter, setSelectedFilter] = useState<PostFilter>('');
    const { data: userPosts, isLoading } = useGetUserPostsQuery(selectedFilter);
    const [deleteCampaign] = useDeleteCampaignMutation();
    const [deleteAnimalPost] = useDeleteAnimalPostMutation();
    const [selectedPost, setSelectedPost] = useState<GetUserPostsResponse | null>(null)
    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
    
    const ICON_BY_FILTER: Record<PostFilter, ReactNode> = {
        '': <PawPrint width={50} height={50} color={theme.colors.secondary}/>,
        'animal': <PawPrint width={50} height={50} color={theme.colors.secondary} />,
        'campaign': <HandHeart width={50} height={50} color={theme.colors.secondary} />
    }


    const handleBackButtonClick = () => {
        navigate('/home', { replace: true })
    }

    const handleEditButton = () => {
        // Handle edit button click logic here
    }

    const handleDeleteButton = (post: GetUserPostsResponse) => {
        setSelectedPost(post)
        setOpenBottomSheet(true)
    }

    const closeBottomSheet = () => {
        setSelectedPost(null)
        setOpenBottomSheet(false)        
    }

    const handleAcceptDelete = async (post: GetUserPostsResponse) => {
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
        } finally {
            closeBottomSheet()
        }
    }

  return (
    <S.MyPostsRoot>
        <BottomSheet
            isOpen={openBottomSheet}
            onClose={() => setOpenBottomSheet(false)}
        >
            <S.BottomSheetContent>
                <S.BottomSheetTitle>Eliminar publicación</S.BottomSheetTitle>
                <S.BottomSheetDescription>¿Estás seguro de eliminar {<S.PostTitle>{selectedPost?.title}</S.PostTitle>}? No podrás volver atrás esta acción</S.BottomSheetDescription>
            </S.BottomSheetContent>
            <S.BottomSheetButtonContainer>
                <S.BottomSheetButton
                    $primary
                    onClick={() => selectedPost && handleAcceptDelete(selectedPost)}
                >Si, eliminar</S.BottomSheetButton>
                <S.BottomSheetButton
                    $primary={false}
                    onClick={closeBottomSheet}
                >No, cancelar</S.BottomSheetButton>
            </S.BottomSheetButtonContainer>
        </BottomSheet>
        <S.HeaderContainer>
            <S.BackRowButton onClick={handleBackButtonClick}>
                <ArrowLeft width={48} height={48}/>
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
                        { ICON_BY_FILTER[selectedFilter] }
                        <S.EmptyStateDescription>
                            Aún no realizaste publicaciones, aparecerán aquí una vez creadas
                        </S.EmptyStateDescription>
                    </S.EmptyState>
                )}
                {userPosts?.map((post) => {
                    return (
                        <S.Card key={post.id}>
                            <S.CardImage src={post.imageUrl || NOT_FOUND_IMAGE_URL} alt={post.title} />
                            <S.CardContent>
                                <S.CardInformationContainer>
                                    <S.CardTitle>{post.title}</S.CardTitle>
                                    <S.CreatedSinceContainer>
                                        <Clock />
                                        <S.CreatedSince>{post.createdSince == 0 ? 'Publicado hoy' : `Publicado hace ${post.createdSince} días`}</S.CreatedSince>
                                    </S.CreatedSinceContainer>
                                    {
                                        (post.status && post.status != 'CREATED') && (
                                            <S.Status
                                                $backgroundColor={UserPostUtil[post.status] && UserPostUtil[post.status].backgroundColor}
                                                $fontColor={UserPostUtil[post.status] && UserPostUtil[post.status].fontColor}
                                            >{UserPostUtil[post.status] && UserPostUtil[post.status].text}</S.Status>
                                        )
                                    }
                                </S.CardInformationContainer>
                                <S.ButtonsContainer>
                                    <S.Button onClick={handleEditButton}>
                                        <Pencil width={17} height={17}/>
                                    </S.Button>
                                    <S.Button onClick={() => handleDeleteButton(post)}>
                                        <Trash width={17} height={17} />
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
