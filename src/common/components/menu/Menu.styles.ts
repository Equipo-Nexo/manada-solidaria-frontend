import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const MenuRoot = styled.section`
  width: 100%;
  min-height: 100svh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: calc(${({ theme }) => theme.layout.mobileNavHeight} + 16px);
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: left;

  @media (min-width: 768px) {
    padding-bottom: 0;
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 18px;
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  flex: 0 0 50px;
  border-radius: 999px;
  object-fit: cover;
`

export const UserData = styled.div`
  min-width: 0;
`

const UserText = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Username = styled(UserText)`
  color: ${({ theme }) => theme.colors.brand};
  font-size: ${({ theme }) => theme.typography.profileName.fontSize};
  font-weight: ${({ theme }) => theme.typography.profileName.fontWeight};
  line-height: ${({ theme }) => theme.typography.profileName.lineHeight};
`

export const Email = styled(UserText)`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.metadata.fontSize};
  font-weight: ${({ theme }) => theme.typography.metadata.fontWeight};
  line-height: ${({ theme }) => theme.typography.metadata.lineHeight};
`

export const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 0 24px;
`

export const MenuSectionBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 8px;
    padding-top: 9px;
  }

  & + &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 24px;
    left: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.stroke};
  }
`

export const SectionTitle = styled.h2`
  margin: 0;
  padding: 8px 22px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0;
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
  text-transform: uppercase;
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
`

const menuItemStyles = css`
  position: relative;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 22px;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.menuItem.fontFamily};
  font-size: ${({ theme }) => theme.typography.menuItem.fontSize};
  font-style: ${({ theme }) => theme.typography.menuItem.fontStyle};
  font-weight: ${({ theme }) => theme.typography.menuItem.fontWeight};
  line-height: ${({ theme }) => theme.typography.menuItem.lineHeight};
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
  border-radius: 12px;

  &:hover {
    background: rgb(234 95 9 / 8%);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -3px;
  }

  svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    stroke-width: 2.25;
  }

  svg[data-icon='users'] {
    width: 20px;
    height: 20px;
    flex-basis: 20px;
    transform: scale(1.35, 1.1);
    transform-origin: center;
  }
`

export const MenuItemLink = styled(NavLink)<{ $isSelected: boolean }>`
  ${menuItemStyles}
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.brand : theme.colors.darkColor)};

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: -8px;
    width: 4px;
    border-radius: 0;
    background: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.brand : 'transparent'};
    transition: background 160ms ease;
  }
`

export const LogoutButton = styled.button`
  ${menuItemStyles}
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.error};
`

export const ItemContent = styled.span`
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
