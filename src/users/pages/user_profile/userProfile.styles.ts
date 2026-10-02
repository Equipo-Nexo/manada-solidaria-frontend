import styled from 'styled-components';

const profileCardWidth = 'min(100%, 760px)';

export const MainContainer = styled.div`
    width: min(100%, 390px);
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    @media (min-width: 768px) {
        width: 100%;
        gap: 24px;
    }

`
export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
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
  svg {
    width: 48px;
    height: 48px;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`;


export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

export const ProfileImageWrapper = styled.div`
    position: relative;
    width: 152px;
    height: 152px;
`

export const ProfileImage = styled.img`
    width: 152px;
    height: 152px;
    border-radius: 50%;
    object-fit: cover;
    box-sizing: border-box;
    border: 6px solid ${({ theme }) => theme.colors.background};
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.darkColor}14;
`

export const ProfileName = styled.h2`
    margin: 4px 0 0;
    color: ${({ theme }) => theme.colors.black};
    overflow-wrap: anywhere;
`

export const ProfileEmail = styled.p`
    margin: 0;
    ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.darkColor};
    overflow-wrap: anywhere;
`

export const RolesContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;

`

export const Role = styled.li<{
    $backgroundColor: string
    $textColor: string
}>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 28px;
    white-space: nowrap;
    box-sizing: border-box;
    border-radius: 999px;
    padding: 1px 6px 1px 6px;
    background: ${({ $backgroundColor }) => $backgroundColor};
    color: ${({ $textColor }) => $textColor};
    ${({ theme }) => theme.typography.descriptive};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    @media (min-width: 950px) {
        min-height: 32px;
        padding: 4px 10px;
        ${({ theme }) => theme.typography.body};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
`

export const UserInfo = styled.p`
    margin: 0;
    ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.darkColor};
`

export const MetricsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
    gap: 8px;
    align-items: stretch;
    justify-content: center;

`

export const Metric = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 76px;
    width: 100%;
    min-width: 0;
    padding: 12px 8px;
    box-sizing: border-box;
    gap: 4px;
    text-align: center;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.neutral};
   
`

export const MetricValue = styled.span`
    ${({ theme }) => theme.typography.header3};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand};
`
export const MetricLabel = styled.span`
    min-width: 0;
    overflow-wrap: anywhere;
    ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.black};
    font-size:${({ theme }) => theme.typography.descriptive.fontSize};
`
export const PublicationsTitle = styled.h2`
    margin: 0;
    ${({ theme }) => theme.typography.header2};
    color: ${({ theme }) => theme.colors.black};
`
export const PublicationsAmount = styled.span`
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    color: ${({ theme }) => theme.colors.darkColor};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
`

export const PublicationsContainer = styled.div<{ $hasPosts: boolean; $minHeight: number }>`
  width: ${({ $hasPosts }) => $hasPosts ? '100%' : profileCardWidth};
  align-self: center;
  min-width: 0;
  min-height: ${({ $minHeight }) => $minHeight}px;
  display: grid;
  grid-template-columns: ${({ $hasPosts }) => $hasPosts
    ? 'repeat(auto-fit, minmax(min(100%, 325px), 325px))'
    : 'minmax(0, 1fr)'};
  justify-content: center;
  align-content: start;
  gap: 16px;
  & > article {
    width: 100%;
  }

  @media (min-width: 768px) {
    grid-template-columns: ${({ $hasPosts }) => $hasPosts
      ? 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))'
      : 'minmax(0, 1fr)'};
    gap: 24px;
    align-items: stretch;
  }
`

export const MessageContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  width: ${profileCardWidth};
  min-width: 0;
  justify-self: center;
  height:180px;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap:16px;
`

export const RetryButton = styled.button`
  min-height: 40px;
  padding: 8px 20px;
  border: 0;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`
export const SecondaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    gap: 24px;

    @media (min-width: 1024px) {
        gap: 32px;
    }

`

export const ProfilePanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    gap: 10px;
    text-align: center;

    @media (min-width: 768px) {
        gap: 12px;

        ${ProfileName} {
            ${({ theme }) => theme.typography.header1};
        }

    }


`

export const ProfileSidebar = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${profileCardWidth};
    min-width: 0;
    gap: 24px;
    position: relative;
    isolation: isolate;
    padding-top: 40px;
    padding-bottom: 24px;
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 4px 24px ${({ theme }) => theme.colors.darkColor}0D;

    &::before {
            content: '';
            position: absolute;
            z-index: -1;
            inset: 0 0 auto;
            height: 104px;
            border-radius: 16px;
            background: linear-gradient(
                120deg,
                ${({ theme }) => theme.colors.neutral} 0%,
                ${({ theme }) => theme.colors.soft} 65%,
                ${({ theme }) => theme.colors.tertiary}40 100%
            );
    }

    @media (min-width: 768px) {
        padding-top: 48px;

        &::before {
            height: 120px;
            border-radius: 24px;
        }
    }

`

export const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: min(100%, 560px);
    min-width: 0;
    gap: 16px;

    @media (min-width: 768px) {

        ${MetricsContainer} {
            gap: 10px;
        }

    }

`

export const PublicationsHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 0;
    gap: 16px;

    & > [aria-label] {
        margin: 0;
        padding-inline: 0;
    }

`

export const PublicationsSection = styled.section`
    container: publications / inline-size;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 0;
    gap: 16px;

    @media (min-width: 768px) {
        gap: 24px;
        align-items: flex-start;

    }
`
export const TitleContainer = styled.div`
    display: flex;
    width: 100%;
    min-width: 0;
    justify-content: center;
    text-align: center;
  `

export const TitlesContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  white-space: nowrap;
`

export const PageSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`
