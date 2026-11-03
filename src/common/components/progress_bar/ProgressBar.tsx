import * as S from "./ProgressBar.styles";
type ProgressBarProps = {
  progress: number;
  color?: string;
  backgroundColor?: string;
  height?: string;
  label?: string;
  className?: string;
};

function ProgressBar({
  progress,
  color,
  backgroundColor,
  height,
  label = "Progreso",
  className,
}: ProgressBarProps) {
  const safeProgress = Number.isFinite(progress)
    ? Math.min(100, Math.max(0, progress))
    : 0;

  return (
    <S.ProgressTrack
      className={className}
      $backgroundColor={backgroundColor}
      $height={height}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}
    >
      <S.ProgressValue $progress={safeProgress} $color={color} />
    </S.ProgressTrack>
  );
}

export default ProgressBar;
