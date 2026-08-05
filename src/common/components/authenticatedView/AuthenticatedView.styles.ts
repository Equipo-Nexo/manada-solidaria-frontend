import styled from 'styled-components'

export const MobileViewChrome = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`

export const DesktopViewChrome = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`
