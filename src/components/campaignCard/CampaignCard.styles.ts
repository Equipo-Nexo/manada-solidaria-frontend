import styled, { css } from "styled-components";
import type { CampaignType } from "./CampaignCard";
import { theme } from "../../styles/theme";

type CampaignTypeProps = {
  $campaignType: CampaignType;
};

const badgeBackground = {
  donation: "#B293FF",
  castration: "#A95C28",
  vaccination: "#EA5F09",
  deworming: "#594137",
  other: "#E1BFB2",
} satisfies Record<CampaignType, string>;

export const Card = styled.article`
  width: ${({ theme }) => theme.layout.publicationCardWidth};
  height: ${({ theme }) => theme.layout.publicationCardHeight};
  overflow: hidden;
  border: 1px solid rgb(190 202 191 / 30%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 24px -4px rgb(0 109 65 / 8%);
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 192px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral};
`;

export const CampaignImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 208px;
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

export const TypeBadge = styled.span<CampaignTypeProps>`
  width: 134px;
  height: 28px;
  flex: 0 0 134px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 999px;
  background: ${({ $campaignType }) => badgeBackground[$campaignType]};
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
  width:280px;
  display:flex;
  text-align:left;
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
