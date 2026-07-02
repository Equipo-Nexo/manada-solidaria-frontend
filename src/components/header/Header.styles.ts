import styled from 'styled-components'

export const HeaderRoot = styled.header`
  width: 100%;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.surface};

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
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: rgb(169 92 40 / 12%);
    color: ${({ theme }) => theme.colors.primary};
  }

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
  color: ${({ theme }) => theme.colors.text};
  font-size: 17px;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 16px;
  }
`
