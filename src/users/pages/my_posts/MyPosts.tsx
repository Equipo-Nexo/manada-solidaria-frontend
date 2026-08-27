import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowLeft, Pencil, Trash } from "../../../common/icons"
import * as S from "./MyPosts.styles"
import { useGetUserPostsQuery } from "@/users/app/api/usersApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteCampaignMutation } from "@campaigns/app/api/campaignApi";
import { useDeleteAnimalPostMutation } from "@animals/app/api/animalPostsApi";
import { useToast } from "@hooks/toast/useToast";
import { AnimalPostStatus } from "@utils/AnimalPostUtils";
import { BottomSheet, CategorySelector, ImagePreview, Message } from "@components/index.ts";
import { Clock } from "@icons/index.ts";
import type { GetUserPostsResponse, UserPostType } from "@services/responses/userResponses";
import { publicationMessages } from "@utils/Messages";

type PostFilter = '' | 'animal' | 'campaign' | 'fundraising';

const POST_FILTERS: PostFilter[] = ['', 'animal', 'campaign', 'fundraising']
const POST_FILTER_LABELS: Record<PostFilter, string> = {
    '': 'Todos',
    animal: 'Animales',
    campaign: 'Campañas',
    fundraising: 'Colectas'
}

const isPostFilter = (filter: string | null): filter is PostFilter =>
    filter !== null && POST_FILTERS.includes(filter as PostFilter)

function MyPosts() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const toast = useToast()
    const filterParam = searchParams.get('tipo')
    const selectedFilter: PostFilter = isPostFilter(filterParam) ? filterParam : ''
    const { data: userPosts, isError, isLoading, refetch } = useGetUserPostsQuery(selectedFilter);
    const [deleteCampaign] = useDeleteCampaignMutation();
    const [deleteAnimalPost] = useDeleteAnimalPostMutation();
    const [selectedPost, setSelectedPost] = useState<GetUserPostsResponse | null>(null)
    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)

    const handleFilterChange = (filter: PostFilter) => {
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams)

            if (filter) {
                nextParams.set('tipo', filter)
            } else {
                nextParams.delete('tipo')
            }

            return nextParams
        }, { replace: true })
    }

    const handleEditButton = (post: GetUserPostsResponse) => {
        const editByPostType: Record<UserPostType, (postId: string) => void> = {
            campaign: (postId) => navigate(`/editar/campania/${postId}`),
            animal: (postId) => navigate(`/editar/animal/${postId}`),
            fundraising: (postId) => navigate(`/editar/colecta/${postId}`)
        }
        editByPostType[post.postType](post.id)
    }

    const handleDeleteButton = (post: GetUserPostsResponse) => {
        setSelectedPost(post)
        setOpenBottomSheet(true)
    }

    const handleClickButton = (post: GetUserPostsResponse, event: MouseEvent<HTMLElement>) => {
        const clickByPostType: Record<UserPostType, (postId: string) => void> = {
            campaign: (postId) => navigate(`campaña/detalle/${postId}`),
            animal: (postId) => navigate(`/animal/detalle/${postId}`),
            fundraising: (postId) => navigate(`/colecta/detalle/${postId}`),
        }
        if (event.target instanceof Element && event.target.closest('button, a')) return

        clickByPostType[post.postType](post.id)
    }

    const handlePostKeyDown = (post: GetUserPostsResponse, event: KeyboardEvent<HTMLElement>) => {
        if (post.postType === 'animal' && event.key === 'Enter' && event.target === event.currentTarget) {
            navigate(`/detalle/${post.id}`)
        }
    }

    const closeBottomSheet = () => {
        setSelectedPost(null)
        setOpenBottomSheet(false)
    }

    const handleAcceptDelete = async (post: GetUserPostsResponse) => {
        const deletePostByType: Record<UserPostType, (postId: string) => Promise<void>> = {
            campaign: (postId) => deleteCampaign(postId).unwrap(),
            animal: (postId) => deleteAnimalPost(postId).unwrap(),
            fundraising: (postId) => deleteCampaign(postId).unwrap()
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
                <S.BackButton type="button" onClick={() => navigate('/home')} aria-label="Volver">
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
                    onCategoryChange={handleFilterChange}
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
                    {!isLoading && !isError && userPosts?.map(({ id, imageId, title, createdSince, status, postType }) => {
                        return (
                            <S.Card
                                key={id}
                                $clickable={postType === 'animal'}
                                role={postType === 'animal' ? 'link' : undefined}
                                tabIndex={postType === 'animal' ? 0 : undefined}
                                onClick={(event) => handleClickButton({ id, imageId, title, createdSince, status, postType }, event)}
                                onKeyDown={(event) => handlePostKeyDown({ id, imageId, title, createdSince, status, postType }, event)}
                            >
                                <ImagePreview
                                    imageId={imageId}
                                    alt={title}
                                    variant="square"
                                />
                                <S.CardContent>
                                    <S.CardInformationContainer>
                                        <S.CardTitle>{title}</S.CardTitle>
                                        <S.CreatedSinceContainer>
                                            <Clock />
                                            <S.CreatedSince>{createdSince == 0 ? 'Publicado hoy' : `Publicado hace ${createdSince} días`}</S.CreatedSince>
                                        </S.CreatedSinceContainer>
                                        {
                                            status && AnimalPostStatus[status] && (
                                                <S.Status
                                                    $backgroundColor={AnimalPostStatus[status].backgroundColor}
                                                    $fontColor={AnimalPostStatus[status].fontColor}
                                                >{AnimalPostStatus[status].text}</S.Status>
                                            )
                                        }
                                    </S.CardInformationContainer>
                                    <S.ButtonsContainer>
                                        <S.Button
                                            type="button"
                                            aria-label={`Editar ${title}`}
                                            onClick={() => handleEditButton({ id, imageId, title, createdSince, status, postType })}
                                        >
                                            <Pencil width={17} height={17} />
                                        </S.Button>
                                        <S.Button onClick={() => handleDeleteButton({ id, imageId, title, createdSince, status, postType })}>
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
