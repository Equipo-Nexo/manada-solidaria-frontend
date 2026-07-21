import styled from 'styled-components'

export const MyPostsRoot = styled.section`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 48px;
`
export const BackRowButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.darkColor};
    background: transparent;
    border: none;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`
export const HeaderTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
export const HeaderTitle = styled.h1`
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.typography.header2.fontFamily};
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    font-style: ${({ theme }) => theme.typography.header2.fontStyle};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.typography.header2.lineHeight};
`
export const ResultsCount = styled.p`
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-style: ${({ theme }) => theme.typography.body.fontStyle};
    font-weight: ${({ theme }) => theme.typography.body.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const Filter = styled.button<{ $isSelected: boolean }>`
    display: flex;
    width: 80px;
    height: 38px;
    padding: 12px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-style: ${({ theme }) => theme.typography.body.fontStyle};
    font-weight: ${({ $isSelected, theme }) =>
        $isSelected ? theme.fontWeights.semibold : theme.typography.body.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    background: transparent;
    border: none;
    border-bottom: 2px solid
        ${({ $isSelected, theme }) => $isSelected ? theme.colors.darkColor : 'transparent'};
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`

export const CardsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 20px;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        align-content: start;
        gap: 16px;
    }
`

export const EmptyState = styled.div`
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    width: min(100%, 480px);
    padding: 32px 24px;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
`

export const EmptyStateTitle = styled.h2`
    color: ${({ theme }) => theme.colors.darkColor};
    font-family: ${({ theme }) => theme.typography.header3.fontFamily};
    font-size: ${({ theme }) => theme.typography.header3.fontSize};
    font-style: ${({ theme }) => theme.typography.header3.fontStyle};
    font-weight: ${({ theme }) => theme.typography.header3.fontWeight};
    line-height: ${({ theme }) => theme.typography.header3.lineHeight};
`

export const EmptyStateDescription = styled.p`
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-style: ${({ theme }) => theme.typography.body.fontStyle};
    font-weight: ${({ theme }) => theme.typography.body.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => `${theme.colors.stroke}33`};
    box-shadow: 0 4px 12px 0 ${({ theme }) => `${theme.colors.black}14`};
    overflow: hidden;

    @media (min-width: 768px) {
        height: 144px;
        margin-bottom: 0;
    }
`

export const CardImage = styled.img`
    width: 35%;
    height: auto;
    align-self: stretch;
    flex-shrink: 0;
    object-fit: cover;
    object-position: center;
`

export const CardContent = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 16px 16px 8px;

    @media (min-width: 768px) {
        gap: 8px;
        padding: 12px 12px 12px 8px;
    }
`

export const CardInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: flex-start;
    flex: 1;
    min-width: 0;
    text-align: left;
`
export const CardTitle = styled.h2`
    color: ${({ theme }) => theme.colors.brand};
    font-family: ${({ theme }) => theme.typography.header2.fontFamily};
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    font-style: ${({ theme }) => theme.typography.header2.fontStyle};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.typography.header2.lineHeight};
    letter-spacing: -0.2px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;  
    text-overflow: ellipsis;
`
export const CreatedSince = styled.p`
    color: ${({ theme }) => theme.colors.darkColor};
    font-family: ${({ theme }) => theme.typography.metadata.fontFamily};
    font-size: ${({ theme }) => theme.typography.metadata.fontSize};
    font-style: ${({ theme }) => theme.typography.metadata.fontStyle};
    font-weight: ${({ theme }) => theme.typography.metadata.fontWeight};
    line-height: ${({ theme }) => theme.typography.metadata.lineHeight};
    letter-spacing: 0.24px;
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    gap: 8px;
    align-items: center;
`
    
export const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: none;
    color: ${({ theme }) => theme.colors.darkColor};
    background: ${({ theme }) => theme.colors.neutral};
    box-shadow: 0 1px 2px 0 ${({ theme }) => `${theme.colors.black}0D`};
    width: 40px;
    height: 40px;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`

export const Status = styled.div<{ $backgroundColor: string, $fontColor: string }>`
    border-radius: 9999px;
    background: ${({ $backgroundColor }) => $backgroundColor};
    color: ${({ $fontColor }) => $fontColor};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    width: 116px;
    height: 28px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 19.5px;
    margin-top: 10px
`

export const BottomSheetContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`

export const BottomSheetTitle = styled.h2`
    color: ${({ theme }) => theme.colors.black};
`

export const BottomSheetDescription = styled.p`
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
`

export const PostTitle = styled.span`
    font-weight: bold;
`

export const BottomSheetButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

`
export const BottomSheetButton = styled.button<{$primary: boolean}>`
    width: 100%;
    background: ${({$primary, theme}) => $primary ? theme.colors.error : theme.colors.background };
    color: ${({$primary, theme}) => $primary ? theme.colors.background : theme.colors.darkColor };
    border: ${({$primary, theme}) => $primary ? 'none' : `2px solid ${theme.colors.stroke}` };
    padding: 16px 16px;
    border-radius: 12px;
    text-align: left;
    font-weight: bold;
`
