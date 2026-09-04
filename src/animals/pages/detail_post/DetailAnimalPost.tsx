import type { ComponentType } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, Clock, ColorPalet, Money, PawPrint, Ruler, Share } from '@/common/icons'
import { Advice, Message, ScrollHint } from '@components/index.ts'
import Arrow from '@/common/icons/Arrow'
import GenderIcon from '@/common/icons/Gender'
import BookIcon from '@/common/icons/Book'
import { useGetAnimalPostQuery } from '@/animals/app/api/animalPostsApi'
import { animalAgeLabels, animalColorLabels, animalSexLabels, animalSizeLabels, getAnimalName, type AnimalPostType } from '@/animals/app/types/AnimalPost.types'
import { animalKinds } from '@/animals/utils/AnimalFormUtils'
import { normalizeImageUrl, NOT_FOUND_IMAGE_URL } from '@utils/CommonUtils'
import * as S from './DetailAnimalPost.styles'
import { AnimalPostStatus } from '@/common/utils/AnimalPostUtils'
import getOwnerRole from '@/common/utils/GetRoles'
import PawLoader from '@/common/components/pawLoader/PawLoader'
import { formatDateLong } from '@/common/utils/DateTime'
import MapDetailsComponent from '@/common/components/map_details_component/MapDetailsComponent'
import ContactCardComponent from '@/common/components/contact_details_component/ContactCardDetails'
import { shareUrl } from '@/common/utils/HandleShare'

function AnimalPostDetail() {

  const navigate = useNavigate()

  const { postId } = useParams<{ postId: string }>()

  const { data: postData, isLoading, isError } = useGetAnimalPostQuery(postId ?? '', { skip: !postId })

  if (isLoading) {
    return (
      <S.LoaderContainer>
        <PawLoader />
      </S.LoaderContainer>
    )
  }

  if (isError || !postData) {
    return (
      <S.StateContainer role="alert">
        <Message message="No pudimos cargar esta publicación." iconName="pawPrint" />
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver"><Arrow /></S.BackButton>
      </S.StateContainer>
    )
  }

  const PHONE_NUMBER = postData?.phoneNumber
    ? `${postData?.phoneNumber.areaCode}${postData?.phoneNumber.number}`
    : ""

  const name = getAnimalName(postData.name, postData.animal.type)

  const animalKind = animalKinds.find(({ value }) => value === postData.animal.type)?.label
    ?? 'No informado'

  const location = postData.location.name || 'Ubicación no informada'

  const address = postData.location.address || ''

  const status = AnimalPostStatus[postData.status]

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

      case 'IN_STREET':
        return 'Contactá si querés colaborar de alguna forma con el animal en la calle'
    }
  }

  const handleShareButton = () => {
    shareUrl({
      path: `?redirect=${window.location.pathname}`,
      text: 'Mirá este animalito para ayudar.',
      imageUrl: normalizeImageUrl(postData.imageUrl, true),
    })
  }

  return (
    <S.MainContainer>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate('/home')} aria-label="Volver"><Arrow aria-hidden="true" /></S.BackButton>
        <S.PageTitle>Detalle de Publicación</S.PageTitle>
      </S.Header>

      <S.HeroLayout>
        <S.PhotoContainer>
          <S.Photo
            src={normalizeImageUrl(postData.imageUrl)}
            alt={name}
            onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = NOT_FOUND_IMAGE_URL }}
          />
        </S.PhotoContainer>

        <S.DetailsColumn>
          <S.GeneralDataContainer>
            <S.GeneralData>
              <S.Name>{name}</S.Name>
              <S.Status $backgroundColor={status.backgroundColor} $fontColor={status.fontColor}>
                {status.text ?? postData.status}
              </S.Status>
            </S.GeneralData>
            <S.TimeContainer>
              <Clock aria-hidden="true" />
              <span>Publicado el {formatDateLong(postData.createdAt)}</span>
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
                src={normalizeImageUrl(postData.owner.profileImageUrl)}
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

          <MapDetailsComponent
            location={location}
            address={address}
            locationPath={`/mapa?latitude=${postData.location.latitude}&longitude=${postData.location.longitude}`}
          />

          <S.FeaturesGrid aria-label={`Características de ${name}`}>
            {feature(PawPrint, 'Especie', animalKind)}
            {feature(GenderIcon, 'Sexo', animalSexLabels[postData.animal.gender])}
            {feature(Ruler, 'Tamaño', animalSizeLabels[postData.animal.size])}
            {feature(Calendar, 'Edad', animalAgeLabels[postData.animal.age])}
            {feature(ColorPalet, 'Color predominante', postData.animal.color ? animalColorLabels[postData.animal.color] : 'No informado')}

          </S.FeaturesGrid>

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
            <ContactCardComponent phoneNumber={PHONE_NUMBER} areaCode={postData!.phoneNumber!.areaCode} number={postData!.phoneNumber!.number} name={postData?.name ?? ""} />
            <S.AdviceArea>
              <Advice title="" advice={adviceDescriptionSelector(postData.type)} />
            </S.AdviceArea>
          </>
        )}
        <S.ShareButton type="button" aria-label={`Compartir publicación de ${name}`} onClick={handleShareButton}>
          <Share aria-hidden="true" />
          Compartir Publicación
        </S.ShareButton>
      </S.BottomInfoRow>
      <ScrollHint />
    </S.MainContainer>
  )
}

export default AnimalPostDetail
