import styled, { keyframes } from 'styled-components'

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-6px) rotate(4deg); }
`

export const Container = styled.section`
  width: min(100%, 520px);
  min-height: 420px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  text-align: center;
`

export const Illustration = styled.div`
  position: relative;
  width: 156px;
  height: 156px;
  display: grid;
  place-items: center;
`

export const Orbit = styled.span`
  position: absolute;
  inset: 8px;
  border: 2px dashed ${({ theme }) => theme.colors.stroke};
  border-radius: 50%;
`

export const PawBadge = styled.span`
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
  border-radius: 32px;
  color: ${({ theme }) => theme.colors.neutral};
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 14px 30px rgb(169 92 40 / 24%);
  animation: ${float} 2.8s ease-in-out infinite;

  svg {
    width: 44px;
    height: 44px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Dot = styled.span<{ $position: 'top' | 'bottom' }>`
  position: absolute;
  top: ${({ $position }) => ($position === 'top' ? '14px' : 'auto')};
  right: ${({ $position }) => ($position === 'top' ? '18px' : 'auto')};
  bottom: ${({ $position }) => ($position === 'bottom' ? '18px' : 'auto')};
  left: ${({ $position }) => ($position === 'bottom' ? '12px' : 'auto')};
  width: ${({ $position }) => ($position === 'top' ? '18px' : '12px')};
  height: ${({ $position }) => ($position === 'top' ? '18px' : '12px')};
  border-radius: 50%;
  background: ${({ $position, theme }) =>
    $position === 'top' ? theme.colors.brand : theme.colors.tertiary};
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
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font: ${({ theme }) =>
    `${theme.typography.header1.fontWeight} ${theme.typography.header1.fontSize}/${theme.typography.header1.lineHeight} ${theme.fonts.body}`};
`

export const Description = styled.p`
  max-width: 390px;
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font: ${({ theme }) =>
    `${theme.typography.body.fontWeight} ${theme.typography.body.fontSize}/${theme.typography.body.lineHeight} ${theme.fonts.body}`};
`
