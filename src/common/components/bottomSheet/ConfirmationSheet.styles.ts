import styled, { css } from 'styled-components'
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
  ${({ theme }) => theme.typography.body};
  max-width: 30ch;
  text-align: center;
  overflow-wrap: anywhere;
`

export const Actions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`

export const ActionButton = styled.button<{ $primary: boolean; $destructive?: boolean }>`
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
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, transform 120ms ease, filter 120ms ease;
  ${focusVisible}

  &:disabled { opacity: 0.6; cursor: wait; }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.secondary};
      background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    }
  }

  &:focus-visible:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.secondaryHoverSoft};
  }

  &:active:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.neutral};
    transform: scale(0.98);
  }

  &[aria-busy='true'] {
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.neutral};
    opacity: 1;
  }

  ${({ $destructive }) => $destructive && css`
    &,
    &:hover:not(:disabled),
    &:focus-visible:not(:disabled),
    &:active:not(:disabled),
    &[aria-busy='true'] {
      border-color: ${({ theme }) => theme.colors.error};
      background: ${({ theme }) => theme.colors.error};
      color: ${({ theme }) => theme.colors.background};
    }

    @media (hover: hover) {
      &:hover:not(:disabled) { filter: brightness(0.94); }
    }

    &:active:not(:disabled) { filter: brightness(0.85); }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active:not(:disabled) { transform: none; }
  }
`
