import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Content = styled.div`
  display: flex;
  min-height: 0;
  max-height: calc(85svh - 110px);
  flex-direction: column;
  gap: 16px;
  text-align: left;
`

export const Header = styled.header`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 12px;
`

export const TypeIcon = styled.span<{ $background: string; $color: string }>`
  display: grid;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};

  > svg {
    width: 24px;
    height: 24px;
  }
`

export const Heading = styled.div`
  min-width: 0;
`

export const Title = styled.h2`
  ${({ theme }) => theme.typography.header2};
  color: ${({ theme }) => theme.colors.darkColor};
  overflow-wrap: anywhere;
`

export const Count = styled.p`
  ${({ theme }) => theme.typography.descriptive};
  color: ${({ theme }) => theme.colors.darkColorMuted};
`

export const List = styled.ul`
  display: flex;
  min-height: 0;
  max-height: 55svh;
  margin: 0;
  padding: 0 4px 4px 0;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  overscroll-behavior: contain;
  list-style: none;
`

export const Card = styled.li`
  display: flex;
  min-width: 0;
  flex-shrink: 0;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
`

export const Photo = styled.div`
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px;

  @media (max-width: 359px) {
    width: 64px;
    height: 64px;
  }
`

export const PhotoPlaceholder = styled.div<{ $background: string; $color: string }>`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};

  > svg {
    width: 32px;
    height: 32px;
  }
`

export const Information = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

export const Name = styled.h3`
  ${({ theme }) => theme.typography.header3};
  color: ${({ theme }) => theme.colors.darkColor};
  overflow-wrap: anywhere;
`

export const Status = styled.span<{ $background: string; $color: string }>`
  max-width: 100%;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  overflow-wrap: anywhere;
`

export const InformationLine = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  ${({ theme }) => theme.typography.descriptive};
  overflow-wrap: anywhere;

  > svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`

export const DetailLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;

  > svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`
