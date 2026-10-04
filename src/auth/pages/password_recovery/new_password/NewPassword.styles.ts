import styled from "styled-components";
import * as Recovery from "../password_recovery_request/PasswordRecoveryEmail.styles";

export const Page = Recovery.Page;
export const Panel = Recovery.Panel;
export const Title = Recovery.Title;
export const Description = Recovery.Description;
export const Form = Recovery.Form;
export const Footer = Recovery.Footer;
export const SubmitButton = Recovery.SubmitButton;
export const Label = Recovery.Label;

export const LockBadge = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.brand};
  svg {
    width: 50px;
    height: 50px;
  }
  @media (max-height: 720px) {
    width: 80px;
    height: 80px;
  }
`;
export const Introduction = styled(Recovery.Introduction)`
  margin-top: 16px;
`;
export const Field = styled(Recovery.Field)`
  gap: 8px;
`;
export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const Input = styled(Recovery.Input)`
  background: ${({ theme }) => `${theme.colors.neutral}66`};
  padding-right: 52px;
  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
`;
export const Toggle = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  svg {
    width: 22px;
    height: 22px;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`;
export const Requirements = styled.ul`
  margin: 0;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  border-radius: 10px;
  background: ${({ theme }) => `${theme.colors.success}0d`};
`;
export const Requirement = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: 16px;
`;
export const RequirementIcon = styled.span<{ $met: boolean }>`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: ${({ $met, theme }) =>
    $met ? "0" : `1px solid ${theme.colors.stroke}`};
  background: ${({ $met, theme }) =>
    $met ? theme.colors.success : "transparent"};
  color: ${({ theme }) => theme.colors.white};
  svg {
    width: 12px;
    height: 12px;
  }
`;
export const AccessibleStatus = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
