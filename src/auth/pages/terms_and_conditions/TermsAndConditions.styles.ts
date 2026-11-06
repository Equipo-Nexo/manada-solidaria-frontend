import styled, { keyframes } from "styled-components";
import { BottomSheetCloseButton } from "@components/bottomSheet/BottomSheet.styles";

const modalEnter = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const backdropEnter = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Dialog = styled.dialog`
  width: min(430px, calc(100% - 32px));
  max-width: none;
  max-height: min(760px, calc(100dvh - 32px));
  margin: auto;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
  box-shadow: 0 18px 42px rgb(25 18 15 / 28%);
  &[open] {
    display: flex;
    flex-direction: column;
    animation: ${modalEnter} 220ms ease-out;
  }
  &::backdrop {
    background: rgb(25 18 15 / 48%);
    animation: ${backdropEnter} 180ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    &[open],
    &::backdrop {
      animation: none;
    }
  }
`;

export const Header = styled.header`
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 20px 64px;
`;

export const Title = styled.h2`
  margin: 0;
  ${({ theme }) => theme.typography.header3};
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;
`;

export const CloseButton = styled(BottomSheetCloseButton)`
  position: absolute;
  width: 40px;
  height: 40px;
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ScrollContent = styled.div`
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.stroke} transparent;
  padding: 10px 18px 8px;
  ${({ theme }) => theme.typography.body};
  overflow-wrap: anywhere;

  p,
  ul {
    margin: 0;
  }

  ul {
    padding-left: 21px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -2px;
  }
`;

export const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  text-align: center;
`;

export const PawBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 6px rgb(0 0 0 / 20%);
`;

export const DocumentTitle = styled.h3`
  max-width: 280px;
  margin: 0;
  ${({ theme }) => theme.typography.header2};
  color: ${({ theme }) => theme.colors.darkColor};
`;

export const UpdatedAt = styled.p`
  opacity: 0.8;
  font-size: 12px;
`;

export const Section = styled.section`
  margin-top: 20px;
  text-align: justify;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 10px;
  ${({ theme }) => theme.typography.header2};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: left;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 16px 24px 20px;
  box-shadow: 0 -6px 16px rgb(89 65 55 / 5%);
`;

export const AcceptButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: min(100%, 307px);
  min-height: 52px;
  padding: 12px 24px;
  border: 0;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => theme.typography.header3};
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 10%),
    0 2px 4px -2px rgb(0 0 0 / 10%);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;
