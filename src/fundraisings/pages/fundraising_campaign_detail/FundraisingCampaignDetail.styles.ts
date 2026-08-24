import styled from "styled-components";

export const Page = styled.div`
  @media (min-width: 768px) {
    padding: 28px 24px 48px;
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 11px;
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

export const FormTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  font-weight: ${({ theme }) => theme.typography.header1.fontWeight};
  line-height: ${({ theme }) => theme.typography.header1.lineHeight};
`;
export const Content = styled.div`
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  @media (min-width: 768px) {
    max-width: 560px;
  }
`;
export const FundraisingImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
`;
export const FundraisingInfo = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;
type TitleProps = {
  $iconColor?: "black" | "secondary";
};
export const Title = styled.h2<TitleProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
  font-size: 18px;
  line-height: 22px;
  svg {
    color: ${({ $iconColor, theme }) =>
    $iconColor === "black" ? theme.colors.black : theme.colors.secondary};
  }
`;
export const FundraisingEndDate = styled.div`
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
  gap: 2px;
`;
export const EndDateLabel = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const EndDateValue = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  line-height: 16px;
`;
export const AliasSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 8px 12px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
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
export const AliasContent = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const AliasLabel = styled.span`
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  font-size: 11px;
  line-height: 1rem;
`;
export const AliasValue = styled.span`
  text-align: left;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
type CopyButtonProps = {
  $copied?: boolean;
};
export const CopyButton = styled.button<CopyButtonProps>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 30px;
  width: 120px;
  padding: 6px 4px;
  border: 1px solid ${({ theme }) => theme.colors.brand};
  border-radius: 10px;
  background: ${({ $copied, theme }) =>
    $copied ? theme.colors.brand : theme.colors.background};
  color: ${({ $copied, theme }) =>
    $copied ? theme.colors.background : theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  svg {
    width: 14px;
    height: 14px;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
export const FundraisingGoal = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 10px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;
export const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const GoalAmount = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 22px;
`;
export const GoalPercentage = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
`;
export const ProgressTrack = styled.div`
  width: 100%;
  height: 9px;
  overflow: hidden;
  border-radius: 10px;
  background: rgb(234 95 9 / 35%);
`;

type ProgressValueProps = {
  $progress: number;
};

export const ProgressValue = styled.div<ProgressValueProps>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.secondary};
`;
export const GoalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 7px;
`;
export const CollectedAmount = styled.span`
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 12px;
  line-height: 16px;
`;
export const RemainingAmount = styled.span`
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 12px;
  line-height: 16px;
  text-align: right;
`;
export const DescriptionSection = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
`;
export const FundraisingDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 20px;
  text-align: left;
`;

export const LocationCard = styled.section`
  min-height: 107px; 
  display: grid; 
  text-align:left;
  grid-template-columns: 1fr 1fr; 
  overflow: hidden; 
  margin-top: 14px; 
  border-radius: 10px;
  width:100%;
  background: ${({ theme }) => theme.colors.background}; 
  box-shadow: 0 2px 8px rgb(55 37 28 / 18%);

  @media (min-width: 768px) {
    min-height: 140px;
    margin-top: 0;
  }
`

export const MapPreview = styled.div`
  position: relative; overflow: hidden;
  background: linear-gradient(34deg, transparent 42%, rgb(255 255 255 / 75%) 43% 47%, transparent 48%),
    linear-gradient(94deg, transparent 54%, rgb(255 255 255 / 70%) 55% 59%, transparent 60%),
    repeating-linear-gradient(25deg, transparent 0 15px, rgb(223 192 143 / 48%) 16px 18px), #c1ddd7;
  &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 48%, rgb(111 174 197 / 28%) 49% 57%, transparent 58%); }
`

export const MapMarker = styled.span`
  position: absolute; z-index: 1; top: 46%; left: 52%; width: 10px; height: 10px; border: 3px solid ${({ theme }) => theme.colors.background};
  border-radius: 50% 50% 50% 0; background: ${({ theme }) => theme.colors.brand}; box-shadow: 0 1px 3px rgb(0 0 0 / 28%); transform: rotate(-45deg);
`

export const LocationContent = styled.div`
  display: flex; flex-direction: column; justify-content: center; padding: 14px 8px;
`

export const LocationTitle = styled.h3`
  margin: 0; color: ${({ theme }) => theme.colors.black}; 
  font-size: 18px; 
  font-weight: ${({ theme }) => theme.fontWeights.bold}; 
  line-height: 17px;
`

export const MapLink = styled.button`
  display: inline-flex; 
  align-items: center; 
  gap: 8px; 
  margin-top: 8px; 
  color: ${({ theme }) => theme.colors.brand};
  width: fit-content; padding: 0; border: 0; 
  background: transparent; 
  cursor: pointer;
  font-size: 12px; 
  font-weight: ${({ theme }) => theme.fontWeights.bold}; 
  line-height: 16px; 
  text-decoration: underline;
  svg { width: 24px; height: 24px; flex: 0 0 auto; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`


export const ContactSection = styled.section`
  width: 100%;
  min-height: 130px;
  box-sizing: border-box;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;

export const ContactCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;
export const ContactPhone = styled.span`
  min-width: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CallButton = styled.button`
  min-width: 116px;
  height: 40px;
  padding: 6px 8px;
  border: 2px solid ${({ theme }) => theme.colors.brand};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.brand};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
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
