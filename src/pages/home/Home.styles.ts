import styled from 'styled-components'

export const HomePage = styled.div`

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
export const MessageContainer = styled.div`
  width: 100%;
  min-height: 120px;
`
