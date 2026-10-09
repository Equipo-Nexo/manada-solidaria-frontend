import styled, { keyframes } from "styled-components";
import { PawPrint } from "@/common/icons";

const revealDescription = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

type StatusBadgeProps = {
  $status: "FOUND" | "ADOPTED" | "RESCUED";
};

export const PagePaws = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.brand};
  pointer-events: none;
`;

type PagePawProps = {
  $left: number;
  $top: number;
  $size: number;
  $rotation: number;
  $opacity: number;
};

export const PagePaw = styled(PawPrint)<PagePawProps>`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ theme }) => theme.colors.brand};
  opacity: ${({ $opacity }) => $opacity};
  transform: rotate(${({ $rotation }) => $rotation}deg);
`;

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  box-sizing: border-box;
  > *:not(${PagePaws}) {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 1024px) {
    max-width: 1200px;
  }
`;

export const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (min-width: 1024px) {
    gap: 12px;
    margin-bottom: 24px;
  }
`;
export const IntroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const BackButton = styled.button`
  width: 48px;
  height: 48px;
  display: inline-flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 24px;

  @media (min-width: 1024px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

export const Description = styled.p<{ $hasRecentCases: boolean }>`
  max-width: 330px;
  margin: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 24px;
  text-align: left;

  @media (min-width: 1024px) {
    grid-area: description;
    display: flex;
    position: relative;
    flex-direction: ${({ $hasRecentCases }) =>
      $hasRecentCases ? "column" : "row"};
    min-height: 420px;
    max-width: none;
    gap: ${({ $hasRecentCases }) => ($hasRecentCases ? "0" : "16px")};
    justify-content: center;
    margin: 0;
    padding: 36px;
    align-items: ${({ $hasRecentCases }) =>
      $hasRecentCases ? "flex-start" : "center"};
    box-sizing: border-box;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.darkColor};
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 26px;
    animation: ${revealDescription} 520ms ease-out both;
    ${({ $hasRecentCases }) =>
      !$hasRecentCases &&
      `
        min-height: auto;
        padding: 0;
        margin: 0 0 16px;
        align-items: flex-start;
        justify-content: flex-start;
      `}

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const DescriptionIcon = styled.span<{ $hasRecentCases: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    position: relative;
    z-index: 1;
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ $hasRecentCases }) => ($hasRecentCases ? "16px" : "0")};
    color: ${({ theme }) => theme.colors.brand};

    svg {
      width: 34px;
      height: 34px;
      fill: currentColor;
    }
  }
`;

export const DescriptionText = styled.span<{ $hasRecentCases: boolean }>`
  position: relative;
  z-index: 1;
  @media (min-width: 1024px) {
    max-width: ${({ $hasRecentCases }) => ($hasRecentCases ? "none" : "700px")};
  }
`;
export const FeaturedLayout = styled.div<{ $hasRecentCases: boolean }>`
  display: contents;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: minmax(0, 2.15fr) minmax(260px, 1fr);
    grid-template-areas:
      "carousel description"
      "indicators description";
    column-gap: 80px;
    align-items: start;
    margin-bottom: 24px;

    ${({ $hasRecentCases }) =>
      !$hasRecentCases &&
      `
        display: block;
        margin-bottom: 16px;
      `}
  }
`;

export const FeaturedCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 56%) minmax(0, 44%);
  width: 100%;
  min-height: 230px;
  overflow: hidden;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.neutral};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.neutral} 0%,
      ${({ theme }) => theme.colors.neutral} 43%,
      rgb(245 231 212 / 84%) 52%,
      transparent 76%
    );
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(300px, 48%) minmax(0, 52%);
    min-height: 420px;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.neutral};

    &::after {
      background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.neutral} 0%,
        ${({ theme }) => theme.colors.neutral} 36%,
        rgb(245 231 212 / 88%) 45%,
        transparent 67%
      );
      pointer-events: none;
    }
  }
`;

export const FeaturedContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  grid-column: 1;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 6px 12px 12px;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    grid-column: 1;
    min-height: 420px;
    justify-content: center;
    padding: 32px;
  }
`;

