import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:left;
    min-height: calc(100dvh - 190px);
`

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`

export const BackButton = styled.button`
  width: 48px;
  height: 48px;
  display: inline-flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  svg {
    width: 48px;
    height: 48px;
  }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; }
`

export const TitlesContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  white-space: nowrap;
`

export const PageSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`
export const CardsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
   
    align-items: center;
    @media (min-width: 720px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-content: start;
        gap: 20px;
        margin-top: 20px;
    }

    @media (min-width: 1238px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`

export const MessageContainer = styled.div`
    width: min(100%, 325px);
    min-height: 180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;

    @media (min-width: 720px) {
        grid-column: 1 / -1;
    }
`

export const RetryButton = styled.button`
    min-height: 40px;
    border: 0;
    border-radius: 999px;
    padding: 8px 20px;
    background: ${({ theme }) => theme.colors.brand};
    color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    cursor: pointer;

    &:focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`
