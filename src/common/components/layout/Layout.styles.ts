import styled from "styled-components";

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const LayoutContent = styled.div`
    flex: 1;
`

export const Header = styled.header`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 11px;
`

export const ButtonAndTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const BackButton = styled.button`
    width: 40px; 
    height: 40px; 
    display: grid; 
    flex: 0 0 auto; 
    place-items: center; 
    border: 0;
    border-radius: 50%; background: ${({ theme }) => theme.colors.background}; 
    color: ${({ theme }) => theme.colors.black}; cursor: pointer;
    svg { width: 22px; height: 22px; }
    &:focus-visible { 
        outline: 3px solid ${({ theme }) => theme.colors.focus}; 
        outline-offset: 2px; 
    }
`

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const PageTitle = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.colors.black};
    font-size: clamp(1rem, 4vw, 1.5rem);
    line-height: 1.2;
    overflow-wrap: break-word;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-align: left;
`

export const Subtitle = styled.p`
`

export const LoaderContainer = styled.section`
`

export const StateContainer = styled.section`
`

export const Message = styled.p`
    color: ${({ theme }) => theme.colors.black};
`