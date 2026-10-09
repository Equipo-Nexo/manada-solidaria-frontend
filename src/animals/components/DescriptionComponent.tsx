import * as S from '@animals/pages/create_animal_post/CreateAnimalPost.styles'
import { PublicationReason } from "@/animals/utils/CreateAnimalPostRequestBuilder"
import type { UseFormRegisterReturn } from "react-hook-form"
import { publicationReasons } from '../utils/PublicationReasons'

export default function DescriptionComponent({
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