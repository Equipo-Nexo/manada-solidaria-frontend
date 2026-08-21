import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100svh;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export const Header = styled.header`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 100;
    min-height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
    padding: 16px 8px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);    
`


export const BackButton = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.black};
    svg {
        width: 20px;
        height: 20px;
    }
    &:hover {
        opacity: 0.8;
    }
`;

export const PageTitle = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-align: left;
`

export const FormContainer = styled.form`
    width: min(100%, 560px);
    display: flex;
    flex-direction: column;    
    gap: 16px;
    text-align: left;
    padding: 16px;


`

export const SubmitButton = styled.button`
    width: 100%;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.action.fontSize};
    font-weight: ${({ theme }) => theme.typography.action.fontWeight};
    line-height: ${({ theme }) => theme.typography.header3.lineHeight};

    &:focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 3px;
    }
`;
