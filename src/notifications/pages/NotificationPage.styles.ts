import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    column-gap: 12px;
    row-gap: 0;
    padding-bottom: 8px;
  }
`;
export const MarkAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  text-align: left;
  justify-content: flex-start;
  flex-shrink: 0;
  gap: 6px;
  min-height: 44px;
  margin-left: auto;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease;
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  @media (hover: hover) {
    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.brand};
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    grid-column: 1 / -1;
    justify-self: start;
    max-width: 100%;
    margin-left: 0;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.colors.darkColor};
`;

export const Content = styled.section`
  flex: 1;
  width: 100%;
`;

export const Message = styled.p`
  margin: 0;
  padding: 32px 16px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkColor};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.darkColor};
  color: white;
  font-size: 14px;
  cursor: pointer;
`;
