import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { createPagePaws } from '@/common/utils/PagePawUtils';
import * as S from './PagePaws.styles';

type PagePawsProps = {
  edgesOnly?: boolean;
  opacityMultiplier?: number;
};

function PagePaws({ edgesOnly = false, opacityMultiplier = 1 }: PagePawsProps) {
  const { key } = useLocation();
  const paws = useMemo(() => {
    const positions = createPagePaws(key);
    return edgesOnly
      ? positions.filter(({ left }) => left < 25 || left > 75)
      : positions;
  }, [key, edgesOnly]);

  return (
    <S.Background aria-hidden="true">
      {paws.map((paw, index) => (
        <S.Paw
          key={index}
          $left={paw.left}
          $top={paw.top}
          $size={paw.size}
          $rotation={paw.rotation}
          $opacity={paw.opacity * opacityMultiplier}
        />
      ))}
    </S.Background>
  );
}

export default PagePaws;
