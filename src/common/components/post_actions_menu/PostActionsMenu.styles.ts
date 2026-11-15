import styled from "styled-components";

export const MenuContainer = styled.details`
  position: relative;
  display: inline-block;
`;

export const MenuTrigger = styled.summary`
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  svg {
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
  }
  svg g {
    opacity: 1;
  }
`;

export const MenuContent = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  width: 210px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
`;

export const MenuOption = styled.button`
  display: flex;
  width: 100%;
  min-height: 40px;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }
  &:disabled {
    opacity: 0.55;
    cursor: default;
    background: transparent;
  }

  svg {
    flex-shrink: 0;
  }
`;
