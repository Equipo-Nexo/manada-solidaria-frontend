import { theme } from "@/common/styles/theme";
import styled, { keyframes } from "styled-components";

const photoHeartAnimation = keyframes`
  0% { opacity: 0; transform: scale(0.4); }
  12% { opacity: 0.85; transform: scale(1.15); }
  20%, 75% { opacity: 0.85; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.85); }
`;

const photoHeartReducedAnimation = keyframes`
  0%, 75% { opacity: 0.85; }
  100% { opacity: 0; }
`;

export const CardContainer = styled.article`
  width: ${({ theme }) => theme.layout.publicationCardWidth};
  max-width: 100%;
  min-width: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(190 202 191 / 30%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 24px -4px rgb(0 109 65 / 8%);
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  @media (hover: hover) {
    &:hover {
      transform: translateY(-3px);
      border-color: ${({ theme }) => theme.colors.stroke};
      box-shadow: 0 12px 28px -6px rgb(89 65 55 / 20%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const PhotoContainer = styled.div`
  position: relative;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 11px 11px 0 0;
`;

export const PhotoHeart = styled.span`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.background};
  pointer-events: none;
  animation: ${photoHeartAnimation} 1s ease-out forwards;

  svg {
    width: 110px;
    height: 110px;
    max-width: 45%;
    max-height: 60%;
    filter: drop-shadow(0 2px 8px rgb(0 0 0 / 18%));
  }

  @media (prefers-reduced-motion: reduce) {
    animation-name: ${photoHeartReducedAnimation};
  }
`;

export const ShareButton = styled.button`
  position: absolute;
  top: 12px;
  right: 15px;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 10%),
    0 2px 4px -2px rgb(0 0 0 / 10%);
  cursor: pointer;
  backdrop-filter: blur(2px);
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 18px;
    height: 18px;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

export const RewardInfo = styled.button<{ $expanded: boolean }>`
  display: inline-flex;
  width: ${({ $expanded }) => ($expanded ? "112px" : "32px")};
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.statusFoundBackground};
  color: ${({ theme }) => theme.colors.statusRewardText};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  cursor: pointer;
  transition:
    width 180ms ease,
    box-shadow 180ms ease;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  @media (hover: hover) {
    &:hover {
      box-shadow: 0 2px 8px rgb(53 100 0 / 20%);
    }
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 5px;
  padding: 10px 13px 12px;
`;

export const MainInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  min-width: 0;
  max-width: 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

export const Title = styled.h2`
  min-width: 0;
  flex: 1 1 120px;
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.typography.header2.fontFamily};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-style: ${({ theme }) => theme.typography.header2.fontStyle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusContainer = styled.span<{
  $color: string;
  $background: string;
}>`
  min-width: 0;
  overflow-wrap: anywhere;
  padding: 4px 16px 4px 16px;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  background: ${({ $background }) => $background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-align: center;
`;

export const Location = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
  }

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`;

export const Description = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  margin: 0;
  min-height: calc(2 * ${({ theme }) => theme.typography.body.lineHeight});
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-style: ${({ theme }) => theme.typography.body.fontStyle};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  overflow-wrap: anywhere;
  text-align: left;

  &:empty {
    display: none;
  }
`;

export const ViewMore = styled.button`
  display: block;
  align-self: flex-start;
  padding: 2px;
  border: 0;
  color: ${({ theme }) => theme.colors.secondary};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
`;

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

export const LikeButton = styled.button<{ $isLiked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  svg {
    width: 20px;
    height: 22px;
    color: ${({ $isLiked }) => ($isLiked ? "#F04452" : theme.colors.darkColor)};
  }
`;
export const LikesCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkColor};
`;
export const ButtonsContainer = styled.div<{ $amount: number }>`
  display: grid;
  grid-template-columns: ${({ $amount }) =>
    $amount === 1
      ? "minmax(0, 1fr)"
      : "repeat(auto-fit, minmax(min(100%, 125px), 1fr))"};
  gap: 10px;
  margin-top: auto;
  padding-top: 8px 10px;
`;

export const ActionButton = styled.button<{
  $variant: "primary" | "secondary";
}>`
  min-width: 0;
  min-height: 48px;
  padding: 10px 12px;
  white-space: normal;
  overflow-wrap: anywhere;
  border: 0;
  border-radius: 999px;
  color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.background : theme.colors.brand};
  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.brand : theme.colors.neutral};
  font-family: ${({ theme }) => theme.typography.action.fontFamily};
  font-size: 14px;
  font-style: ${({ theme }) => theme.typography.action.fontStyle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.action.lineHeight};
  text-align: center;
  cursor: pointer;
  transition:
    color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  @media (hover: hover) {
    &:hover {
      color: ${({ theme, $variant }) =>
        $variant === "primary"
          ? theme.colors.background
          : theme.colors.secondary};
      background: ${({ theme, $variant }) =>
        $variant === "primary"
          ? theme.colors.brandHover
          : theme.colors.neutral};
      box-shadow: ${({ $variant }) =>
        $variant === "primary"
          ? "0 6px 14px rgb(234 95 9 / 24%)"
          : "0 4px 12px rgb(169 92 40 / 14%)"};
      transform: translateY(-1px);
    }
  }

  &:active {
    color: ${({ theme, $variant }) =>
      $variant === "primary"
        ? theme.colors.background
        : theme.colors.secondary};
    background: ${({ theme, $variant }) =>
      $variant === "primary" ? theme.colors.brandHover : theme.colors.neutral};
    transform: translateY(0) scale(0.98);
  }
`;
