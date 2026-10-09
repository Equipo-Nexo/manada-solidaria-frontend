import styled from "styled-components";

export const LocationCard = styled.section`
  min-height: 107px; 
  display: grid; 
  text-align:left;
  grid-template-columns: 1fr 1fr; 
  overflow: hidden; 
  margin-top: 14px; 
  border-radius: 10px;
  width:100%;
  background: ${({ theme }) => theme.colors.background}; 
  box-shadow: 0 2px 8px rgb(55 37 28 / 18%);

  @media (min-width: 768px) {
    min-height: 140px;
    margin-top: 0;
  }
`

export const MapPreview = styled.div`
  position: relative; overflow: hidden;
  background: linear-gradient(34deg, transparent 42%, rgb(255 255 255 / 75%) 43% 47%, transparent 48%),
    linear-gradient(94deg, transparent 54%, rgb(255 255 255 / 70%) 55% 59%, transparent 60%),
    repeating-linear-gradient(25deg, transparent 0 15px, rgb(223 192 143 / 48%) 16px 18px), #c1ddd7;
  &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 48%, rgb(111 174 197 / 28%) 49% 57%, transparent 58%); }
`

export const MapMarker = styled.span`
  position: absolute; z-index: 1; top: 46%; left: 52%; width: 10px; height: 10px; border: 3px solid ${({ theme }) => theme.colors.background};
  border-radius: 50% 50% 50% 0; background: ${({ theme }) => theme.colors.brand}; box-shadow: 0 1px 3px rgb(0 0 0 / 28%); transform: rotate(-45deg);
`

export const LocationContent = styled.div`
  display: flex; flex-direction: column; justify-content: center; padding: 14px 8px;
`

export const LocationTitle = styled.h3`
  margin: 0; color: ${({ theme }) => theme.colors.black}; 
  font-size: 18px; 
  font-weight: ${({ theme }) => theme.fontWeights.bold}; 
  line-height: 17px;
`

export const LocationAddress = styled.p`
  margin: 0; 
  color: ${({ theme }) => theme.colors.black}; 
  font-size: 14px; 
  font-weight: ${({ theme }) => theme.fontWeights.semibold}; 
  line-height: 17px;
`

export const MapLink = styled.button`
  display: inline-flex; 
  align-items: center; 
  gap: 8px; 
  margin-top: 8px; 
  color: ${({ theme }) => theme.colors.brand};
  width: fit-content; padding: 0; border: 0; 
  background: transparent; 
  cursor: pointer;
  font-size: 12px; 
  font-weight: ${({ theme }) => theme.fontWeights.bold}; 
  line-height: 16px; 
  text-decoration: underline;
  svg { width: 24px; height: 24px; flex: 0 0 auto; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`
