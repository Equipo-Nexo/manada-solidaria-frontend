import styled from 'styled-components'

import { softInteractiveHover } from '../../styles/interactions'

export const HeaderRoot = styled.header`
  width: 100%;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.neutral};

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  @media (max-width: 420px) {
    padding: 0 18px;
  }
`

export const Brand = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 420px) {
    gap: 12px;
  }
`

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  ${softInteractiveHover}

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2.2;
  }
`

export const MenuButton = styled(IconButton)`
  display: none;

  @media (min-width: 768px) {
    display: inline-flex;
  }
`

export const Logo = styled.div`
  width: 52px;
  height: 42px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }

  @media (max-width: 420px) {
    width: 50px;
    height: 40px;
  }
`

export const Greeting = styled.p`
  margin: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.headerGreeting.fontSize};
  font-weight: ${({ theme }) => theme.typography.headerGreeting.fontWeight};
  line-height: ${({ theme }) => theme.typography.headerGreeting.lineHeight};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: ${({ theme }) => theme.typography.header3.fontSize};
  }
`
