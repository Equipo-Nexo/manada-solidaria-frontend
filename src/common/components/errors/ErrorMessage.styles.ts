import styled from "styled-components";


export const FormErrorMessage = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.error};
  border-radius: 10px;
  padding: 8px 12px;
  background: ${({ theme }) => `${theme.colors.error}12`};
  color: ${({ theme }) => theme.colors.error};
  box-shadow:
    0 1px 2px ${({ theme }) => `${theme.colors.error}0A`},
    0 8px 24px ${({ theme }) => `${theme.colors.error}0D`};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  animation: error-message-enter 180ms ease-out;

  svg {
    width: 12px;
    height: 12px;
    flex: 0 0 12px;
  }

  @keyframes error-message-enter {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
