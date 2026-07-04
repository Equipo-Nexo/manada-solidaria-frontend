import styled, { keyframes } from 'styled-components'

const backdropEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const panelEnter = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

export const BottomSheetBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgb(0 0 0 / 34%);
  animation: ${backdropEnter} 160ms ease-out;

  @media (min-width: 768px) {
    align-items: center;
    padding: 32px;
  }
`

export const BottomSheetPanel = styled.div`
  position: relative;
  width: min(100%, ${({ theme }) => theme.layout.contentMaxWidth});
  border-radius: 20px 20px 0 0;
  padding: 10px 18px calc(18px + env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.colors.surfacePlain};
  box-shadow: 0 -16px 40px rgb(89 65 55 / 22%);
  animation: ${panelEnter} 220ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (min-width: 768px) {
    max-width: 420px;
    border-radius: 20px;
    padding: 10px 18px 18px;
    animation: ${modalEnter} 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`

export const BottomSheetCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 18px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.4;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const BottomSheetHandle = styled.div`
  width: 42px;
  height: 4px;
  margin: 0 auto 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.stroke};

  @media (min-width: 768px) {
    display: none;
  }
`

export const BottomSheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
