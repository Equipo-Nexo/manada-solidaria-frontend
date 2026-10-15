import styled from 'styled-components';
import { PawPrint } from '@/common/icons';

export const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.brand};
  pointer-events: none;
`;

type PagePawProps = {
  $left: number;
  $top: number;
  $size: number;
  $rotation: number;
  $opacity: number;
};

export const Paw = styled(PawPrint)<PagePawProps>`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ theme }) => theme.colors.brand};
  opacity: ${({ $opacity }) => $opacity};
  transform: rotate(${({ $rotation }) => $rotation}deg);
`;
