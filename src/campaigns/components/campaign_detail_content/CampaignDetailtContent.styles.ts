import styled from "styled-components";
import type { CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { campaignCategoryColors } from "@/campaigns/utils/CampaignUtils";

export { DetailImage as CampaignImage } from "@/common/components/detailImage/DetailImage.styles";

export const CampaignDetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CampaignInformation = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const UserProfileContainer = styled.div`
  width: 50px;
  height: 50px;
  flex: 0 0 50px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: none;
`;
export const ValuesContainer = styled.div`
  min-width: 0;
  text-align: left;
`;
export const AuthorRole = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

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
  width: 40px;
  height: 40px;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  svg {
    width: 22px;
    height: 22px;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
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
  flex: 1;
  gap: 16px;
`;

export const PhotoContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 16px;
  flex: 1;
  align-self: flex-start;
`;

export const BottomInfoRow = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;

export const CampaignInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 12px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  padding: 24px;
`;
type TitleProps = {
  $iconColor?: "black" | "secondary";
};
export const Title = styled.h2<TitleProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 20px;
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
export const Label = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 17px;
  strong {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;
export const InfoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  height: 72px;
  background: ${({ theme }) => theme.colors.neutral};
`;
export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 11px;
  svg {
    width: 13px;
    height: 13px;
  }
`;
export const AuthorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 8%);
  justify-content: center;
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
  padding: 8px;
`;

export const MapContainer = styled.section`
  margin-bottom: 23px;
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
  &:hover {
    opacity: 0.9;
  }
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
`;

export const CampaignTypeBadge = styled.span<{
  $campaignType: CampaignCategory;
}>`
  height: 28px;
  box-sizing: border-box;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-radius: 999px;
  background: ${({ $campaignType }) => campaignCategoryColors[$campaignType]};
  color: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  display: flex;
`;
