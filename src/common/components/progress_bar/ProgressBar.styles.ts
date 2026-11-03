import styled from "styled-components";

type ProgressTrackProps = {
  $height?: string;
  $backgroundColor?: string;
};

type ProgressValueProps = {
  $progress: number;
  $color?: string;
};

export const ProgressTrack = styled.div<ProgressTrackProps>`
  width: 100%;
  height: ${({ $height }) => $height ?? "9px"};
  overflow: hidden;
  border-radius: 10px;
  background: ${({ $backgroundColor }) =>
    $backgroundColor ?? "rgb(234 95 9 / 35%)"};
`;

export const ProgressValue = styled.div<ProgressValueProps>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ theme, $color }) => $color ?? theme.colors.secondary};
`;
