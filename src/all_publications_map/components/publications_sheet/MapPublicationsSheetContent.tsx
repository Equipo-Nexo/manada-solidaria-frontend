import type { ComponentType, SVGProps } from 'react'
import ImagePreview from '@/common/components/image_preview/ImagePreview'
import * as Icons from '@/common/icons'
import { AnimalPostStatus } from '@/common/utils/AnimalPostUtils'
import type { MapItem } from '../../app/api/responses/MapResponse'
import * as S from './MapPublicationsSheetContent.styles'
import { theme } from '@/common/styles/theme'
import VetStatusBadge from '@/vets/components/vet_status_badge/VetStatusBadge'
import { useNavigate } from 'react-router-dom'
import { getPublishedAtDescription } from '@/common/utils/Messages'

type MapPublicationsSheetContentProps = {
  items: MapItem[]
  groupId: string
  title: string
  color: string
  iconColor: string
  onClose: () => void
}

const descriptionIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'Clock': Icons.Clock,
  'LocationPin': Icons.LocationPin,
  'Phone': Icons.Phone,
}

function MapPublicationsSheetContent({
  items, groupId, color, iconColor,
}: MapPublicationsSheetContentProps) {
  const navigate = useNavigate();
  const isVet = groupId === 'vets'
  const PublicationIcon = isVet ? Icons.BriefcaseMedical : Icons.PawPrint


  const getSecondLineDescription = (text?: String) => {
    if (!text && isVet) return 'Hoy cerrado'
    return text
  }

  const getHeaderDescription = () => {
    if (isVet) {
      return `${items.length} ${items.length === 1 ? 'veterinaria encontrada' : 'veterinarias encontradas'} en esta área`
    }

    return `${items.length} ${items.length === 1 ? 'publicación encontrada' : 'publicaciones encontradas'} en esta área`
  }

  const handleRedirect = async (id: string) => {
    if (isVet) {
      navigate("/veterinarias", { state: { id }})
    } else {
      navigate(`/animal/detalle/${id}`)
    }
  }

  return (
    <S.Content>
      <S.Header>
        <S.HeaderTitleContainer>
          <Icons.MapPin width={20} height={20} color={theme.colors.brand} />
          <S.HeaderTitle>{isVet ? 'Veterinarias' : 'Publicaciones'} en la zona</S.HeaderTitle>
        </S.HeaderTitleContainer>
        <S.HeaderDescription>
          {getHeaderDescription()}
        </S.HeaderDescription>
      </S.Header>

      <S.List aria-label="Publicaciones seleccionadas">
        {items.map((item) => {
          const FirstDescriptionIcon = descriptionIcons[item.firstLineDescription.iconName ?? ''] ?? Icons.Info
          const SecondDescriptionIcon = descriptionIcons[item.secondLineDescription.iconName ?? ''] ?? Icons.Info

          return (
            <S.Card key={item.id}>
              <S.Photo>
                {item.imageUrl ? (
                    <ImagePreview imageId={item.imageUrl} alt={item.name} variant="fill" loading="lazy" />
                ) : (
                  <S.PhotoPlaceholder $background={color} $color={iconColor} aria-hidden="true">
                    <PublicationIcon />
                  </S.PhotoPlaceholder>
                )}
              </S.Photo>
              <S.Information>
                <S.FirstInformationContainer>
                  <S.FirstLine>
                    <S.Title>{item.name}</S.Title>
                    {
                      isVet ? (
                        <VetStatusBadge status={item.status} />
                      ) : (
                        <S.Status $color={AnimalPostStatus[item.status].fontColor ?? theme.colors.darkColor} $background={AnimalPostStatus[item.status].backgroundColor ?? theme.colors.background}>
                          {AnimalPostStatus[item.status].text}
                        </S.Status>
                      )
                    }
                  </S.FirstLine>
                </S.FirstInformationContainer>
                <S.SecondInformationContainer>
                  <S.SecondLine>
                    <FirstDescriptionIcon width={16} height={16} color={theme.colors.darkColor} />
                    {
                      isVet ? (
                        <S.Description>{item.firstLineDescription.text}</S.Description>
                      ) : (
                        <S.Description>Publicado {getPublishedAtDescription(Number(item.firstLineDescription.text))}</S.Description>
                      )
                    }
                    
                  </S.SecondLine>
                  <S.ThirdLine>
                    <SecondDescriptionIcon width={16} height={16} color={theme.colors.darkColor} />
                    <S.Description>{getSecondLineDescription(item.secondLineDescription.text)}</S.Description>
                  </S.ThirdLine>
                </S.SecondInformationContainer>
              </S.Information>
              <S.RedirectButtonContainer>
                <S.Redirect onClick={() => handleRedirect(item.id)} aria-label="Ver publicación en el mapa">
                  <Icons.ChevronRight width={12} height={12} color={theme.colors.darkColor} />
                </S.Redirect>
              </S.RedirectButtonContainer>
            </S.Card>
          )
        })}
      </S.List>
    </S.Content>
  )
}

export default MapPublicationsSheetContent
