import styled from "styled-components";
import type { CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { campaignCategoryColors } from "@/campaigns/utils/CampaignUtils";

export const Page = styled.div`
  display: flex;
  width: min(100%, 390px);
  min-height: 100svh;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  padding: 0 16px 16px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    width: min(100%, 1080px);
    min-height: auto;
    gap: 24px;
    padding: 28px 32px 16px;
  }
`;
export const Header = styled.header`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
`;

export const BackButton = styled.button`
  width: 40px; height: 40px; 
  display: grid; 
  flex: 0 0 auto; 
  place-items: center; 
  border: 0;
  border-radius: 50%; 
  background: ${({ theme }) => theme.colors.background}; 
  color: ${({ theme }) => theme.colors.black}; 
  cursor: pointer;
  svg { width: 22px; height: 22px; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; 
  outline-offset: 2px; }
`
export const FormTitle = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-align: left;
`;
export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;
export const HeroLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
    align-items: stretch;
    gap: 28px;
  }
`;
export const DetailsColumn = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 16px;
`;
export const PhotoContainer = styled.div<{ $cropped: boolean }>`
  display: block;
  position: relative;
  width: 100%;
  height: ${({ $cropped }) => ($cropped ? '320px' : 'auto')};
  overflow: hidden;
  border-radius: 12px;

  @media (min-width: 768px) {
    height: ${({ $cropped }) => ($cropped ? 'clamp(360px, 42vw, 580px)' : 'auto')};
    align-self: start;
  }
`;
export const CampaignImage = styled.img<{ $cropped: boolean }>`
  display: block;
  width: 100%;
  height: ${({ $cropped }) => ($cropped ? '100%' : 'auto')};
  object-fit: ${({ $cropped }) => ($cropped ? 'cover' : 'initial')};
  object-position: center;
  border-radius: 12px;
`;
export const BottomInfoRow = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;
export const CampaignInfo = styled.section`
    display:flex;
    flex-direction:column;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  gap:12px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;
type TitleProps = {
  $iconColor?: "black" | "secondary";
};
export const Title = styled.h2<TitleProps>`
  display: flex;
  width:208px;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.header2};
  font-weight:${({ theme }) => theme.fontWeights.semibold};
  line-height: 22px;
  svg {
    color: ${({ $iconColor, theme }) =>
    $iconColor === "black" ? theme.colors.black : theme.colors.secondary};
  }
`;
export const CampaignEndDate = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 64px;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.neutral};

  svg {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.brand};
  }
`;
export const EndDateContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 4px;
`;
export const EndDateLabel = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const EndDateValue = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black};
  line-height: 16px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const DescriptionSection = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
`;
export const CampaignDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 20px;
  text-align: left;
`;

export const ShareButton = styled.button`
  width: 100%;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
`;
export const CampaignHeading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  h2 {
    margin: 0;
  }
`

export const CampaignTypeBadge = styled.span<{ $campaignType: CampaignCategory }>`
  min-width: 134px;
  height: 28px;
  box-sizing: border-box;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 999px;
  background: ${({ $campaignType }) => campaignCategoryColors[$campaignType]};
  color: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  display: flex;
`
