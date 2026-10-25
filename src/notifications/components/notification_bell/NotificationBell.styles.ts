import { softInteractiveHover } from "@/common/styles/interactions";
import styled from "styled-components";
export const BellContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`;

export const BellButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  transition:
    background 160ms ease,
    color 160ms ease;
  ${softInteractiveHover}
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2.2;
  }
`;
export const UnreadDot = styled.span`
  position: absolute;
  top: 9px;
  right: 9px;
  width: 10px;
  height: 10px;
  background-color: #e53935;
  border-radius: 50%;
  box-sizing: border-box;
  pointer-events: none;
`;
