import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const BottomNav = styled.nav<{ $isMenuOpen: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ $isMenuOpen }) => ($isMenuOpen ? 60 : 20)};

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
  border-radius: 25px 25px 0 0;
  background: ${({ theme }) => theme.colors.neutral};
`

const bottomNavItemStyles = css<{ $isActive: boolean }>`
  position: relative;
  width: 78px;
  height: 60px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.secondary : theme.colors.darkColor)};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.navLabel.fontFamily};
  font-size: ${({ theme }) => theme.typography.navLabel.fontSize};
  font-weight: ${({ theme }) => theme.typography.navLabel.fontWeight};
  line-height: ${({ theme }) => theme.typography.navLabel.lineHeight};
  text-decoration: none;
  transition: color 160ms ease;

  &::before {
    content: '';
    position: absolute;
    top: -9px;
    left: 50%;
    width: 54px;
    height: 4px;
    border-radius: 999px;
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

export const BottomNavItem = styled(NavLink)<{ $isActive: boolean }>`
  ${bottomNavItemStyles}
`

export const BottomNavButton = styled.button<{ $isActive: boolean }>`
  ${bottomNavItemStyles}
`

export const PublishWrapper = styled.div`
  position: relative;
  align-self: stretch;
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.navLabel.fontSize};
  font-weight: ${({ theme }) => theme.typography.navLabel.fontWeight};
  line-height: ${({ theme }) => theme.typography.navLabel.lineHeight};

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
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translate(-50%, -2px);
    box-shadow: 0 12px 22px rgb(169 92 40 / 32%);
  }

  &:active {
    transform: translateX(-50%) scale(0.96);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`
