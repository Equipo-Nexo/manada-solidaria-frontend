import * as S from '@animals/pages/create_animal_post/CreateAnimalPost.styles'
import { PublicationReason } from "@/animals/utils/PublicationReasonUtil"
import type { UseFormRegisterReturn } from "react-hook-form"

export const publicationReasons: Array<{
  value: PublicationReason
  title: string
  description: string
  textArea: string
}> = [
    { value: PublicationReason.Adoption, title: 'En adopción', description: 'Busca familia o tránsito (hogar provisorio)', textArea: '¿Cómo es su personalidad? ¿Cómo lo/la encontraste?...' },
    { value: PublicationReason.Lost, title: 'Perdido', description: 'Es mi mascota y la estoy buscando', textArea: '¿Cómo es? Proporcioná una descripción detallada para que sea fácilmente reconocible..' },
    { value: PublicationReason.Street, title: 'En la calle', description: 'Lo vi suelto y sin dueño aparente', textArea: '¿Dónde lo viste? ¿Es un animal comunitario? ¿Se encuentra herido? ....' },
    { value: PublicationReason.Transit, title: 'En tránsito', description: 'Está bajo cuidado temporal y busca un hogar', textArea: '¿Durante cuánto tiempo tiene tránsito? ¿Cómo es su personalidad? ¿Dónde lo/la encontraste? ....' },
  ]

export function DescriptionComponent({
  publicationReason,
  registration,
}: {
  publicationReason?: PublicationReason
  registration: UseFormRegisterReturn<'story'>
}) {
  const placeholder = publicationReasons.find(
    ({ value }) => value === publicationReason,
  )?.textArea ?? 'Contanos la historia del animal'

  return (
    <S.TextArea
      placeholder={placeholder}
      {...registration}
    />
  )
}