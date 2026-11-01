import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Content = styled.div`
  display: flex;
  min-height: 0;
  max-height: calc(85svh - 110px);
  flex-direction: column;
  gap: 16px;
  text-align: left;
`



export const TypeIcon = styled.span<{ $background: string; $color: string }>`
  display: grid;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};

  > svg {
    width: 24px;
    height: 24px;
  }
`

export const Heading = styled.div`
  min-width: 0;
`

export const Title = styled.h2`
  ${({ theme }) => theme.typography.header2};
  color: ${({ theme }) => theme.colors.brand};
  overflow-wrap: anywhere;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  letter-spacing: -0.2px;
  flex: 1;
  min-width: 0;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;

  @media (max-width: 390px) {
    font-size: 16px;
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
  }
`

export const Count = styled.p`
  ${({ theme }) => theme.typography.descriptive};
  color: ${({ theme }) => theme.colors.darkColorMuted};
`

export const List = styled.ul`
  display: flex;
  min-height: 0;
  max-height: 55svh;
  margin: 0 -8px;
  padding: 4px 12px 16px;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  overscroll-behavior: contain;
  list-style: none;
`

export const Card = styled.li`
  display: flex;
  flex-direction: row;
  min-width: 0;
  flex-shrink: 0;
  padding: 8px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 8px ${({ theme }) => `${theme.colors.black}26`};
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px -6px rgb(89 65 55 / 20%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Photo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(56px, 30vw, 88px);
  height: clamp(56px, 30vw, 88px);
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 12px;
`

export const PhotoPlaceholder = styled.div<{ $background: string; $color: string }>`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  > svg {
    width: 32px;
    height: 32px;
  }
`

export const Information = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: clamp(60px, 30vw, 88px);
`

export const FirstInformationContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

export const SecondInformationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 3px;
`


export const Name = styled.h3`
  ${({ theme }) => theme.typography.header3};
  color: ${({ theme }) => theme.colors.darkColor};
  overflow-wrap: anywhere;
`

export const InformationLine = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  ${({ theme }) => theme.typography.descriptive};
  overflow-wrap: anywhere;

  > svg {
    width: 16px;
    height: 24px;
    flex-shrink: 0;
  }
`

export const DetailLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;

  > svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  padding-left: 20px;
`

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px
`

export const HeaderTitle = styled.h2`
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.black};
`

export const HeaderDescription = styled.p`
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 200% */
  color: ${({ theme }) => theme.colors.darkColor};
  margin-left: 3px;
`
export const FirstLine = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
export const SecondLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`
export const ThirdLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`


export const Status = styled.span<{ $color: string, $background: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 4px 16px 4px 16px;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  background: ${({ $background }) => $background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-align: center;
  height: 24px;

  @media (max-width: 390px) {
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  }
`

export const RedirectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Redirect = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;

  @media (max-width: 390px) {
    font-size: 10px;
    line-height: 14px;
  }
`
