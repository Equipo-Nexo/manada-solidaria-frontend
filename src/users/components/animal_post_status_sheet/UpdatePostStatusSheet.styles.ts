import styled from 'styled-components'
import { focusVisible } from '@styles/interactions'

export const FundraisingProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  min-width: 0;
  text-align: left;
  &:empty { display: none; }
  [role="progressbar"] { max-width: 155px; }
`;

export const FundraisingGoal = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
  line-height: 20px;
  overflow-wrap: anywhere;
`;

export const FundraisingSubtitle = styled.p<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: ${({ theme, $completed }) => $completed ? theme.colors.success : theme.colors.statusCampaignFinishedText};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  svg { width: 15px; height: 15px; flex-shrink: 0; }
`;

export { Content, Title, Description, Actions, ActionButton } from '@components/bottomSheet/ConfirmationSheet.styles'

export const Options = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`

export const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;
  background: ${({ $selected, theme }) => $selected ? theme.colors.neutral : theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: left;
  cursor: pointer;
  ${focusVisible}

  &:disabled { opacity: 0.6; cursor: wait; }

  @media (hover: hover) {
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.neutral}; }
  }
`

export const OptionText = styled.span`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
  overflow-wrap: anywhere;
`

export const OptionLabel = styled.span`
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const OptionDescription = styled.span`
  ${({ theme }) => theme.typography.descriptive};
  color: ${({ theme }) => theme.colors.secondary};
`

export const CheckCircle = styled.span<{ $selected: boolean }>`
  display: grid;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  place-items: center;
  border: 2.3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  background: ${({ $selected, theme }) => $selected ? theme.colors.secondary : theme.colors.background};
  color: ${({ $selected, theme }) => $selected ? theme.colors.neutral : theme.colors.secondary};
  svg { width: 14px; height: 14px; }
`
