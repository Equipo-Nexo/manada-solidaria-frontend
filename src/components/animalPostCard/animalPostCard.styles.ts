import styled from 'styled-components'
import type { AppTheme } from '../../styles/theme'

export type AnimalPostStatus =
  | 'En adopción'
  | 'En tránsito'
  | 'En la calle'
  | 'Perdido'
  | 'Adoptado'
  | 'Encontrado'

type StatusContainerProps = {
  $status: AnimalPostStatus
}

const getStatusVariants = (theme: AppTheme): Record<
  AnimalPostStatus,
  { background: string; color: string }
> => ({
  'En adopción': {
    background: theme.colors.tertiary,
    color: theme.colors.statusAdoptionText,
  },
  'En tránsito': {
    background: theme.colors.neutral,
    color: theme.colors.brand,
  },
  'En la calle': {
    background: theme.colors.statusStreetBackground,
    color: theme.colors.statusStreetText,
  },
  Perdido: {
    background: theme.colors.statusLostBackground,
    color: theme.colors.error,
  },
  Adoptado: {
    background: theme.colors.neutral,
    color: theme.colors.secondary,
  },
  Encontrado: {
    background: theme.colors.statusFoundBackground,
    color: theme.colors.success,
  },
})

export const CardContainer = styled.article`
  width: 325px;
  height: 400px;
  overflow: hidden;
  border: 1px solid rgb(190 202 191 / 30%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: 0 8px 24px -4px rgb(0 109 65 / 8%);
`

export const PhotoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 204px;
  overflow: hidden;
`

export const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 48%;
`

export const ShareButton = styled.button`
  position: absolute;
  top: 11px;
  right: 10px;
  display: grid;
  width: 43px;
  height: 43px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 5px rgb(89 65 55 / 25%);
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const Content = styled.div`
  padding: 10px 13px 14px;
`

export const MainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.typography.header1.fontFamily};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  font-style: ${({ theme }) => theme.typography.header1.fontStyle};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.header1.lineHeight};
`

export const StatusContainer = styled.span<StatusContainerProps>`
  flex-shrink: 0;
  width:112px;
  padding:4px 0px 4px 0px;
  border-radius: 999px;
  color: ${({ theme, $status }) => getStatusVariants(theme)[$status].color};
  background: ${({ theme, $status }) => getStatusVariants(theme)[$status].background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
`

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`

export const Description = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0px;
  max-height: calc(${({ theme }) => theme.typography.body.lineHeight} * 2);
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-style: ${({ theme }) => theme.typography.body.fontStyle};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-align:left;
`

export const ViewMore = styled.button`
  display: block;
  margin-top: 3px;
  padding: 2px;
  border: 0;
  color: ${({ theme }) => theme.colors.secondary};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
`

export const ButtonsContainer = styled.div<{ $amount: number }>`
  display: grid;
  grid-template-columns: ${({ $amount }) => ($amount === 1 ? '1fr' : 'repeat(2, 1fr)')};
  gap: 17px;
  margin-top: 8px;
`

export const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  height: 48px;
  border: 0;
  border-radius: 999px;
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.background : theme.colors.brand};
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.brand : theme.colors.neutral};
  font-family: ${({ theme }) => theme.typography.action.fontFamily};
  font-size: 14px;
  font-style: ${({ theme }) => theme.typography.action.fontStyle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.action.lineHeight};
  cursor: pointer;
  transition:
    color 160ms ease,
    background-color 160ms ease;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  @media (hover: hover) {
    &:hover {
      color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.brand : theme.colors.background};
      background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.neutral : theme.colors.brand};
    }
  }

  &:active {
    color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.brand : theme.colors.background};
    background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.neutral : theme.colors.brand};
  }
`
