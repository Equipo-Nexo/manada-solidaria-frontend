import styled from 'styled-components'

export const HomePage = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (max-width: 767px) {
    gap: 26px;
  }
`

export const Section = styled.section`
  min-width: 0;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
`

export const SectionTitle = styled.h2`
  min-width: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.header2.fontFamily};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-style: ${({ theme }) => theme.typography.header2.fontStyle};
  font-weight: ${({ theme }) => theme.typography.header2.fontWeight};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
`

export const ViewAllButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 14px;
  padding: 8px 2px;
  border: 0;
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  cursor: pointer;

  span {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  svg {
    width: 8px;
    height: 14px;
    flex-shrink: 0;
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const Carousel = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 2px 2px 14px;
  scroll-padding-inline: 2px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.stroke} transparent;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;

  & > * {
    scroll-snap-align: start;
  }
`

export const AnimalCardSlot = styled.div`
  width: min(345px, calc(100vw - 54px));
  flex: 0 0 auto;

  & > * {
    width: 100%;
  }
`

export const CarouselMessage = styled.div`
  display: flex;
  width: 100%;
  min-height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  text-align: center;
`

export const RetryButton = styled.button`
  min-height: 40px;
  padding: 8px 20px;
  border: 0;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
`
