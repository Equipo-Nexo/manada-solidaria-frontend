import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowLeft, ChevronDown, Pencil, Trash } from "../../../common/icons"
import * as S from "./MyPosts.styles"
import { useGetUserPostsQuery } from "@/users/app/api/usersApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteCampaignMutation } from "@campaigns/app/api/campaignApi";
import { useDeleteAnimalPostMutation, useUpdateAnimalPostStatusMutation } from "@animals/app/api/animalPostsApi";
import { useToast } from "@hooks/toast/useToast";
import { BottomSheet, CategorySelector, ImagePreview, Message } from "@components/index.ts";
import { Clock } from "@icons/index.ts";
import type { GetUserPostsResponse, UserPostType } from "@services/responses/userResponses";
import { getPublishedAtDescription, publicationMessages } from "@utils/Messages";
import { AnimalPostStatus } from "@/common/utils/AnimalPostUtils";
import { getPossibleStatuses } from "@/users/utils/StatusUtils";
import { isFinalAnimalPostStatus } from '@animals/utils/AnimalPostStatusUtils';
import UpdatePostStatusSheet from "@/users/components/animal_post_status_sheet/UpdatePostStatusSheet";
import { getApiErrorMessage } from "@utils/getApiErrorMessage";
import type { UpdateAnimalPostStatusRequest } from "@/animals/app/api/requests/animalPostRequests";
import { StatusLogic } from "./utils/AnimalStatusLogic";
import { ANIMAL_POST_STATUS_LABELS } from "@/animals/utils/AnimalFormUtils";

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
    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateAnimalPostStatusMutation();
    const [selectedPost, setSelectedPost] = useState<GetUserPostsResponse | null>(null)
    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
    const [statusPost, setStatusPost] = useState<GetUserPostsResponse | null>(null)
    const statusCardRef = useRef<HTMLElement | null>(null)
    const selectedPostTitle = selectedPost?.title?.trim()

    useEffect(() => {
        if (!statusPost) statusCardRef.current?.focus()
    }, [statusPost])

    const handleStatusButton = (post: GetUserPostsResponse, event: MouseEvent<HTMLButtonElement>) => {
        statusCardRef.current = event.currentTarget.closest<HTMLElement>('[role="link"]')
        setStatusPost(post)
    }

    const closeStatusSheet = () => {
        setStatusPost(null)
    }

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
        if (post.postType === 'animal' && isFinalAnimalPostStatus(post.status)) return

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

    const openPostDetail = (post: GetUserPostsResponse) => {
        const detailByPostType: Record<UserPostType, (postId: string) => void> = {
            campaign: (postId) => navigate(`/campanias/${postId}`),
            animal: (postId) => navigate(`/animal/detalle/${postId}`),
            fundraising: (postId) => navigate(`/colectas/${postId}`),
        }

        detailByPostType[post.postType](post.id)
    }

    const handleClickButton = (post: GetUserPostsResponse, event: MouseEvent<HTMLElement>) => {
        if (event.target instanceof Element && event.target.closest('button, a')) return

        openPostDetail(post)
    }

    const handlePostKeyDown = (post: GetUserPostsResponse, event: KeyboardEvent<HTMLElement>) => {
        if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
            event.preventDefault()
            openPostDetail(post)
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

    const changeStatusSelector = (publicationType: UserPostType, status: UpdateAnimalPostStatusRequest["status"]) => {
        switch (publicationType) {
            case 'animal':
                return handleChangeStatus(status)
            //acá agregar los demás tipos de publicaciones
            default:
                throw new Error(`Cambio de estado no implementado para ${publicationType}`)
        }
    }

    const handleChangeStatus = async (status: UpdateAnimalPostStatusRequest["status"]) => {
        if (!statusPost || isUpdatingStatus) return;
        if (!getPossibleStatuses(statusPost.status).some((option) => option.value === status)) return;
        try {
            await updateStatus({
                postId: statusPost.id,
                status: status,
            }).unwrap();

            toast.success(
                "Estado actualizado",
                `El estado cambió a ${ANIMAL_POST_STATUS_LABELS[status]}.`,
            );

            closeStatusSheet();
        } catch (error) {
            toast.error(
                "No pudimos cambiar el estado",
                getApiErrorMessage(error, "Intentá nuevamente."),
            );
        }
    };

    const statusSheetProps = statusPost ? StatusLogic({
        post: statusPost,
        onChangeStatus: (status) => {
            if (!statusPost) return;
            return changeStatusSelector(statusPost.postType, status);
        },
        onClose: closeStatusSheet,
    }) : null;

    return (
        <S.MyPostsRoot>
            {statusPost && statusSheetProps && (
                <UpdatePostStatusSheet key={statusPost.id} {...statusSheetProps} />
            )}
            <BottomSheet
                isOpen={openBottomSheet}
                ariaLabel="Confirmar eliminación de publicación"
                onClose={closeBottomSheet}
            >
                <S.BottomSheetContent>
                    <S.BottomSheetTitle>Eliminar publicación</S.BottomSheetTitle>
                    <S.BottomSheetDescription>
                        ¿Estás seguro de eliminar la publicación{selectedPostTitle && <> de <S.PostTitle>{selectedPostTitle}</S.PostTitle></>}?
                    </S.BottomSheetDescription>
                    <S.BottomSheetButtonContainer>
                        <S.BottomSheetButton
                            type="button"
                            $primary
                            $destructive
                            onClick={() => selectedPost && handleAcceptDelete(selectedPost)}
                        >Sí, eliminar</S.BottomSheetButton>
                        <S.BottomSheetButton
                            type="button"
                            $primary={false}
                            onClick={closeBottomSheet}
                        >No, cancelar</S.BottomSheetButton>
                    </S.BottomSheetButtonContainer>
                </S.BottomSheetContent>
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
                        const canChangeStatus = postType === 'animal' && getPossibleStatuses(status).length > 0
                        const canEdit = postType !== 'animal' || !isFinalAnimalPostStatus(status)
                        return (
                            <S.Card
                                key={id}
                                $clickable
                                role="link"
                                tabIndex={0}
                                onClick={(event) => handleClickButton({ id, imageId, title, createdSince, status, postType }, event)}
                                onKeyDown={(event) => handlePostKeyDown({ id, imageId, title, createdSince, status, postType }, event)}
                            >
                                <S.CardImage>
                                    <ImagePreview
                                        imageId={imageId}
                                        alt={title}
                                        variant="fill"
                                    />
                                </S.CardImage>
                                <S.CardContent>
                                    <S.CardInformationContainer>
                                        <S.CardTitle>{title}</S.CardTitle>
                                        <S.CreatedSinceContainer>
                                            <Clock />
                                            <S.CreatedSince>Publicado {getPublishedAtDescription(createdSince)}</S.CreatedSince>
                                        </S.CreatedSinceContainer>
                                        {
                                            status && AnimalPostStatus[status] && (
                                                <S.Status
                                                    as={canChangeStatus ? 'button' : 'span'}
                                                    type={canChangeStatus ? 'button' : undefined}
                                                    $interactive={canChangeStatus}
                                                    $backgroundColor={AnimalPostStatus[status].backgroundColor}
                                                    $fontColor={AnimalPostStatus[status].fontColor}
                                                    aria-label={canChangeStatus ? `Cambiar estado de ${title}: ${AnimalPostStatus[status].text}` : undefined}
                                                    aria-haspopup={canChangeStatus ? 'dialog' : undefined}
                                                    onClick={canChangeStatus ? (event: MouseEvent<HTMLButtonElement>) =>
                                                        handleStatusButton({ id, imageId, title, createdSince, status, postType }, event)
                                                        : undefined}
                                                >
                                                    {AnimalPostStatus[status].text}
                                                    {canChangeStatus && <ChevronDown aria-hidden="true" />}
                                                </S.Status>
                                            )
                                        }
                                    </S.CardInformationContainer>
                                    <S.ButtonsContainer>
                                        {canEdit && (
                                            <S.Button
                                                type="button"
                                                aria-label={`Editar ${title}`}
                                                onClick={() => handleEditButton({ id, imageId, title, createdSince, status, postType })}
                                            >
                                                <Pencil width={17} height={17} />
                                            </S.Button>
                                        )}
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
