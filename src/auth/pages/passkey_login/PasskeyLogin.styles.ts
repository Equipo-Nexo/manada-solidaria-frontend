import styled, { css, keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgb(234 95 9 / 28%);
  }
  50% {
    box-shadow: 0 0 0 7px rgb(234 95 9 / 0%);
  }
`

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: max(24px, env(safe-area-inset-top)) 16px
    max(16px, env(safe-area-inset-bottom));
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.neutral};
`

export const Card = styled.section`
  position: relative;
  width: min(100%, 420px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 28px 36px;
  overflow: hidden;
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 18px 45px rgb(89 65 55 / 13%);

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 8px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.brand} 0%,
      ${({ theme }) => theme.colors.tertiary} 50%,
      ${({ theme }) => theme.colors.secondary} 100%
    );
  }

  @media (max-width: 380px) {
    padding-inline: 20px;
  }

  @media (max-height: 720px) {
    padding-block: 22px 28px;
  }
`

export const BrandLogo = styled.img`
  width: 112px;
  height: auto;
  margin-bottom: 22px;

  @media (max-height: 720px) {
    width: 88px;
    margin-bottom: 14px;
  }
`

export const FingerprintBadge = styled.div`
  width: 92px;
  height: 92px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.secondary};

  svg {
    width: 48px;
    height: 48px;
  }

  @media (max-height: 720px) {
    width: 72px;
    height: 72px;
    margin-bottom: 14px;

    svg {
      width: 38px;
      height: 38px;
    }
  }
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.brand};
  text-align: center;
`

export const Subtitle = styled.h2`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;
`

export const Explanation = styled.p`
  max-width: 330px;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font: ${({ theme }) =>
    `${theme.typography.body.fontWeight} ${theme.typography.body.fontSize}/${theme.typography.body.lineHeight} ${theme.typography.body.fontFamily}`};
  text-align: center;
`

export const StatusPanel = styled.div`
  width: 100%;
  min-height: 76px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 24px;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.soft};
  text-align: left;

  @media (max-height: 720px) {
    margin-top: 16px;
  }
`

export const StatusIndicator = styled.span<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  margin-top: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.brand};

  ${({ $active }) =>
    $active &&
    css`
      animation: ${pulse} 1.4s ease-in-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const StatusContent = styled.div`
  min-width: 0;
`

export const StatusTitle = styled.p`
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const StatusDescription = styled.p`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.typography.descriptive.fontWeight};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`

export const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;

  @media (max-height: 720px) {
    margin-top: 16px;
  }
`

const buttonStyles = css`
  width: 100%;
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.typography.action.fontFamily};
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  line-height: ${({ theme }) => theme.typography.action.lineHeight};
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }
`

export const PrimaryButton = styled.button`
  ${buttonStyles}
  border: 2px solid ${({ theme }) => theme.colors.brand};
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};

  svg {
    width: 22px;
    height: 22px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.brandHover};
      background: ${({ theme }) => theme.colors.brandHover};
    }
  }
`

export const SecondaryButton = styled.button`
  ${buttonStyles}
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    }
  }
`

export const Footer = styled.p`
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 16px;
  text-align: center;
`
