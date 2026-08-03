import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const MapRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 240px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutral};

  .maplibregl-map {
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.fonts.body};
  }

  .maplibregl-ctrl-attrib {
    color: ${({ theme }) => theme.colors.darkColor};
    font-size: 10px;
  }
`

export const MapCanvas = styled.div`
  position: absolute;
  inset: 0;
`

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.secondary};
`

export const LoadingIndicator = styled.span`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.stroke};
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 800ms linear infinite;
`

export const Marker = styled.div`
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 3px solid ${({ theme }) => theme.colors.background};
  border-radius: 50% 50% 50% 0;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral};
  box-shadow: 0 4px 12px rgb(89 65 55 / 30%);
  transform: rotate(-45deg);

  > svg {
    width: 21px;
    height: 21px;
    transform: rotate(45deg);
  }
`

export const Controls = styled.div<{ $position: MapControlPosition }>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 3px 12px rgb(89 65 55 / 18%);

  ${({ $position }) => {
    const [vertical, horizontal] = $position.split('-')
    return `
      ${vertical}: ${vertical === 'bottom' ? '28px' : '12px'};
      ${horizontal}: 12px;
    `
  }}
`

export const ControlButton = styled.button`
  display: grid;
  width: 42px;
  height: 42px;
  padding: 0;
  place-items: center;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 24px;
  line-height: 1;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -3px;
  }

  > svg {
    width: 20px;
    height: 20px;
  }
`

export type MapControlPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
