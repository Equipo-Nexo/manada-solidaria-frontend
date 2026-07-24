import styled from "styled-components";
export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 325px), 325px));
  justify-content: center;
  gap: 16px;

  & > article {
    width: 100%;
  }
`;
export const EmptyState = styled.div`
  display: flex;
  width: 100%;
  min-height: 120px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  text-align: center;
`;
