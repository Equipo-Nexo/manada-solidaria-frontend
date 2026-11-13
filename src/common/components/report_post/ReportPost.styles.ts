import styled from "styled-components";

export const ReportButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.neutral};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgb(0 0 0 / 50%);
`;

export const Dialog = styled.div`
  width: min(100%, 420px);
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 12px 32px rgb(0 0 0 / 20%);
`;

export const Title = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
`;

export const Description = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.body};
  text-align: center;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 369px) {
    flex-direction: column-reverse;

    > button {
      width: 100%;
    }
  }
`;

const ActionButton = styled.button`
  min-height: 44px;
  padding: 10px 20px;
  border-radius: 9999px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition:
    background-color 180ms ease,
    opacity 180ms ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CancelButton = styled(ActionButton)`
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.neutral};
  }
`;

export const ConfirmButton = styled(ActionButton)`
  border: 1px solid ${({ theme }) => theme.colors.brand};
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brandHover};
  }
`;

export const ErrorMessage = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.descriptive};
  text-align: center;
`;

export const Feedback = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.descriptive};
`;
