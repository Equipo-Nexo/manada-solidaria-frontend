import styled, { css } from "styled-components";

export const Item = styled.li<{ $unread: boolean }>`
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background-color: ${({ $unread, theme }) =>
    $unread
      ? `color-mix(in srgb, ${theme.colors.neutral} 45%, transparent)`
      : "transparent"};
  &:last-child {
    border-bottom: none;
  }
`;

const itemContentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px;
  width: 100%;
  padding: 16px;
  text-align: left;
  color: ${({ theme }) => theme.colors.darkColor};
`;

export const ItemButton = styled.button`
  ${itemContentStyles}
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -3px;
  }
`;

export const ItemContent = styled.div`
  ${itemContentStyles}
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.9;
`;

export const DateText = styled.time`
  font-size: 12px;
  opacity: 0.6;
`;

export const UnreadIndicator = styled.span`
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  margin-top: 5px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #e53935;
`;
