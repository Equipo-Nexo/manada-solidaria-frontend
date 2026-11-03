import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronRight } from "@/common/icons";
import * as S from "./CarouselSlider.styles";
import { useAutoAdvance } from "@/common/hooks/auto_advance/useAutoAdvance";

type CarouselSliderProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  visibleItems?: number;
  autoAdvance?: boolean;
  showArrowsOnHover?: boolean;
  hideArrowsOnMobile?: boolean;
  indicatorMode?: "active" | "seen";
};

function CarouselSlider<T>({
  items,
  renderItem,
  visibleItems = 1,
  autoAdvance = true,
  showArrowsOnHover = false,
  hideArrowsOnMobile = false,
  indicatorMode = "active",
}: CarouselSliderProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateSeenItems = useCallback(() => {
    const carousel = carouselRef.current;
    const item = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !item) return;

    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const step = item.getBoundingClientRect().width + gap;
    if (step <= 0) return;

    const count = Math.min(
      items.length,
      Math.max(1, Math.floor((carousel.clientWidth + gap + 1) / step)),
    );
    const atEnd = carousel.scrollWidth - carousel.clientWidth - carousel.scrollLeft <= 1;
    const index = atEnd
      ? items.length - count
      : Math.min(
          items.length - count,
          Math.max(0, Math.round(carousel.scrollLeft / step)),
        );
    setVisibleCount(count);
    setActiveIndex(index);
  }, [items.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new ResizeObserver(updateSeenItems);
    observer.observe(carousel);
    if (carousel.firstElementChild) observer.observe(carousel.firstElementChild);
    return () => observer.disconnect();
  }, [updateSeenItems]);

  useEffect(
    () => () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    },
    [],
  );

  const lastIndex = Math.max(0, items.length - visibleCount);

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      updateSeenItems();
    }, 100);
  };

  const scrollToItem = useCallback(
    (requestedIndex: number) => {
      const index = Math.max(0, Math.min(requestedIndex, lastIndex));
      const carousel = carouselRef.current;
      const item = carousel?.children[index] as HTMLElement | undefined;
      if (!carousel || !item) return;
      carousel.scrollTo({
        left: carousel.scrollLeft +
          item.getBoundingClientRect().left -
          carousel.getBoundingClientRect().left,
        behavior: "smooth",
      });
      setActiveIndex(index);
    },
    [lastIndex],
  );

  const handleNext = useCallback(() => {
    if (activeIndex >= lastIndex) return;
    scrollToItem(activeIndex + 1);
  }, [activeIndex, lastIndex, scrollToItem]);

  useAutoAdvance({
    currentIndex: activeIndex,
    totalItems: autoAdvance ? lastIndex + 1 : 0,
    onNext: autoAdvance ? handleNext : () => {},
  });

  if (items.length === 0) return null;

  return (
    <S.CarouselArea
      $showArrowsOnHover={showArrowsOnHover}
      $hideArrowsOnMobile={hideArrowsOnMobile}
    >
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
          <S.CarouselItem key={index} $visibleItems={Math.max(1, Math.floor(visibleItems) || 1)}>
            {renderItem(item)}
          </S.CarouselItem>
        ))}
      </S.Carousel>

      <S.CarouselArrow
        type="button"
        $direction="next"
        aria-label="Ver elemento siguiente"
        disabled={activeIndex >= lastIndex}
        onClick={() => scrollToItem(activeIndex + 1)}
      >
        <ChevronRight aria-hidden="true" />
      </S.CarouselArrow>

      <S.CarouselIndicators aria-label="Elementos del carrusel">
        {items.map((_, index) => (
          <S.Indicator
            key={index}
            $active={
              indicatorMode === "seen"
                ? index >= activeIndex && index < activeIndex + visibleCount
                : index === activeIndex
            }
            aria-hidden="true"
          />
        ))}
      </S.CarouselIndicators>
    </S.CarouselArea>
  );
}

export default CarouselSlider;
