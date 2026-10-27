import { useEffect, useRef, useState } from 'react'
import { useUpdateAnimalPostStatusMutation } from '@animals/app/api/animalPostsApi'
import {
  getPossibleStatuses,
  getStatusSelectorOptions,
  type AnimalStatusOption,
} from '@/users/utils/Status.utils'
import { useToast } from '@hooks/toast/useToast'
import { getApiErrorMessage } from '@utils/getApiErrorMessage'
import BottomSheet from '@components/bottomSheet/BottomSheet'
import { Check } from '@icons/index'
import * as S from './AnimalPostStatusSheet.styles'


interface Button {
  label: string
  handleClick: () => void
}

interface PossibleStatus {
  title: string,
  isFinalStatus: boolean,
  bottomSheetTitle: string,
  bottomSheetDescription: string,
  primaryButton: Button,
  secondaryButton: Button
}

interface UpdatePostStatusSheet {
  postId: string,
  name: string,
  currentStatus: string,
  possibleStatus: PossibleStatus[],

}

type AnimalPostStatusSheetProps = {
  post: { id: string; title: string; status: string }
  onChangeStatus: (status: string) => void
  onClose: () => void
}

type StatusSheetProps = {
  name: string
  isLoading: boolean
  onClose: () => void
}

type ConfirmationSheetProps = StatusSheetProps & {
  option: AnimalStatusOption | null
  onConfirm: (option: AnimalStatusOption) => void
  onCancel: () => void
}

function AnimalPostStatusConfirmationSheet({
  name, option, isLoading, onConfirm, onCancel, onClose,
}: ConfirmationSheetProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contentRef.current?.focus()
  }, [])

  if (!option) return null

  const title = option.finalAction
    ? `¿El animal ${option.finalAction}?`
    : `¿Cambiar el estado de ${name} a ${option.label.toLowerCase()}?`
  const confirmLabel = option.finalAction ? `Sí, ${option.finalAction}` : 'Sí, cambiar estado'

  return (
    <BottomSheet isOpen ariaLabel="Confirmar cambio de estado" onClose={onClose}>
      <S.Content ref={contentRef} tabIndex={-1} aria-busy={isLoading}>
        <S.Title>{title}</S.Title>
        <S.Description>
          {option.finalAction
            ? 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.'
            : option.description}
        </S.Description>
        <S.Actions>
          <S.ActionButton type="button" $primary aria-busy={isLoading} disabled={isLoading} onClick={() => onConfirm(option)}>
            {isLoading ? 'Actualizando...' : confirmLabel}
          </S.ActionButton>
          <S.ActionButton type="button" $primary={false} disabled={isLoading} onClick={onCancel}>
            No, volver
          </S.ActionButton>
        </S.Actions>
        {isLoading && <S.Pending role="status">Actualizando estado...</S.Pending>}
      </S.Content>
    </BottomSheet>
  )
}

type OptionsSheetProps = StatusSheetProps & {
  currentStatus: string
  options: AnimalStatusOption[]
  onSelect: (option: AnimalStatusOption) => void
}

function AnimalPostStatusOptionsSheet({
  name, currentStatus, options, isLoading, onSelect, onClose,
}: OptionsSheetProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contentRef.current?.focus()
  }, [])

  return (
    <BottomSheet isOpen ariaLabel="Cambiar estado de la publicación" onClose={onClose}>
      <S.Content ref={contentRef} tabIndex={-1} aria-busy={isLoading}>
        <S.Title>Cambiar estado</S.Title>
        <S.Description>¿En qué estado está {name}?</S.Description>
        <S.Options aria-label="Estados de la publicación">
          {options.map((option) => {
            const selected = option.value === currentStatus
            return (
              <S.Option
                key={option.value}
                type="button"
                $selected={selected}
                aria-pressed={selected}
                disabled={isLoading}
                onClick={() => onSelect(option)}
              >
                <S.OptionText>
                  <S.OptionLabel>{option.label}</S.OptionLabel>
                  <S.OptionDescription>{option.description}</S.OptionDescription>
                </S.OptionText>
                <S.CheckCircle $selected={selected} aria-hidden="true"><Check /></S.CheckCircle>
              </S.Option>
            )
          })}
        </S.Options>
        {isLoading && <S.Pending role="status">Actualizando estado...</S.Pending>}
      </S.Content>
    </BottomSheet>
  )
}

const sheetsByOptionCount = {
  1: AnimalPostStatusConfirmationSheet,
  2: AnimalPostStatusOptionsSheet,
}

function AnimalPostStatusSheet({ post, onClose, onChangeStatus }: AnimalPostStatusSheetProps) {
  const possibleStatuses = getPossibleStatuses(post.status)
  const [confirmation, setConfirmation] = useState<AnimalStatusOption | null>(
    possibleStatuses.length === 1 ? possibleStatuses[0] : null,
  )
  const [updateStatus, { isLoading }] = useUpdateAnimalPostStatusMutation()
  const requestInFlight = useRef(false)
  const toast = useToast()
  const name = post.title.trim() || 'el animal'

  const handleClose = () => {
    if (!requestInFlight.current) onClose()
  }

  const handleUpdate = async (option: AnimalStatusOption) => {
    if (requestInFlight.current || !possibleStatuses.some(({ value }) => value === option.value)) return

    requestInFlight.current = true
    try {
      await updateStatus({ postId: post.id, status: option.value }).unwrap()
      toast.success('Estado actualizado', `El estado de ${name} cambió a ${option.label.toLowerCase()}.`)
      onClose()
    } catch (error) {
      toast.error('No pudimos cambiar el estado', getApiErrorMessage(error, 'Intentá nuevamente.'))
    } finally {
      requestInFlight.current = false
    }
  }

  const handleSelect = (option: AnimalStatusOption) => {
    if (option.value === post.status || requestInFlight.current) return
    if (option.finalAction) {
      setConfirmation(option)
      return
    }
    void handleUpdate(option)
  }

  const handleBack = () => {
    if (possibleStatuses.length === 1) {
      handleClose()
      return
    }
    setConfirmation(null)
  }

  if (possibleStatuses.length === 0) return null

  const optionCount = confirmation || possibleStatuses.length === 1 ? 1 : 2
  const StatusSheet = sheetsByOptionCount[optionCount]


  return (
    <div><button onClick={() => onChangeStatus("Perro")}>Presionar</button></div>
    // <StatusSheet
    //   name={name}
    //   currentStatus={post.status}
    //   options={getStatusSelectorOptions(post.status)}
    //   option={confirmation}
    //   isLoading={isLoading}
    //   onSelect={handleSelect}
    //   onConfirm={handleUpdate}
    //   onCancel={handleBack}
    //   onClose={handleClose}
    // //tengo que pasar los estados posibles, el color de cada pildora y el método al cual llamar
    // />
  )
}

export default AnimalPostStatusSheet
