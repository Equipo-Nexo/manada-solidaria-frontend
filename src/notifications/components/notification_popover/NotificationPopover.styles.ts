import { softInteractiveHover } from "@/common/styles/interactions";
import styled from "styled-components";

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 450px;
  max-width: calc(100vw - 32px);
  max-height: min(520px, 75vh);
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;
export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkColor};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 24px;
  cursor: pointer;
  transition:
    background 160ms ease,
    color 160ms ease;
  ${softInteractiveHover}
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
    stroke-width: 2;
  }
`;
export const MarkAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  padding: 4px 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
  }
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.brand};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;
export const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
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
  padding-bottom: 24px;
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
