import styled, { css } from "styled-components";
import { focusVisible } from "@styles/interactions";

const desktopSummarySection = css`
  min-width: 0;
  padding: 0 24px;
  border: 0;
  border-radius: 0;
`;

export const Page = styled.div`
  position: relative;
  width: min(100%, 430px);
  margin: 0 auto;
  padding: 28px 20px 35px;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  @media (min-width: 1024px) {
    width: min(100%, 1120px);
    padding: 32px 80px 48px;
  }
`;
export const Summary = styled.div`
  display: contents;
  @media (min-width: 1024px) {
    position: relative;
    display: block;
  }
`;
export const SummaryFrame = styled.div`
  display: contents;
  @media (min-width: 1024px) {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    padding: 16px 0;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 4px 12px 0 ${({ theme }) => `${theme.colors.black}14`};

    &::after {
      content: '';
      position: absolute;
      top: 24px;
      bottom: 24px;
      left: 50%;
      width: 1px;
      background: ${({ theme }) => `linear-gradient(to bottom, transparent, ${theme.colors.black}24 25%, ${theme.colors.black}24 75%, transparent)`};
      pointer-events: none;
    }
  }
`;
export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 88px minmax(0, 1fr);
    gap: 20px;
    ${desktopSummarySection}
  }
`;
export const BackButton = styled.button`
  position: absolute;
  top: 28px;
  left: 15px;
  z-index: 1;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  svg {
    width: 48px;
    height: 48px;
  }
  ${focusVisible}
  @media (min-width: 1024px) {
    top: 0;
    left: -64px;
    transform: none;
  }
`;
export const AnimalPhotoFrame = styled.div`
  position: relative;
  overflow: hidden;
  width: 88px;
  height: 92px;
  border-radius: 999px;
`;
export const AnimalPhoto = styled.img`
  position: absolute;
  width: 169.05%;
  height: 233%;
  left: 0.07%;
  top: -66.5%;
  object-fit: cover;
`;
export const AnimalName = styled.h1`
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand};
  margin-top: 4px;
  @media (min-width: 1024px) {
    ${({ theme }) => theme.typography.header1};
    margin-top: 0;
    overflow-wrap: anywhere;
  }
`;
export const ApplicantCard = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 83px;
  padding: 5px 7px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;
  @media (min-width: 1024px) {
    width: 100%;
    margin: 0;
    gap: 16px;
    ${desktopSummarySection}
  }
`;
export const Avatar = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
export const ApplicantInfo = styled.div`
  min-width: 0;
  flex: 1;
`;
export const ApplicantName = styled.h2`
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding-right: 98px;
  line-height: 18px;
  overflow-wrap: anywhere;
  @media (min-width: 1024px) {
    min-width: 0;
    flex: 1;
    padding-right: 0;
    line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  }
`;
export const ApplicantHeading = styled.div`
  display: contents;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
export const SentDate = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 7px;
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkColor};
  svg {
    width: 12px;
    height: 12px;
  }
`;
export const Status = styled.span<{ $isRead: boolean }>`
  position: absolute;
  right: 5px;
  top: 18px;
  padding: 2px 12px;
  border-radius: 999px;
  background: ${({ theme, $isRead }) => $isRead ? theme.colors.statusFoundBackground : theme.colors.neutral};
  color: ${({ theme, $isRead }) => $isRead ? theme.colors.success : theme.colors.brand};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  @media (min-width: 1024px) {
    position: static;
    flex-shrink: 0;
  }
`;
export const Categories = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 19px;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
    margin-top: 32px;
    align-items: stretch;
  }
`;
export const Category = styled.section`
  min-width: 0;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
export const CategoryTitle = styled.h2`
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.darkColor};
  margin-bottom: 1px;
  @media (min-width: 1024px) {
    ${({ theme }) => theme.typography.header2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: 12px;
  }
`;
export const Answers = styled.div<{ $compact: boolean }>`
  display: grid;
  gap: ${({ $compact }) => ($compact ? "12px" : "17px")};
  padding: ${({ $compact }) => ($compact ? "22px 16px" : "14px 16px")};
  border-radius: 12px;
  background: ${({ theme }) => `${theme.colors.neutral}80`};
  @media (min-width: 1024px) {
    flex: 1;
    align-content: start;
    gap: 20px;
    padding: 24px;
  }
`;
export const AnswerGroup = styled.div`
  display: grid;
  gap: 12px;
`;
export const AnswerRow = styled.div`
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
`;
export const QuestionIcon = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
  svg [fill]:not([fill="none"]) {
    fill: currentColor;
  }
  svg [stroke]:not([stroke="none"]) {
    stroke: currentColor;
  }
`;
export const AnswerContent = styled.div`
  min-width: 0;
  overflow-wrap: anywhere;
`;
export const QuestionTitle = styled.p`
  ${({ theme }) => theme.typography.descriptive};
  font-size: 11px;
  line-height: 15px;
  @media (min-width: 1024px) {
    ${({ theme }) => theme.typography.body};
  }
`;
export const AnswerText = styled.p`
  ${({ theme }) => theme.typography.descriptive};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 15px;
  white-space: pre-wrap;
  @media (min-width: 1024px) {
    ${({ theme }) => theme.typography.body};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    margin-top: 4px;
  }
`;
export const Actions = styled.div`
  display: grid;
  grid-template-columns: 191fr 140fr;
  gap: 12px;
  margin: 28px 4px 0;
  @media (max-width: 359px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1024px) {
    width: min(100%, 430px);
    margin: 32px auto 0;
    gap: 16px;
  }
`;
export const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 48px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.brand};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.brand};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  &:disabled {
    background: ${({ theme }) => theme.colors.neutral};
    opacity: 1;
    cursor: default;
  }
  ${focusVisible}
`;
export const ContactButton = styled(ReviewButton)`
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.neutral};
  svg {
    width: 18px;
    height: 18px;
  }
`;
export const ContactDetails = styled.div`
  display: grid;
  gap: 12px;
  padding: 0 16px 24px;
`;
