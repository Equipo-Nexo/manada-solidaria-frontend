import styled from 'styled-components'

export const Container = styled.aside`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 16px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.neutral};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
`

export const Icon = styled.span`
  color: ${({ theme }) => theme.colors.secondary};

  svg {
    width: 20px;
    height: 20px;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 18px;
`

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 17px;
`
