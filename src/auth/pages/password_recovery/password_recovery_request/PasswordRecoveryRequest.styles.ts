import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.section`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: max(16px, env(safe-area-inset-top)) 16px
    max(17px, env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.colors.neutral};

  @media (max-height: 650px) {
    justify-content: flex-start;
  }
`;

export const Panel = styled.div`
  position: relative;
  width: min(100%, 400px);
  min-height: min(86dvh, 760px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 32px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 20px rgb(169 92 40 / 8%);
  padding: 32px 24px 40px;

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 40px;
    left: calc(50% - 9px);
    top: 372px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.secondary};
    opacity: 0.03;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 8px;
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.colors.brand}, ${theme.colors.tertiary} 50%, ${theme.colors.secondary})`};
  }

  @media (min-width: 768px) {
    width: min(100%, 380px);
    min-height: min(86dvh, 720px);
  }

  @media (min-width: 768px) and (max-height: 720px) {
    width: min(100%, 340px);
    min-height: min(86dvh, 600px);
    padding: 24px 28px 32px;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    min-height: calc(100dvh - 80px);
    padding: 24px 20px 32px;
  }
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AppLogo = styled.img`
  width: 7.5rem;
  max-width: 100%;
  height: auto;

  @media (min-width: 768px) and (max-height: 720px) {
    width: 6rem;
  }

  @media (max-width: 767px) and (max-height: 850px) {
    width: 5rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    width: 4rem;
  }
`;

export const BrandName = styled.p`
  position: relative;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.brand};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.15;

  @media (min-width: 768px) {
    font-size: 1.625rem;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    font-size: 1.3rem;
    margin-top: 6px;
  }
`;
export const Introduction = styled.div`
  margin: 24px auto 0;
  width: min(100%, 284px);
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-height: 720px) {
    margin-top: 16px;
    gap: 6px;
  }
`;
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  line-height: 1.2;
  color: #261813;

  @media (max-width: 767px) and (max-height: 750px) {
    font-size: 1rem;
  }
`;
export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};

  @media (min-width: 768px) {
    font-size: 0.8125rem;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    font-size: 0.75rem;
  }
`;
export const Form = styled.form`
  width: min(100%, 284px);
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-height: 720px) {
    margin-top: 16px;
    gap: 12px;
  }
`;
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
`;
export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.14px;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  svg {
    width: 20px;
    height: 20px;
  }
  @media (min-width: 768px) {
    font-size: 0.8125rem;
    svg { width: 18px; height: 18px; }
  }
`;
export const Input = styled.input<{ $hasError: boolean }>`
  width: 100%;
  height: 48px;
  min-width: 0;
  padding: 12px 20px;
  border: 2px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : "transparent"};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  @media (min-width: 768px) {
    height: 44px;
    padding-block: 10px;
    font-size: 0.875rem;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`;
export const SubmitButton = styled.button`
  min-height: 48px;
  border: 0;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 10%),
    0 4px 6px -4px rgb(0 0 0 / 10%);
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  @media (min-width: 768px) {
    min-height: 40px;
    font-size: 0.875rem;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;
export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  color: ${({ theme }) => theme.colors.black};
  letter-spacing: 0.14px;
  text-decoration: underline;
  text-underline-offset: 2px;
  @media (min-width: 768px) {
    font-size: 0.8125rem;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;
export const Footer = styled.footer`
  width: min(100%, 380px);
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.darkColor};
  opacity: 0.6;
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 16px;
  @media (min-width: 768px) {
    font-size: 0.6875rem;
  }
  @media (max-width: 767px) and (max-height: 650px) {
    font-size: 0.625rem;
  }
`;
