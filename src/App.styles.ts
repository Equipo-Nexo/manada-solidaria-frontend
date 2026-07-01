import styled from 'styled-components'

export const AppShell = styled.div`
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
`

export const AppContent = styled.main<{ $isFullScreen: boolean }>`
  flex: 1;
  width: ${({ $isFullScreen, theme }) =>
    $isFullScreen ? '100%' : `min(100%, ${theme.layout.contentMaxWidth})`};
  margin: ${({ $isFullScreen }) => ($isFullScreen ? '0' : '0 auto')};
  display: flex;
  align-items: ${({ $isFullScreen }) => ($isFullScreen ? 'stretch' : 'center')};
  justify-content: ${({ $isFullScreen }) => ($isFullScreen ? 'stretch' : 'center')};
  padding: ${({ $isFullScreen }) => ($isFullScreen ? '0' : '24px 18px 96px')};

  @media (min-width: 768px) {
    padding: ${({ $isFullScreen }) => ($isFullScreen ? '0' : '32px')};
  }
`

export const DesktopMenuDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};

  @media (max-width: 767px) {
    display: none;
  }
`

export const DrawerBackdrop = styled.button`
  position: absolute;
  inset: 0;
  border: 0;
  background: rgb(38 50 56 / 32%);
  opacity: 0;
  cursor: pointer;
  transition: opacity 180ms ease;

  ${DesktopMenuDrawer}[aria-hidden='false'] & {
    opacity: 1;
  }
`

export const DrawerPanel = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(380px, 88vw);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surfacePlain};
  box-shadow: 16px 0 40px rgb(89 65 55 / 18%);
  transform: translateX(-100%);
  transition: transform 220ms ease;

  ${DesktopMenuDrawer}[aria-hidden='false'] & {
    transform: translateX(0);
  }
`
