import styled from "styled-components";

type CarouselArrowProps = {
  $direction: "previous" | "next";
};
type CarouselAreaProps = {
  $showArrowsOnHover: boolean;
};
export const Carousel = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselItem = styled.div<{ $visibleItems: number }>`
  flex: 0 0 100%;
  min-width: 0;
  box-sizing: border-box;
  scroll-snap-align: start;

  @media (min-width: 768px) {
    flex-basis: ${({ $visibleItems }) =>
      $visibleItems === 1 ? "100%" : "calc((100% - 16px) / 2)"};
  }

  @media (min-width: 1024px) {
    flex-basis: ${({ $visibleItems }) =>
      $visibleItems === 1 ? "100%" : "calc((100% - 32px) / 3)"};
  }

  @media (min-width: 1440px) {
    flex-basis: ${({ $visibleItems }) =>
      `calc((100% - ${($visibleItems - 1) * 16}px) / ${$visibleItems})`};
  }

  > * {
    width: 100%;
  }
`;

export const CarouselArrow = styled.button<CarouselArrowProps>`
  position: absolute;
  top: 50%;
  ${({ $direction }) =>
    $direction === "previous" ? "left: 8px;" : "right: 8px;"}
  z-index: 2;
  display: flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 4px 14px rgb(89 65 55 / 16%);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    opacity 200ms ease,
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;
  svg {
    width: 10px;
    height: 18px;
    flex-shrink: 0;
    transform: ${({ $direction }) =>
      $direction === "previous" ? "rotate(180deg)" : "none"};
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.neutral};
    transform: translateY(-50%) scale(1.06);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;
export const CarouselArea = styled.div<{
  $showArrowsOnHover?: boolean;
}>`
  position: relative;
  width: 100%;
  min-width: 0;
`;

export const CarouselIndicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 28px;

  @media (min-width: 1024px) {
    height: 40px;
  }
`;

export const Indicator = styled.span<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brand : theme.colors.stroke};
`;
