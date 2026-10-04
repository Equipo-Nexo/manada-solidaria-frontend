import styled from "styled-components";

export const CodeFields = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  width: 100%;
`;

export const Digit = styled.input<{ $hasError: boolean }>`
  width: 45px;
  height: 54px;
  height: 54px;
  padding: 0;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.brand};
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.neutral}99`};
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 1px;
  }
`;
