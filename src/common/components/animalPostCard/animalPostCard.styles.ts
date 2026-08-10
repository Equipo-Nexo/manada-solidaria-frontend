import styled from 'styled-components'

export const CardContainer = styled.article`
  width: ${({ theme }) => theme.layout.publicationCardWidth};
  height: ${({ theme }) => theme.layout.publicationCardHeight};
  overflow: hidden;
  border: 1px solid rgb(190 202 191 / 30%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 24px -4px rgb(0 109 65 / 8%);
`

export const PhotoContainer = styled.div`
  position: relative;
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
  top: 12px;
  right: 15px;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 10%),
    0 2px 4px -2px rgb(0 0 0 / 10%);
  cursor: pointer;
  backdrop-filter: blur(2px);
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 18px;
    height: 18px;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

export const RewardInfo = styled.button<{ $expanded: boolean }>`
  display: inline-flex;
  width: ${({ $expanded }) => ($expanded ? '112px' : '32px')};
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.statusFoundBackground};
  color: ${({ theme }) => theme.colors.statusRewardText};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  cursor: pointer;
  transition:
    width 180ms ease,
    box-shadow 180ms ease;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 2px 8px rgb(53 100 0 / 20%);
    }
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Content = styled.div`
  padding: 10px 13px 6px;
`

export const MainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const BadgesContainer = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 5px;
`

export const Title = styled.h2`
  min-width: 0;
  flex: 1;
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.typography.header1.fontFamily};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  font-style: ${({ theme }) => theme.typography.header1.fontStyle};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.header1.lineHeight};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StatusContainer = styled.span<{ $color: string, $background: string }>`
  flex-shrink: 0;
  padding: 4px 16px 4px 16px;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  background: ${({ $background }) => $background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-align: center;
`

export const Location = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

`

export const Description = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0px;
  min-height:40px;
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
  justify-content:center;
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
  min-width: 0;
  height: 48px;
  padding-inline: 8px;
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
  text-align: center;
  cursor: pointer;
  transition:
    color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  @media (hover: hover) {
    &:hover {
      color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.background : theme.colors.secondary};
      background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.brandHover : theme.colors.neutral};
      box-shadow: ${({ $variant }) =>
    $variant === 'primary'
      ? '0 6px 14px rgb(234 95 9 / 24%)'
      : '0 4px 12px rgb(169 92 40 / 14%)'};
      transform: translateY(-1px);
    }
  }

  &:active {
    color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.background : theme.colors.secondary};
    background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.brandHover : theme.colors.neutral};
    transform: translateY(0) scale(0.98);
  }
`
