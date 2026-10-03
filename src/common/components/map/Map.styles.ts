import styled from 'styled-components'

export const MapFrame = styled.div`
  position: relative;
  isolation: isolate;
  width: 100%;
  height: 100%;
  min-height: 240px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgb(89 65 55 / 12%);
`
export const Legend = styled.ul`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3px;
  margin: 5px 2px;
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid #E5E7EBB2;
  pointer-events: none;
  list-style: none;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
  background: ${({ theme }) => theme.colors.background};
`

export const LegendItem = styled.li<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme, $color }) => $color ?? theme.colors.darkColor};
  white-space: nowrap;

  > svg {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }

  &:not(:first-child)::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    margin: 0 10px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.separator};
  }
`
