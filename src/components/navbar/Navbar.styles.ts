import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const BottomNav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`

export const BottomNavContent = styled.div`
  width: min(100%, ${({ theme }) => theme.layout.contentMaxWidth});
  height: ${({ theme }) => theme.layout.mobileNavHeight};
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  background: ${({ theme }) => theme.colors.surface};
`

export const BottomNavItem = styled(NavLink)<{ $isActive: boolean }>`
  position: relative;
  width: 78px;
  height: 60px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.secondary : theme.colors.text)};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-decoration: none;
  transition: color 160ms ease;

  &::before {
    content: '';
    position: absolute;
    top: -9px;
    left: 50%;
    width: 54px;
    height: 4px;
    border-radius: 0 0 999px 999px;
    background: ${({ $isActive, theme }) => ($isActive ? theme.colors.secondary : 'transparent')};
    transform: translateX(-50%);
    transition: background 160ms ease;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2;
  }
`

export const PublishWrapper = styled.div`
  position: relative;
  align-self: stretch;
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;

  span {
    position: absolute;
    top: 46px;
  }
`

export const PublishButton = styled.button`
  position: absolute;
  top: -35px;
  left: 50%;
  width: 70px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral};
  box-shadow: 0 8px 18px rgb(169 92 40 / 28%);
  cursor: pointer;
  transform: translateX(-50%);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translate(-50%, -2px);
    box-shadow: 0 12px 22px rgb(169 92 40 / 32%);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2.5;
  }
`
