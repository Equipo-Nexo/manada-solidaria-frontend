import styled from "styled-components";

type StatusBadgeProps = {
  $status: "FOUND" | "ADOPTED" | "RESCUED";
};

type IndicatorProps = {
  $active: boolean;
};

export const Container = styled.section`
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`;

export const Description = styled.p`
  max-width: 330px;
  margin: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 24px;
  text-align: left;
`;
export const FeaturedCarousel = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    flex: 0 0 100%;
    min-width: 0;
    scroll-snap-align: center;
  }
`;
type FeaturedCardProps = {
  $imageUrl: string;
};
export const FeaturedCard = styled.article<FeaturedCardProps>`
  position: relative;
  width: 100%;
  min-height: 170px;
  height: auto;
  overflow: hidden;
  border-radius: 20px;
  background-image:
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.neutral} 0%,
      ${({ theme }) => theme.colors.neutral} 35%,
      transparent 75%
    ),
    url(${({ $imageUrl }) => $imageUrl});
  background-position: 70% center;
  background-size: cover;
`;

export const FeaturedContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  box-sizing: border-box;
`;

export const FeaturedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 25px;
  padding: 4px 12px;
  box-sizing: border-box;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;

  svg {
    width: 15px;
    height: 15px;
    fill: currentColor;
  }
`;

export const FeaturedInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-top: 8px;
`;

export const FeaturedName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
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
`;

export const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
export const CarouselIndicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 28px;
`;

export const Indicator = styled.span<IndicatorProps>`
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brand : theme.colors.stroke};
`;

export const CasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HappyCaseCard = styled.button`
  display: flex;
  height: 130px;
  align-items: flex-start;
  align-self: stretch;
  width: 360px;
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
`;
export const CaseWrapper = styled.div`
  width: 100%;
`;
export const ExpandedContent = styled.div`
  width: 100%;
  margin-top: 6px;
  padding: 14px 16px 16px;
  box-sizing: border-box;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
