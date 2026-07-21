import styled from "styled-components";

export const Page = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  min-height: 100svh;
  margin: 0 auto;
  padding: 0 0 16px;
  color: ${({ theme }) => theme.colors.darkColor};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  @media (min-width: 600px) {
    padding: 28px 24px 48px;
  }
  display:flex;
  flex-direction:column;
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

export const FilterButton = styled.button`
  display: flex;
  width: 56px;
  height: 40px;
  flex: 0 0 56px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const CategoriesSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
  @media (max-width: 420px) {
    gap: 2px;
  }
`

interface CategoryProps {
    $isSelected: boolean
}

export const Category = styled.button<CategoryProps>`
  height: 40px;
  min-width: 0;
  padding: 0 4px;
  border: 0;
  border-bottom: 3px solid
    ${({ $isSelected, theme }) => ($isSelected ? theme.colors.black : '#F4F1F4')};
  color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.black : '#625B71'};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-style: normal;
  font-weight: ${({ $isSelected, theme }) =>
        $isSelected ? theme.fontWeights.bold : theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 420px) {
    padding-inline: 1px;
    font-size: clamp(11px, 3.7vw, 15px);
  }

  &:focus-visible {
    border-radius: 4px 4px 0 0;
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const PublicationsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 325px), 325px));
  justify-content: center;
  gap: 16px;

  & > article {
    width: 100%;
  }
`

export const StateMessage = styled.div`
  display: flex;
  width: 100%;
  min-height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  text-align: center;
`

export const RetryButton = styled.button`
  min-height: 40px;
  padding: 8px 20px;
  border: 0;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`
