import styled from 'styled-components'

export const RewardInfo = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.statusFoundBackground};
  color: ${({ theme }) => theme.colors.statusRewardText};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
`
