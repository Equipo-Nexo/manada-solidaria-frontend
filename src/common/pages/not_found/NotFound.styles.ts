import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.section`
  width: min(100%, 560px);
  min-height: min(560px, calc(100svh - 160px));
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  text-align: center;
`

export const Illustration = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorCode = styled.span`
  color: ${({ theme }) => theme.colors.neutral};
  font: ${({ theme }) =>
    `${theme.fontWeights.extrabold} clamp(88px, 24vw, 152px)/0.8 ${theme.fonts.body}`};
  letter-spacing: -0.08em;
  user-select: none;
`

export const PawBadge = styled.span`
  position: absolute;
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border: 6px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.neutral};
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 10px 24px rgb(169 92 40 / 22%);
  transform: rotate(-10deg);

  svg {
    width: 28px;
    height: 28px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const Eyebrow = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.secondaryHoverSoft};
  font: ${({ theme }) =>
    `${theme.fontWeights.bold} ${theme.typography.descriptive.fontSize}/${theme.typography.descriptive.lineHeight} ${theme.fonts.body}`};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const Title = styled.h1`
  max-width: 480px;
  color: ${({ theme }) => theme.colors.darkColor};
`

export const Description = styled.p`
  max-width: 420px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
`

export const HomeLink = styled(Link)`
  min-height: 48px;
  padding: 12px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.neutral};
  background: ${({ theme }) => theme.colors.secondary};
  font: ${({ theme }) =>
    `${theme.typography.action.fontWeight} ${theme.typography.action.fontSize}/${theme.typography.action.lineHeight} ${theme.fonts.body}`};
  text-decoration: none;
  transition: box-shadow 160ms ease, transform 160ms ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    box-shadow: 0 8px 18px rgb(169 92 40 / 24%);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
