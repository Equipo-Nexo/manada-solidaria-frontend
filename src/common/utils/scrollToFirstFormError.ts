import type { BaseSyntheticEvent } from 'react'
import type { FieldErrors, FieldValues } from 'react-hook-form'

export function scrollToFirstFormError(
  _errors: FieldErrors<FieldValues>,
  event?: BaseSyntheticEvent,
) {
  const form = event?.target

  if (!(form instanceof HTMLFormElement)) return

  requestAnimationFrame(() => {
    const firstError = form.querySelector<HTMLElement>('[role="alert"]')

    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
