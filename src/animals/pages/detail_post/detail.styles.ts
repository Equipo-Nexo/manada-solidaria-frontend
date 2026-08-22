import styled from 'styled-components'

export const StateContainer = styled.section`
  display: grid;
  min-height: 100svh;
  place-content: center;
  justify-items: center;
  gap: 24px;
  padding: 24px;
`

export const MainContainer = styled.section`
  display: flex;
  width: min(100%, 390px);
  min-height: 100svh;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  padding: 0 16px 128px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    width: min(100%, 1080px);
    min-height: auto;
    gap: 24px;
    padding: 28px 32px 64px;
  }
`

export const Header = styled.header`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};

`

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
`

export const DetailsColumn = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 16px;
`

export const BackButton = styled.button`
  width: 40px; height: 40px; display: grid; flex: 0 0 auto; place-items: center; border: 0;
  border-radius: 50%; background: ${({ theme }) => theme.colors.background}; color: ${({ theme }) => theme.colors.black}; cursor: pointer;
  svg { width: 22px; height: 22px; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`

export const PageTitle = styled.h1`
 margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
`
export const PhotoContainer = styled.div`
  display:flex;
  position:relative;
  width:100%;
  height:398px;

  @media (min-width: 768px) {
    height: auto;
    min-height: 0;
    align-self: stretch;
  }
`
export const Photo = styled.img`
  display: block; width: 100%; height: 100%; object-fit: cover;
  border-radius:12px;
`

export const ShareButton = styled.button`
  position: absolute; top: 12px; right: 16px; display: grid; width: 36px; height: 36px; place-items: center;
  border: 0; border-radius: 50%; background: ${({ theme }) => theme.colors.background}; color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 2px 7px rgb(0 0 0 / 14%); cursor: pointer;
  svg { width: 17px; height: 17px; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`

export const GeneralDataContainer = styled.article`
  display: flex; 
  flex-direction: column; 
  margin-top: 14px; 
  padding: 18px 20px 20px; 
  border-radius: 14px;
  width:100%;
  background: ${({ theme }) => theme.colors.background}; box-shadow: 0 2px 8px rgb(55 37 28 / 18%);

  @media (min-width: 768px) {
    height: auto;
    margin-top: 0;
    padding: 24px;
  }
`

export const GeneralData = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
`

export const Name = styled.h2`
  margin: 0; color: ${({ theme }) => theme.colors.brand};
  font: ${({ theme }) => `${theme.fontWeights.bold} ${theme.typography.header1.fontSize}/${theme.typography.header1.lineHeight} ${theme.fonts.body}`};
`

export const Status = styled.span<{ $backgroundColor?: string; $fontColor?: string }>`
  align-items: center; 
  justify-content: center; 
  border-radius: 999px;
  display: flex;
  width: 112px;
  height: 28px;
  background: ${({ $backgroundColor, theme }) => $backgroundColor ?? theme.colors.neutral};
  color: ${({ $fontColor, theme }) => $fontColor ?? theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize}; 
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const TimeContainer = styled.div`
  display: flex; align-items: center; gap: 4px; color: ${({ theme }) => theme.colors.darkColor}; font-size: 11px; line-height: 16px;
  svg { width: 13px; height: 13px; }
  margin-bottom:16px;
`

export const InfoContainer = styled.div<{ $variant: 'reward' | 'author' }>`
  display: flex; 
  align-items: center; 
  gap: 12px;
  padding: 16px; 
  border-radius: 12px;
  height:72px;
  margin-top: ${({ $variant }) => ($variant === 'author' ? '16px' : '0')};
  background: ${({ $variant, theme }) =>
    $variant === 'reward' ? '#E3FFC1' : theme.colors.neutral};
`

export const RewardIconContainer = styled.div`
  display: grid; 
  width: 34px; 
  height: 34px; 
  flex: 0 0 auto; 
  place-items: center; 
  border-radius: 50%; 
  background: #AED284;
  color: ${({ theme }) => theme.colors.black};
  svg { width: 20px; height: 15px; }
  svg path { fill: currentColor; }
`

export const ValuesContainer = styled.div`
  min-width: 0; 
  text-align: left;
`

