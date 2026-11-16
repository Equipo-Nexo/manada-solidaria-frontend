import styled from "styled-components";


export const Content = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  & > article {
    width: 100%;
  }

  @media(min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 325px), 325px));
  }
`;

export const AdviceItem = styled.div`
  grid-column: 1 / -1;
`;

export const MessageContainer = styled.div`
  display: flex;
  width: min(100%, 325px);
  height: 180px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
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
