import { PawPrint } from '../icons'
import * as S from './PawLoader.styles'

export type PawLoaderSize = 'small' | 'medium' | 'large'

type PawLoaderProps = {
  label?: string
  size?: PawLoaderSize
  className?: string
}

function PawLoader({
  label = 'Cargando...',
  size = 'medium',
  className,
}: PawLoaderProps) {
  return (
    <S.Loader
      className={className}
      $size={size}
      role="status"
      aria-live="polite"
    >
      <S.PawTrail aria-hidden="true">
        <S.Paw>
          <PawPrint />
        </S.Paw>
        <S.Paw>
          <PawPrint />
        </S.Paw>
        <S.Paw>
          <PawPrint />
        </S.Paw>
      </S.PawTrail>

      <S.Label>{label}</S.Label>
    </S.Loader>
  )
}

export default PawLoader
