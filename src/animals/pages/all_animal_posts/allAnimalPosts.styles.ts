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
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

`;

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
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

`;

export const TitlesContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;
export const FilterButton = styled.button<{ $hasAppliedFilters: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 30px;
  padding: 0;
  border: 1.5px solid ${({ theme }) => theme.colors.black};
  border-radius: 9999px;
  background: ${({ theme, $hasAppliedFilters }) =>
    $hasAppliedFilters ? theme.colors.neutral : theme.colors.background};
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
    height: 40px;
    padding: 0 16px;
    gap: 8px;
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.typography.body};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
  svg {
    width: 16px;
    height: 16px;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.neutral};
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 3px;
  }

  @media (max-width: 599px) {
    position: relative;
    top: -2px;
    width: 36px;
    height: 36px;
    margin-left: 4px;
    align-self: center;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
export const FilterButtonLabel = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: inline;
  }
`;
export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  white-space: nowrap;

`;

export const PageSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

export const PublicationsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 325px), 325px));
  justify-content: center;
  gap: 16px;
  & > article {
    width: 100%;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 16px;
`;

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
`;

export const FiltersContainer = styled.div`
  margin: 0px 0px 16px 0px;
  padding: 0 16px;
`;
