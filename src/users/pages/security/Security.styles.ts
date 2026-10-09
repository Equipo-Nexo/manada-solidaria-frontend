import styled from 'styled-components'

export const Page = styled.section`
  display: flex;
  width: min(100%, 560px);
  min-height: 100svh;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  padding: 0 16px 32px;
  color: ${({ theme }) => theme.colors.darkColor};
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: 28px 24px 48px;
  }
`

export const Header = styled.header`
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 8px;
`

export const BackButton = styled.button`
  display: inline-flex;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  svg { width: 48px; height: 48px; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; }
`

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`

export const HeroIcon = styled.span`
  display: grid;
  width: 72px;
  height: 72px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral};

  svg { width: 30px; height: 38px; }
`

export const IntroTitle = styled.h2`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const IntroText = styled.p`
  max-width: 440px;
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 20px;
`

export const PasskeyCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 20px rgb(75 63 53 / 8%);
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`

export const CardIcon = styled.span`
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.secondary};

  svg { width: 22px; height: 22px; }
`

export const CardTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
`

export const CardSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: 16px;
`

export const Benefits = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: ${({ theme }) => theme.colors.darkColor};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    line-height: 20px;
  }

  svg {
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    margin-top: 1px;
    color: ${({ theme }) => theme.colors.success};
  }
`

export const UnsupportedMessage = styled.p`
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  text-align: center;
`

export const PasskeyButton = styled.button`
  width: 100%;
  min-height: 56px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  cursor: pointer;

  &:disabled { cursor: not-allowed; opacity: 0.55; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`
