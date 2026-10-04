import { styled } from 'styled-components';

export const Badge = styled.div<{ isOpen: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${({ isOpen }) => isOpen ? '#60B10026' : '#B3261E26'};
    border-radius: 999px;
    height: 24px;
`

export const BadgeText = styled.p<{ isOpen: boolean }>`
    color: ${({ theme, isOpen }) => isOpen ? theme.colors.success : theme.colors.error};
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 19.6px; /* 196% */
    letter-spacing: 0.14px;

    @media (max-width: 390px) {
        font-size: 12px;
        line-height: 15.68px; /* 196% */
    }

    &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({ theme, isOpen }) => isOpen ? theme.colors.success : theme.colors.error};
        margin-right: 4px;

        @media (max-width: 390px) {
            width: 6px;
            height: 6px;
        }
            
    }
`