import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 16px 16px;
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Subtitle = styled.p`
  margin: 0;
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;
export const Filters = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 16px;
  margin-bottom: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const FilterButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;

  padding: 0 0 8px;

  white-space: nowrap;
  cursor: pointer;

  font-weight: ${({ $active }) => ($active ? 700 : 400)};

  color: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.black};

  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.black}` : "2px solid transparent"};
`;
