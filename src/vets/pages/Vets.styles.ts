import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 8px;
  @media (min-width: 768px) {
    max-width: 800px;
    padding: 0 20px;
  }

  @media (min-width: 1238px) {
    max-width: 1200px;
    padding: 0 24px;
  }
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
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
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 24px;
  @media (min-width: 1024px) {
    font-size: 28px;
    line-height: 36px;
  }
`;
export const VetsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: 20px;
  }

  @media (min-width: 1238px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    left: 14px;
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.darkColor};
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding: 0 14px 0 42px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize} !important;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColor};
    opacity: 0.65;
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.brand};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 1px;
  }
  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
`;

export const FiltersRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;

  @media (max-width: 767px) {
    grid-template-columns: max-content max-content;
    justify-content: space-between;
    gap: 6px;
  }
`;

export const DistanceButton = styled.button<{
  $active: boolean;
}>`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 12px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.brand : theme.colors.stroke};
  border-radius: 10px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.neutral : theme.colors.background};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brand : theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  white-space: nowrap;
  cursor: pointer;
  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }
  @media (max-width: 767px) {
    gap: 4px;
    padding: 8px 6px;
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize};

    svg {
      width: 14px;
      height: 14px;
    }
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
