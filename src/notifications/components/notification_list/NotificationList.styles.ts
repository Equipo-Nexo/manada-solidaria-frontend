import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 48px 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkColor};
`;

export const EmptyTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const EmptyDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.7;
`;
