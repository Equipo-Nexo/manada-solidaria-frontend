import styled from 'styled-components'

export const MapFrame = styled.div`
  width: 100%;
  height: 100%;
  min-height: 240px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgb(89 65 55 / 12%);

`
