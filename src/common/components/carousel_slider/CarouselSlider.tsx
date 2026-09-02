import { useCallback, useRef, useState, type ReactNode } from "react";
import { ChevronRight } from "@/common/icons";
import * as S from "./CarouselSlider.styles";
import { useAutoAdvance } from "@/common/hooks/auto_advance/useAutoAdvance";

type CarouselSliderProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

function CarouselSlider<T>({ items, renderItem }: CarouselSliderProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const item = carousel.firstElementChild as HTMLElement | null;
      if (!item) return;
      const index = Math.round(carousel.scrollLeft / item.offsetWidth);
      setActiveIndex(index);
    }, 100);
  };

  const scrollToItem = useCallback((index: number) => {
    const carousel = carouselRef.current;
    const item = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !item) return;
    carousel.scrollTo({
      left: item.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    if (activeIndex >= items.length - 1) return;
    scrollToItem(activeIndex + 1);
  }, [activeIndex, items.length, scrollToItem]);

  useAutoAdvance({
    currentIndex: activeIndex,
    totalItems: items.length,
    onNext: handleNext,
  });

  if (items.length === 0) return null;

  return (
    <S.CarouselArea>
      <S.CarouselArrow
        type="button"
        $direction="previous"
        aria-label="Ver elemento anterior"
        disabled={activeIndex === 0}
        onClick={() => scrollToItem(activeIndex - 1)}
      >
        <ChevronRight aria-hidden="true" />
      </S.CarouselArrow>

      <S.Carousel ref={carouselRef} onScroll={handleCarouselScroll}>
        {items.map((item, index) => (
          <S.CarouselItem key={index}>{renderItem(item)}</S.CarouselItem>
        ))}
      </S.Carousel>

      <S.CarouselArrow
        type="button"
        $direction="next"
        aria-label="Ver elemento siguiente"
        disabled={activeIndex === items.length - 1}
        onClick={() => scrollToItem(activeIndex + 1)}
      >
        <ChevronRight aria-hidden="true" />
      </S.CarouselArrow>

      <S.CarouselIndicators aria-label="Elementos del carrusel">
        {items.map((_, index) => (
          <S.Indicator
            key={index}
            $active={index === activeIndex}
            aria-hidden="true"
          />
        ))}
      </S.CarouselIndicators>
    </S.CarouselArea>
  );
}

export default CarouselSlider;