export const FeaturedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  max-width: 100%;
  white-space: nowrap;
  width: max-content;
  min-width: 0;
  box-sizing: border-box;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: center;
  line-height: 1.1;
  svg {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    fill: currentColor;
  }
  @media (min-width: 1024px) {
    max-width: max-content;
    min-height: 32px;
    padding: 6px 16px;
    font-size: 13px;
    white-space: nowrap;
  }
`;

export const FeaturedInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-top: 8px;

  @media (min-width: 1024px) {
    gap: 10px;
    margin-top: 16px;
  }
`;

export const FeaturedName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;

  @media (min-width: 1024px) {
    font-size: 28px;
    line-height: 34px;
  }
`;

export const FeaturedDescription = styled.p`
  width: 100%;
  max-width: 190px;
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 16px;
  text-align: left;

  @media (min-width: 1024px) {
    max-width: 420px;
    font-size: 14px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

export const StoryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 35px;
  margin-top: 4px;
  padding: 8px 12px;
  border: 2px solid ${({ theme }) => theme.colors.brand};
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 16px;
  cursor: pointer;

  svg {
    width: 6px;
    height: 10px;
  }

  &:active {
    transform: scale(0.97);
    background: ${({ theme }) => theme.colors.brand};
    color: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (min-width: 1024px) {
    height: 40px;
    margin-top: 4px;
    padding: 9px 16px;
    font-size: 14px;
  }
`;

export const FeaturedImage = styled.img`
  display: block;
  position: relative;
  z-index: 0;
  grid-column: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  @media (min-width: 1024px) {
    height: 420px;
  }
`;

export const CasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: start;
    gap: 20px;
  }
`;
export const HappyCaseCard = styled.button`
  display: flex;
  height: 130px;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 1px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid rgb(225 191 178 / 20%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
  text-align: left;
  cursor: pointer;

  &:active {
    transform: scale(0.99);
    box-shadow: 0 2px 6px rgb(0 0 0 / 12%);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (min-width: 1024px) {
    width: 100%;
    height: 150px;
    transition:
      transform 160ms ease,
      box-shadow 160ms ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgb(89 65 55 / 14%);
    }
  }
`;
export const CaseWrapper = styled.div`
  width: 100%;
  min-width: 0;
`;
export const ExpandedContent = styled.div`
  width: 100%;
  margin-top: 6px;
  padding: 14px 16px 16px;
  box-sizing: border-box;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  @media (min-width: 1024px) {
    margin-top: 10px;
  }
`;
export const FullDescription = styled.p`
  margin: 12px 0 16px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.4;
  text-align: left;
`;
export const Divider = styled.hr`
  width: 100%;
  margin: 0 0 14px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
export const Owner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const OwnerImage = styled.img`
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  object-fit: cover;
  border-radius: 50%;
`;
export const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const OwnerName = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  strong {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;
export const OwnerRole = styled.span`
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-align: left;
`;
export const CaseImage = styled.img`
  width: 120px;
  height: 100%;
  flex: 0 0 120px;
  object-fit: cover;
  border-radius: 10px 0 0 10px;

  @media (min-width: 1024px) {
    width: 132px;
    flex-basis: 132px;
  }
`;

export const CaseContent = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 12px 8px;
  box-sizing: border-box;
  gap: 4px;
`;

export const CaseName = styled.h3`
  margin: 0 0 4px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CaseDescription = styled.p`
  margin: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CaseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
`;

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  height: 28px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 999px;
  background: ${({ $status, theme }) =>
    $status === "FOUND" ? "#ccf59b" : theme.colors.neutral};
  color: ${({ $status, theme }) =>
    $status === "FOUND" ? theme.colors.success : theme.colors.secondary};
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 19px;
`;
type CaseArrowProps = {
  $expanded: boolean;
};

export const CaseArrow = styled.span<CaseArrowProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  transition: transform 0.2s ease;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(90deg)" : "rotate(0deg)"};
  svg {
    width: 6px;
    height: 10px;
    color: ${({ theme }) => theme.colors.darkColor};
  }
`;
