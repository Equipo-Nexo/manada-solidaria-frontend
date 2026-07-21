import { css } from "styled-components";

export const softInteractiveHover = css`
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    color: ${({ theme }) => theme.colors.brand};
  }
`;
export const focusVisible = css`
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`;
