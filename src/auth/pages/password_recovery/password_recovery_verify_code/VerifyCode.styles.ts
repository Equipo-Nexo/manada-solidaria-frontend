import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Recovery from "../password_recovery_request/PasswordRecoveryEmail.styles";

export const Page = Recovery.Page;
export const Footer = Recovery.Footer;
export const AppLogo = Recovery.AppLogo;
export const Title = Recovery.Title;
export const Description = Recovery.Description;
export const BackLink = Recovery.BackLink;
export const SubmitButton = Recovery.SubmitButton;

export const Panel = styled(Recovery.Panel)`
  padding-top: 88px;
  &::after {
    display: none;
  }
  @media (max-height: 720px) {
    padding-top: 80px;
  }
`;
export const BackButton = styled(Link)`
  position: absolute;
  top: 35px;
  left: 45px;
  display: flex;
  color: ${({ theme }) => theme.colors.brand};
`;
export const Content = styled.div`
  width: min(100%, 284px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-height: 720px) {
    gap: 12px;
  }
`;

export const Validity = styled(Recovery.Description)`
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
`;
export const ResendArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Advice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: min(100%, 224px);
  padding: 10px;
  border-radius: 20px;
  background: ${({ theme }) => `${theme.colors.neutral}66`};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: 14px;
  text-align: left;
  img {
    flex-shrink: 0;
  }
`;
export const ResendButton = styled.button`
  min-height: 44px;
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
  @media (min-width: 768px) {
    font-size: 0.8125rem;
  }
`;