export const Label = styled.p`
  margin: 0; color: ${({ theme }) => theme.colors.black}; 
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 17px;
  strong { color: ${({ theme }) => theme.colors.black}; 
  font-weight: ${({ theme }) => theme.fontWeights.bold}; }
`

export const Info = styled.p`
  margin: 0; color: ${({ theme }) => theme.colors.black}; font-size: 11px; font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 15px;
`

export const AuthorRole = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`

export const ProfilePhoto = styled.img`
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  object-fit: cover;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
`

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
  margin: 0; color: ${({ theme }) => theme.colors.black}; font-size: 15px; font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 17px;
`

export const MapLink = styled.a`
  display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; color: ${({ theme }) => theme.colors.brand};
  font-size: 11px; font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 16px; text-decoration: underline;
  svg { width: 17px; height: 17px; flex: 0 0 auto; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px 8px;
  width: 100%;
  margin-top: 24px;

  > * {
    grid-column: span 2;
  }

  > *:nth-child(n + 4) {
    grid-column: span 3;
  }

  @media (min-width: 768px) {
    align-self: stretch;
    margin-top: 0;
  }
`

export const FeatureCard = styled.div`
  min-width: 0; min-height: 65px; display: flex; align-items: center; gap: 6px; padding: 8px;
  border-radius: 9px; background: ${({ theme }) => theme.colors.background}; box-shadow: 0 3px 8px rgb(55 37 28 / 17%);
  text-align:left;
`

export const FeatureIcon = styled.span`
  width: 26px; height: 26px; display: grid; flex: 0 0 auto; place-items: center; border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral}; color: ${({ theme }) => theme.colors.secondary};
  font-size: 25px; font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 1;
  svg { width: 14px; height: 14px; }
  svg path { fill: currentColor; }
`

export const FeatureText = styled.div`
  min-width: 0;
`

export const FeatureLabel = styled.p`
  margin: 0; color: ${({ theme }) => theme.colors.secondary}; font-size: 11px; line-height: 14px;
`

export const FeatureValue = styled.p`
  overflow: hidden; margin: 0; color: ${({ theme }) => theme.colors.black}; font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold}; line-height: 18px; text-overflow: ellipsis; white-space: nowrap;
`

export const StorySection = styled.section`
  width: 100%;
  padding: 14px 8px 10px;
  text-align: left;

  @media (min-width: 768px) {
    padding: 8px;
  }
`

export const SectionTitle = styled.h2`
  display: flex; 
  align-items: center; 
  gap: 8px; 
  margin: 0; 
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px; font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 28px;
  svg { width: 22px; height: 22px; flex: 0 0 auto; }
`

export const BookIcon = styled.span`
  color: ${({ theme }) => theme.colors.brand}; 
  font-size: 24px; 
  font-weight: ${({ theme }) => theme.fontWeights.regular}; 
  line-height: 1;
`

export const StoryText = styled.p`
  margin: 16px 0 0; 
  color: ${({ theme }) => theme.colors.black}; 
  font-size: 14px; 
  line-height: 24px;
`

export const ContactArea = styled.section`
  display: flex; 
  flex-direction: column;
  align-self: stretch;
  gap: 16px;
  margin: 0 0 -108px;
  padding: 16px 0 124px;
  background:${({ theme }) => theme.colors.background};
  width: 100%;

  @media (min-width: 768px) {
    grid-area: contact;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    margin: 0;
    padding: 0;
  }
`

export const BottomInfoRow = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;

  ${InfoContainer} {
    width: 100%;
    margin-top: 0;
  }

`

export const AdviceArea = styled.section`
  width: 100%;

  > * {
    width: 100%;
  }
`

export const ContactCard = styled.div`
display: flex;
width: 100%;
height: 100%;
padding: 24px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
  border-radius: 16px;
background: ${({ theme }) => theme.colors.background};
box-shadow: 0 4px 20px 0 rgba(75, 63, 53, 0.08);

`

export const PhoneLink = styled.a`
  display: flex;
  height: 56px;
  padding: 16px;
  align-items: center;
  gap: 47px;
  align-self: stretch;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
`
