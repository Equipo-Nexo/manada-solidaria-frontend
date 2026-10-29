import { AnimalPostStatus } from '@utils/AnimalPostUtils'
import type { AnimalPostStatus as AnimalPostStatusValue } from '@animals/app/types/AnimalPost.types'
import { animalStatusConfig } from './AnimalStatusConfig'
import type {
  ChangePostStatus,
  UpdatePostStatusSheetProps,
} from '@/users/components/animal_post_status_sheet/UpdatePostStatusSheet.types'

interface StatusLogicParams {
  post: { title: string | null; status: string }
  onChangeStatus: ChangePostStatus
  onClose: () => void
}

export function StatusLogic({ post, onChangeStatus, onClose }: StatusLogicParams): UpdatePostStatusSheetProps {
  const name = post.title?.trim()
  const currentStatus = AnimalPostStatus[post.status]
  const config = Object.hasOwn(animalStatusConfig, post.status)
    ? animalStatusConfig[post.status as AnimalPostStatusValue]
    : animalStatusConfig.CREATED
  const personalize = (text: string) => text.replace(
    /\{(name|Name)\}/g,
    (_placeholder, token: string) => name || (token === 'Name' ? 'El animal' : 'el animal'),
  )

  return {
    bottomSheetTitle: personalize(config.bottomSheetTitle),
    bottomSheetDescription: personalize(config.bottomSheetDescription),
    currentStatus: {
      label: currentStatus?.text ?? post.status,
      color: currentStatus?.fontColor ?? '',
      backendValue: post.status,
    },
    possibleStatus: config.possibleStatus.map((option) => ({
      backendValue: option.backendValue,
      isFinalStatus: option.isFinalStatus,
      confirmationTitle: option.confirmationTitle === undefined ? undefined : personalize(option.confirmationTitle),
      confirmationDescription: option.confirmationDescription === undefined ? undefined : personalize(option.confirmationDescription),
      label: personalize(option.label),
      title: personalize(option.title),
      description: personalize(option.description),
      primaryButton: {
        label: personalize(option.primaryButton.label),
        handleClick: onChangeStatus,
      },
      secondaryButton: {
        label: personalize(option.secondaryButton.label),
        handleClick: onClose,
      },
    })),
    onClose,
  }
}
