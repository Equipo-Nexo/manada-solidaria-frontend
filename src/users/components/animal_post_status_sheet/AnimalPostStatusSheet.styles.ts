import styled from 'styled-components'
import { focusVisible } from '@styles/interactions'

export const Content = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 0 12px;
  color: ${({ theme }) => theme.colors.darkColor};
  outline: none;
`

export const Title = styled.h2`
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;
  overflow-wrap: anywhere;
`

export const Description = styled.p`
  ${({ theme }) => theme.typography.descriptive};
  max-width: 30ch;
  text-align: center;
  overflow-wrap: anywhere;
`

export const Pending = styled.p`
  ${({ theme }) => theme.typography.descriptive};
  color: ${({ theme }) => theme.colors.secondary};
`

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
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  background: ${({ $selected, theme }) => $selected ? theme.colors.secondary : theme.colors.background};
  color: ${({ $selected, theme }) => $selected ? theme.colors.neutral : theme.colors.secondary};

  svg { width: 14px; height: 14px; }
`

export const Actions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`

export const ActionButton = styled.button<{ $primary: boolean }>`
  width: 100%;
  min-height: 56px;
  padding: 12px 16px;
  border: 1px solid ${({ $primary, theme }) => $primary ? theme.colors.neutral : theme.colors.stroke};
  border-radius: 8px;
  background: ${({ $primary, theme }) => $primary ? theme.colors.neutral : theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
  ${focusVisible}

  &:disabled { opacity: 0.6; cursor: wait; }
`
