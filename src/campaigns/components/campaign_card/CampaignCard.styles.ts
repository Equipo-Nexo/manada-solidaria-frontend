import styled, { css } from "styled-components";
import { theme } from "@styles/theme";
import type { CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { campaignCategoryColors } from "@/campaigns/utils/CampaignUtils";

export const Card = styled.article<{ $clickable: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.layout.publicationCardWidth};
  height: ${({ theme }) => theme.layout.publicationCardHeight};
  overflow: hidden;
  border: 1px solid rgb(190 202 191 / 30%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 24px -4px rgb(0 109 65 / 8%);
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  @media (hover: hover) {
    ${({ $clickable, theme }) =>
      $clickable &&
      css`
        &:hover {
          border-color: ${theme.colors.stroke};
          box-shadow: 0 12px 28px -6px rgb(89 65 55 / 20%);
          transform: translateY(-3px);
        }
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ theme }) => theme.layout.publicationImageAspectRatio};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral};
`;
export const PostActionsContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 20;
`;
export const CampaignImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 208px;
  cursor: pointer;
  padding: 10px 16px 16px;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 28px;
`;

export const Location = styled.div`
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: ${theme.fontWeights.bold};
    line-height: 16.5px;
  `}

  svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const TypeBadge = styled.span<{
  $campaignType: CampaignCategory;
}>`
  width: 134px;
  height: 28px;
  flex: 0 0 134px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 999px;
  background: ${({ $campaignType }) => campaignCategoryColors[$campaignType]};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: ${theme.fontWeights.bold};
    line-height: 19.5px;
  `}
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2px;
  padding-top: 13px;
`;

export const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  width: 280px;
  display: flex;
  text-align: left;
  color: ${theme.colors.secondary};
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: 16px;
    font-weight: ${theme.fontWeights.bold};
    line-height: 24px;
  `}
`;

export const Description = styled.p`
  display: -webkit-box;
  text-align: left;
  min-height: 40px;
  margin: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: ${theme.fontWeights.regular};
    line-height: 20px;
  `}
`;

export const MoreInfoButton = styled.button`
  width: fit-content;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: underline;
  cursor: pointer;
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: ${theme.fontWeights.bold};
    line-height: 16.5px;
  `}

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const ConsultButton = styled.button`
  width: 100%;
  height: 48px;
  margin-top: auto;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
  transition:
    color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: ${theme.fontWeights.bold};
    line-height: 19.5px;
  `}

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 4px 12px rgb(169 92 40 / 14%);
      transform: translateY(-1px);
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
