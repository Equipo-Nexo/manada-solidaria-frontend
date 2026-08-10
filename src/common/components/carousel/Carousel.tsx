import { useId, type ReactNode } from "react";
import { ChevronRight } from "../../icons";
import * as S from "./Carousel.styles";

type CarouselProps = {
  title: string;
  children: ReactNode;
  onSeeAll?: () => void;
  headerContent?: React.ReactNode;
  seeAllLabel?: string;
};

function Carousel({
  title,
  children,
  onSeeAll,
  headerContent,
  seeAllLabel = "Ver todos",
}: CarouselProps) {
  const titleId = useId();

  return (
    <S.Section aria-labelledby={titleId}>
      <S.Header>
        <S.Title id={titleId}>{title}</S.Title>
        {onSeeAll && (
          <S.SeeAllButton
            type="button"
            aria-label={`${seeAllLabel}: ${title}`}
            onClick={onSeeAll}
          >
            <span>{seeAllLabel}</span>
            <ChevronRight aria-hidden="true" />
          </S.SeeAllButton>
        )}
      </S.Header>
      <S.HeaderContent>{headerContent}</S.HeaderContent>

      <S.Content aria-label={title}>{children}</S.Content>
    </S.Section>
  );
}

export default Carousel;
