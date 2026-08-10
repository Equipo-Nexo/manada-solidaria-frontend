import styled from "styled-components";
import MaskedInput from "./maskedInput";
import { fieldFocusVisible } from "@styles/interactions";
export const StyledMaskedInput = styled(MaskedInput)<{
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
  $leftPadding?: string;
}>`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 13px 18px;
  padding-left: ${({ $leftPadding, $hasLeftIcon }) =>
    $leftPadding ?? ($hasLeftIcon ? "50px" : "18px")};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "50px" : "30px")};
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? "50px" : "18px")};
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    opacity: 1;
  }

  ${fieldFocusVisible}
`;
