import styled from "styled-components";
import * as Recovery from "./PasswordRecoveryEmail.styles";
import { PaperPlane } from "@/common/icons/PaperPlane";

export const Page = Recovery.Page;
export const Panel = Recovery.Panel;
export const Footer = Recovery.Footer;
export const Title = Recovery.Title;
export const Description = Recovery.Description;
export const BackLink = Recovery.BackLink;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;

  @media (max-height: 720px) {
    padding-top: 16px;
  }
`;
export const PlaneIcon = styled(PaperPlane)`
  color: ${({ theme }) => theme.colors.brand};
  width: 99px;
  height: 94px;
`;

export const Message = styled.div`
  width: min(100%, 324px);
  margin-top: 24px;
  overflow-wrap: anywhere;

  @media (max-height: 720px) {
    margin-top: 16px;
  }
`;

export const Actions = styled.div`
  width: min(100%, 284px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 36px;

  @media (max-height: 720px) {
    margin-top: 24px;
    gap: 8px;
  }
`;

export const ContinueButton = styled(Recovery.SubmitButton)`
  width: 100%;
`;
