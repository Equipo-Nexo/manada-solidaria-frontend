import styled from "styled-components";

export const FilterWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export const FilterButton = styled.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  cursor: pointer;
  svg {
    flex-shrink: 0;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  @media (max-width: 767px) {
    gap: 4px;
    padding: 8px 6px;
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
    white-space: nowrap;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const SelectedContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 767px) {
    gap: 4px;
  }
`;

export const ChevronWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
`;

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 30;
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 6px 18px rgb(0 0 0 / 14%);
`;

export const Option = styled.button<{
  $selected: boolean;
}>`
  width: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border: 0;
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? "#F6E7D3" : "transparent")};
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-align: left;
  cursor: pointer;
  transition: background 150ms ease;
  &:hover {
    background: ${({ $selected }) => ($selected ? "#F6E7D3" : "#F7F7F7")};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 1px;
  }
  > svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.brand};
  }
`;

export const OptionContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export const StatusDot = styled.span<{
  $status: "open" | "closed";
}>`
  width: 11px;
  height: 11px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $status, theme }) =>
    $status === "open" ? theme.colors.success : theme.colors.error};
`;
