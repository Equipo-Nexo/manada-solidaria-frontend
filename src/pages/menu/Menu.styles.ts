import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const MenuRoot = styled.section`
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surfacePlain};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
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
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
`

export const Email = styled(UserText)`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
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
    background: ${({ theme }) => theme.colors.border};
  }
`

export const SectionTitle = styled.h2`
  margin: 0;
  padding: 8px 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: uppercase;
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const menuItemStyles = `
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
  font-family: Montserrat, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: rgb(234 95 9 / 8%);
  }

  &:focus-visible {
    outline: 3px solid rgb(234 95 9 / 28%);
    outline-offset: -3px;
  }

  svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    stroke-width: 2.25;
  }
`

export const MenuItemLink = styled(NavLink)<{ $isSelected: boolean }>`
  ${menuItemStyles}
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.brand : theme.colors.text)};

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
