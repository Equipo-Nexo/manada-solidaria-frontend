import styled from "styled-components";
import MaskedInput from "./maskedInput";
export const StyledMaskedInput = styled(MaskedInput)<{
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
}>`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 13px 18px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "50px" : "18px")};
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? "50px" : "18px")};
  &::placeholder {
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`;
