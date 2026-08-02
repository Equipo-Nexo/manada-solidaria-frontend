import { useState } from "react";
import { ArrowLeft, Pencil, Trash } from "../../components/icons"
import * as S from "./MyPosts.styles"
import { useGetUserPostsQuery } from "../../app/services/apis/usersApi";
import { useNavigate } from "react-router-dom";
import { useDeleteCampaignMutation } from "../../app/services/apis/campaignApi";
import { useDeleteAnimalPostMutation } from "../../app/services/apis/animalPostsApi";
import { useToast } from "../../hooks/toast/useToast";
import { UserPostUtil } from "../../utils/UserPostUtils";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { NOT_FOUND_IMAGE_URL } from "../../utils/CommonUtils";
import type {
    GetUserPostsResponse,
    UserPostType,
} from "../../app/services/responses/userResponses";
import Clock from "../../components/icons/Clock";
import CategorySelector from "../../components/categorySelector/CategorySelector";
import Message from "../../components/message/message";
import { publicationMessages } from "../../utils/Messages";

type PostFilter = '' | 'animal' | 'campaign' | 'fundraising';

const POST_FILTERS: PostFilter[] = ['', 'animal', 'campaign', 'fundraising']
const POST_FILTER_LABELS: Record<PostFilter, string> = {
    '': 'Todos',
    animal: 'Animales',
    campaign: 'Campañas',
    fundraising: 'Colectas'
}

function MyPosts() {
    const navigate = useNavigate()
    const toast = useToast()
    const [selectedFilter, setSelectedFilter] = useState<PostFilter>('');
    const { data: userPosts, isError, isLoading, refetch } = useGetUserPostsQuery(selectedFilter);
    const [deleteCampaign] = useDeleteCampaignMutation();
    const [deleteAnimalPost] = useDeleteAnimalPostMutation();
    const [selectedPost, setSelectedPost] = useState<GetUserPostsResponse | null>(null)
    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)


    const handleEditButton = (post: GetUserPostsResponse) => {
        navigate(`/editar/animal/${post.id}`)
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
        const deletePostByType: Record<UserPostType, (postId: string) => Promise<void>> = {
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
            <S.Header>
                <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Mis publicaciones</S.PageTitle>
                    <S.PageSubtitle>
                        {isLoading
                            ? 'Cargando resultados...'
                            : `${userPosts?.length} ${userPosts?.length === 1 ? 'resultado' : 'resultados'}`}
                    </S.PageSubtitle>
                </S.TitlesContainer>
            </S.Header>
            <S.Content>

                <CategorySelector
                    categories={POST_FILTERS}
                    selectedCategory={selectedFilter}
                    onCategoryChange={setSelectedFilter}
                    getCategoryLabel={(filter) => POST_FILTER_LABELS[filter]}
                    ariaLabel="Filtrar mis publicaciones por categoría"
                />
                <S.CardsContainer>
                    {isLoading && (
                        <S.MessageContainer>
                            <Message message={publicationMessages.loading} iconName="pawPrint" />
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
                    {!isLoading && !isError && userPosts?.length === 0 && (
                        <S.MessageContainer>
                            <Message
                                message={publicationMessages.emptyCategory}
                                iconName="pawPrint"
                            />
                        </S.MessageContainer>
                    )}
                    {!isLoading && !isError && userPosts?.map((post) => {
                        return (
                            <S.Card key={post.id}>
                                <S.CardImage
                                    src={`${import.meta.env.VITE_CLOUDFLARE_URL}${post.imageId}`}
                                    alt={post.title}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = NOT_FOUND_IMAGE_URL;
                                    }}
                                />
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
                                        <S.Button
                                            type="button"
                                            aria-label={`Editar ${post.title}`}
                                            onClick={() => handleEditButton(post)}
                                        >
                                            <Pencil width={17} height={17} />
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
