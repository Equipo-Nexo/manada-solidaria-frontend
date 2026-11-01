import styled from 'styled-components'
import * as StatusStyles from '../animal_post_status_sheet/UpdatePostStatusSheet.styles'
export { OptionText } from '../animal_post_status_sheet/UpdatePostStatusSheet.styles'
import { BottomSheet } from '@components/index'
import * as Base from '@components/bottomSheet/ConfirmationSheet.styles'
import {
  BottomSheetHandle, BottomSheetContent, BottomSheetCloseButton,
} from '@components/bottomSheet/BottomSheet.styles'

export const Sheet = styled(BottomSheet)`
  border-radius: 24px 24px 0 0;
  padding: 8px 16px calc(32px + env(safe-area-inset-bottom));
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%);

  ${BottomSheetHandle} {
    width: 40px;
    margin-bottom: 24px;
  }

  ${BottomSheetContent} { gap: 8px; }

  ${BottomSheetCloseButton} {
    width: 40px;
    height: 40px;
  }

  @media (min-width: 768px) {
    max-width: 390px;
    border-radius: 24px;
    padding: 16px 16px 32px;
  }
`

export const Content = styled(Base.Content)`
  padding: 0;
`

export const Title = styled(Base.Title)`
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.confirmationTitle};
`

export const Description = styled(Base.Description)`
  width: 100%;
  max-width: 298px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.black};
`

export const Subtitle = styled(Base.Description)`
  max-width: 100%;
  color: ${({ theme }) => theme.colors.darkColor};
`

export const Options = styled(StatusStyles.Options)`
  margin-top: 16px;
`

export const CheckCircle = styled(StatusStyles.CheckCircle)`
  width: 20px;
  height: 20px;
  border-width: 2px;
`

export const Option = styled(StatusStyles.Option)`
  min-height: 62px;
  padding: 8px 16px 8px 24px;
  border-radius: 12px;

  &:focus-visible {
    background: ${({ theme }) => theme.colors.neutral};
  }

  &:focus-visible ${CheckCircle} {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.neutral};
  }

  @media (hover: hover) {
    &:hover ${CheckCircle} {
      background: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.neutral};
    }
  }
`

export const OptionLabel = styled(StatusStyles.OptionLabel)`
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const OptionDescription = styled(StatusStyles.OptionDescription)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  opacity: 0.7;
`

export const Actions = styled(Base.Actions)`
  margin-top: 16px;
`

export const ActionButton = styled(Base.ActionButton)`
  min-height: 62px;
  padding: 8px 16px;
  border-width: 2px;
  border-radius: 12px;
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${({ $destructive, theme }) => $destructive && `
    &,
    &:hover:not(:disabled),
    &:focus-visible:not(:disabled),
    &:active:not(:disabled),
    &[aria-busy='true'] {
      border-color: ${theme.colors.destructiveAction};
      background: ${theme.colors.destructiveAction};
      color: ${theme.colors.background};
    }
  `}
`
