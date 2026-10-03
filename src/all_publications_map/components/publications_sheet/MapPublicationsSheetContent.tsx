import type { ComponentType, SVGProps } from 'react'
import ImagePreview from '@/common/components/image_preview/ImagePreview'
import * as Icons from '@/common/icons'
import { AnimalPostStatus } from '@/common/utils/AnimalPostUtils'
import type { MapItem } from '../../app/api/responses/MapResponse'
import * as S from './MapPublicationsSheetContent.styles'

type MapPublicationsSheetContentProps = {
  items: MapItem[]
  groupId: string
  title: string
  color: string
  iconColor: string
  onClose: () => void
}

const descriptionIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  calendar: Icons.Calendar,
  clock: Icons.Clock,
  gender: Icons.Gender,
  info: Icons.Info,
  locationpin: Icons.LocationPin,
  mappin: Icons.MapPin,
  pawprint: Icons.PawPrint,
  phone: Icons.Phone,
  ruler: Icons.Ruler,
  stethoscope: Icons.Stethoscope,
  briefcasemedical: Icons.BriefcaseMedical,
}

function MapPublicationsSheetContent({
  items, groupId, title, color, iconColor, onClose,
}: MapPublicationsSheetContentProps) {
  const isVet = groupId === 'vets'
  const PublicationIcon = isVet ? Icons.BriefcaseMedical : Icons.PawPrint

  return (
    <S.Content>
      <S.Header>
        <S.TypeIcon $background={color} $color={iconColor} aria-hidden="true">
          <PublicationIcon />
        </S.TypeIcon>
        <S.Heading>
          <S.Title>{title}</S.Title>
          <S.Count>{items.length} {items.length === 1 ? 'publicación' : 'publicaciones'}</S.Count>
        </S.Heading>
      </S.Header>
      <S.List aria-label="Publicaciones seleccionadas">
        {items.map((item) => {
          const animalStatus = !isVet ? AnimalPostStatus[item.status] : undefined
          const status = isVet
            ? item.status || 'Veterinaria'
            : animalStatus?.text ?? (groupId === 'lostAnimals' ? 'Perdido' : 'En la calle')
          const description = item.firstLineDescription
          const iconName = description?.iconName?.replace(/[^a-z]/gi, '').toLowerCase()
          const DescriptionIcon = descriptionIcons[iconName ?? ''] ?? Icons.Info

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
                <S.Name>{item.name || (isVet ? 'Veterinaria' : 'Animal sin nombre')}</S.Name>
                <S.Status
                  $background={animalStatus?.backgroundColor ?? color}
                  $color={animalStatus?.fontColor ?? iconColor}
                >
                  {status}
                </S.Status>
                {description?.text && (
                  <S.InformationLine>
                    <DescriptionIcon aria-hidden="true" />
                    <span>{description.text}</span>
                  </S.InformationLine>
                )}
                {item.location && (
                  <S.InformationLine>
                    <Icons.LocationPin aria-hidden="true" />
                    <span>{item.location}</span>
                  </S.InformationLine>
                )}
                {!isVet && (
                  <S.DetailLink to={`/animal/detalle/${encodeURIComponent(item.id)}`} onClick={onClose}>
                    Ver publicación <Icons.ChevronRight aria-hidden="true" />
                  </S.DetailLink>
                )}
              </S.Information>
            </S.Card>
          )
        })}
      </S.List>
    </S.Content>
  )
}

export default MapPublicationsSheetContent
