import styled from 'styled-components'

export const StateContainer = styled.section`
  display: grid;
  min-height: 100svh;
  place-content: center;
  justify-items: center;
  gap: 24px;
  padding: 24px;
`
export const LoaderContainer = styled.div`
  width:100%;
  display:flex;
  height:500px;
  justify-content:center;
  align-items:center;
`
export const MainContainer = styled.section`
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
  width: 40px; 
  height: 40px; 
  display: grid; 
  flex: 0 0 auto; 
  place-items: center; 
  border: 0;
  border-radius: 50%; background: ${({ theme }) => theme.colors.background}; 
  color: ${({ theme }) => theme.colors.black}; cursor: pointer;
  svg { width: 22px; height: 22px; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; 
  outline-offset: 2px; }
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

export const GeneralDataContainer = styled.article`
  display: flex; 
  flex-direction: column; 
  margin-top: 14px; 
  padding: 18px 20px 20px; 
  border-radius: 14px;
  width:100%;
  background: ${({ theme }) => theme.colors.background}; 
  box-shadow: 0 2px 8px rgb(55 37 28 / 18%);
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

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px 8px;
  width: 100%;
  margin-top: 24px;

  > * {
    grid-column: span 2;
  }

  > *:nth-child(-n + 2) {
    grid-column: span 3;
    grid-row: 1;
  }

  > *:nth-child(3) {
    grid-column: 1 / span 3;
    grid-row: 2;
  }

  > *:nth-child(4) {
    grid-column: 4 / span 3;
    grid-row: 2;
  }

  > *:nth-child(5) {
    grid-column: 1 / -1;
    grid-row: 3;
  }

  @media (min-width: 768px) {
    align-self: stretch;
    margin-top: 0;

    > *:nth-child(-n + 3) {
      grid-column: span 2;
      grid-row: auto;
    }

    > *:nth-child(n + 4) {
      grid-column: span 3;
      grid-row: auto;
    }
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
  align-self: stretch;
  align-items: stretch;
  flex-direction: column;
  gap: 16px;

  ${InfoContainer} {
    width: 100%;
    margin-top: 0;
  }

`

export const AdviceArea = styled.section`
  width: 100%;
`


export const ShareButton = styled.button`
  width: 100%;
  min-width: 100%;
  height: 56px;
  min-height: 56px;
  box-sizing: border-box;
  align-self: stretch;
  flex-shrink: 0;
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

