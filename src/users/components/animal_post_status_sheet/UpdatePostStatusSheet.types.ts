import type { UpdateAnimalPostStatusRequest } from '@animals/app/api/requests/animalPostRequests'

export type PostStatus = UpdateAnimalPostStatusRequest['status']
export type ChangePostStatus = (status: PostStatus) => void | Promise<void>

export interface PrimaryStatusButton {
  label: string
  handleClick: ChangePostStatus
}

export interface SecondaryStatusButton {
  label: string
  handleClick: () => void
}

export interface PossibleStatus {
  label: string
  title: string
  description: string
  backendValue: PostStatus
  isFinalStatus: boolean
  confirmationTitle?: string
  confirmationDescription?: string
  primaryButton: PrimaryStatusButton
  secondaryButton: SecondaryStatusButton
}

export interface CurrentStatus {
  label: string
  color: string
  backendValue: string
}

export interface UpdatePostStatusSheetProps {
  bottomSheetTitle: string
  bottomSheetDescription: string
  currentStatus: CurrentStatus
  possibleStatus: PossibleStatus[]
  onClose: () => void
}
