import type { ComponentType } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, Clock, ColorPalet, Map, Money, PawPrint, Phone, Ruler, Share } from '@/common/icons'
import { Advice, Message } from '@components/index.ts'
import Arrow from '@/common/icons/Arrow'
import GenderIcon from '@/common/icons/Gender'
import BookIcon from '@/common/icons/Book'
import { useGetAnimalPostQuery } from '@/animals/app/api/animalPostsApi'
import { animalAgeLabels, animalColorLabels, animalSexLabels, animalSizeLabels, animalTypeLabels, getAnimalName, type AnimalPostType } from '@/animals/app/types/AnimalPost.types'
import { NOT_FOUND_IMAGE_URL } from '@utils/CommonUtils'
import * as S from './detail.styles'
import { AnimalPostStatus } from '@/common/utils/AnimalPostUtils'
import getOwnerRole from '@/common/utils/getUserRoles'

const formatPublishedAt = (createdAt: string) =>
  new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(createdAt))


function AnimalPostDetail() {
  const navigate = useNavigate()

  const { postId } = useParams<{ postId: string }>()

  const { data: postData, isLoading, isError } = useGetAnimalPostQuery(postId ?? '', { skip: !postId })

  if (isLoading) {
    return <S.StateContainer><Message message="Cargando publicación..." iconName="pawPrint" /></S.StateContainer>
  }

  if (isError || !postData) {
    return (
      <S.StateContainer role="alert">
        <Message message="No pudimos cargar esta publicación." iconName="pawPrint" />
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver"><Arrow /></S.BackButton>
      </S.StateContainer>
    )
  }

  const phone = postData?.phoneNumber

  const PHONE_NUMBER = phone
    ? `${phone.areaCode}${phone.number}`
    : ""
  const name = getAnimalName(postData.name, postData.animal.type)

  const location = postData.location.name || postData.location.address || 'Ubicación no informada'

  const mapQuery = postData.location.latitude != null && postData.location.longitude != null
    ? `${postData.location.latitude},${postData.location.longitude}`
    : location

  const status = AnimalPostStatus[postData.status] ??
    (postData.status === 'IN_STREET' ? AnimalPostStatus.TO_RESCUE : undefined)

  const feature = (Icon: ComponentType, label: string, value: string) => (
    <S.FeatureCard>
      <S.FeatureIcon aria-hidden="true"><Icon /></S.FeatureIcon>
      <S.FeatureText><S.FeatureLabel>{label}</S.FeatureLabel><S.FeatureValue>{value}</S.FeatureValue></S.FeatureText>
    </S.FeatureCard>
  )

  const adviceDescriptionSelector = (type: AnimalPostType): string => {
    switch (type) {
      case 'LOST':
        return 'Contactá si tenés información sobre el animal perdido.'

      case 'ADOPTION':
        return 'Contactá para coordinar una visita o saber más sobre el proceso de tránsito o adopción.'

      default:
        return ("Contactá por más información.")
    }
  }

  return (
    <S.MainContainer>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver"><Arrow aria-hidden="true" /></S.BackButton>
        <S.PageTitle>Detalle de Publicación de {name}</S.PageTitle>
      </S.Header>

      <S.HeroLayout>
        <S.PhotoContainer>
          <S.Photo
            src={`${import.meta.env.VITE_CLOUDFLARE_URL}${postData.imageUrl}`}
            alt={name}
            onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = NOT_FOUND_IMAGE_URL }}
          />
          <S.ShareButton type="button" aria-label={`Compartir publicación de ${name}`}><Share aria-hidden="true" /></S.ShareButton>
        </S.PhotoContainer>

        <S.DetailsColumn>
          <S.GeneralDataContainer>
            <S.GeneralData>
              <S.Name>{name}</S.Name>
              <S.Status $backgroundColor={status?.backgroundColor} $fontColor={status?.fontColor}>
                {status?.text ?? postData.status}
              </S.Status>
            </S.GeneralData>
            <S.TimeContainer>
              <Clock aria-hidden="true" />
              <span>Publicado el {formatPublishedAt(postData.createdAt)}</span>
            </S.TimeContainer>
            {postData.reward != null && postData.reward > 0 && (
              <S.InfoContainer $variant="reward">
                <S.RewardIconContainer><Money aria-hidden="true" /></S.RewardIconContainer>
                <S.ValuesContainer>
                  <S.Label>Recompensa ofrecida</S.Label>
                  <S.Info>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(postData.reward)}</S.Info>
                </S.ValuesContainer>
              </S.InfoContainer>
            )}
            <S.InfoContainer $variant="author">
              <S.ProfilePhoto
                src={postData.owner.profileImageUrl
                  ? `${import.meta.env.VITE_CLOUDFLARE_URL}${postData.owner.profileImageUrl}`
                  : '/logo.svg'}
                alt={`Foto de perfil de ${postData.owner.username}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = '/logo.svg'
                }}
              />
              <S.ValuesContainer>
                <S.Label>Publicado por <strong>{postData.owner.username}</strong></S.Label>
                <S.AuthorRole>{getOwnerRole(postData.owner.roles)}</S.AuthorRole>
              </S.ValuesContainer>
            </S.InfoContainer>
          </S.GeneralDataContainer>

          <S.FeaturesGrid aria-label={`Características de ${name}`}>
            {feature(PawPrint, 'Especie', animalTypeLabels[postData.animal.type])}
            {feature(GenderIcon, 'Sexo', animalSexLabels[postData.animal.gender])}
            {feature(Ruler, 'Tamaño', animalSizeLabels[postData.animal.size])}
            {feature(ColorPalet, 'Color predominante', postData.animal.color ? animalColorLabels[postData.animal.color] : 'No informado')}
            {feature(Calendar, 'Edad', animalAgeLabels[postData.animal.age])}
          </S.FeaturesGrid>

          <S.LocationCard>
            <S.MapPreview aria-hidden="true"><S.MapMarker /></S.MapPreview>
            <S.LocationContent>
              <S.LocationTitle>{location}</S.LocationTitle>
              <S.MapLink href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">
                Ver en el mapa <Map aria-hidden="true" />
              </S.MapLink>
            </S.LocationContent>
          </S.LocationCard>

          <S.StorySection>
            <S.SectionTitle>
              <BookIcon />Su historia</S.SectionTitle>
            <S.StoryText>{postData.description}</S.StoryText>
          </S.StorySection>
        </S.DetailsColumn>
      </S.HeroLayout>

      <S.BottomInfoRow>
        {PHONE_NUMBER != "" && (
          <>
            <S.ContactCard>
              <S.SectionTitle><Phone aria-hidden="true" />Contacto</S.SectionTitle>
              <S.PhoneLink href={`tel:${postData.phoneNumber}`}>{PHONE_NUMBER}</S.PhoneLink>
            </S.ContactCard>
            <S.AdviceArea>
              <Advice title="" advice={adviceDescriptionSelector(postData.type)} />
            </S.AdviceArea>
          </>
        )}
      </S.BottomInfoRow>
    </S.MainContainer>
  )
}

export default AnimalPostDetail
