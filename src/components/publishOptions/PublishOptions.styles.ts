import styled, { css, keyframes } from 'styled-components'

type PlacementProps = {
  $placement: 'mobile' | 'desktop'
}

const backdropFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const mobileOptionsEnter = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(76px) scale(0.2);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
`

const desktopOptionsEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(64px) scale(0.2);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const optionEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

export const OptionsBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgb(0 0 0 / 34%);
  animation: ${backdropFadeIn} 160ms ease-out;
`

export const OptionsList = styled.div<PlacementProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 285px;
  transform-origin: bottom center;

  ${({ $placement }) =>
    $placement === 'mobile'
      ? css`
          left: 50%;
          bottom: 132px;
          transform: translateX(-50%);
          animation: ${mobileOptionsEnter} 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
        `
      : css`
          right: 24px;
          bottom: 168px;
          transform-origin: bottom right;
          animation: ${desktopOptionsEnter} 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
        `}
`

export const OptionItem = styled.button`
  width: 285px;
  height: 53px;
  display: grid;
  grid-template-columns: 53px 220px;
  align-items: center;
  gap: 12px;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  animation: ${optionEnter} 220ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards;

  &:nth-child(1) {
    animation-delay: 20ms;
  }

  &:nth-child(2) {
    animation-delay: 45ms;
  }

  &:nth-child(3) {
    animation-delay: 70ms;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const OptionIcon = styled.span`
  width: 53px;
  height: 53px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral};
  box-shadow: 0 10px 22px rgb(89 65 55 / 18%);

  svg {
    width: 25px;
    height: 25px;
    stroke-width: 2.4;
  }
`

export const OptionContent = styled.span`
  width: 220px;
  height: 53px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  padding: 7px 12px;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 10px 22px rgb(89 65 55 / 18%);
`

export const OptionTitle = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.neutral};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const OptionDescription = styled.span`
  display: -webkit-box;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.neutral};
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
