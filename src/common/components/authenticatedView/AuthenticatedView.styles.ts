import styled from 'styled-components'

export const MobileViewChrome = styled.div`
  position: sticky;
  top: 0;
  z-index: 40;

  @media (min-width: 768px) {
    display: none;
  }
`

export const DesktopViewChrome = styled.div`
  position: sticky;
  top: 0;
  z-index: 40;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`
