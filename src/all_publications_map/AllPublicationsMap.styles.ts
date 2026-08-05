import styled from 'styled-components'

export const Page = styled.section`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.darkColorMuted};
`

export const MapFrame = styled.div`
  width: 100%;
  height: min(620px, calc(100svh - 250px));
  min-height: 420px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgb(89 65 55 / 12%);

  @media (max-width: 767px) {
    height: calc(100svh - 300px);
    min-height: 360px;
  }
`
