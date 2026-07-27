import styled from 'styled-components'
import { fieldFocusVisible } from '../../../styles/interactions'

const BORDER_RADIUS = '12px'
const TRANSITION_DURATION = '160ms'

export const ConditionalSwitchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const SwitchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: ${BORDER_RADIUS};
  background: ${({ theme }) => theme.colors.neutral};
`

export const SwitchRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  ${({ theme }) => theme.typography.menuItem};
`

export const SwitchLabelContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  svg {
    width: 18px;
    height: 18px;
    margin-top:5px;
    color: ${({ theme }) => theme.colors.secondary};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const SwitchInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`

export const SwitchControl = styled.span`
  position: relative;
  width: 40px;
  height: 22px;
  flex: 0 0 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.stroke};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
    transition: transform ${TRANSITION_DURATION} ease;
  }

  ${SwitchInput}:checked + & {
    background: ${({ theme }) => theme.colors.brand};
  }

  ${SwitchInput}:checked + &::after {
    transform: translateX(18px);
  }

  ${SwitchInput}:focus-visible + & {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const SwitchHelpText = styled.p`
  margin: 0 52px 0 30px;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
`

export const RewardField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const RewardInputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    z-index: 1;
    top: 18px;
    left: 12px;
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.secondary};
  }
  svg path {
    fill: #A95C28 !important;
  }
`

export const RewardInput = styled.input`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: ${BORDER_RADIUS};
  padding: 16px 16px 16px 42px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
  }
  ${fieldFocusVisible}
`
