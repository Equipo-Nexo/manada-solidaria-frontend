import styled from "styled-components";

type CarouselArrowProps = {
  $direction: "previous" | "next";
};

export const CarouselArea = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`;

export const Carousel = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  overscroll-behavior-inline: contain;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselItem = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: center;
`;

export const CarouselArrow = styled.button<CarouselArrowProps>`
  display: none;
  @media (min-width: 1024px) {
    position: absolute;
    top: 50%;
    ${({ $direction }) =>
      $direction === "previous" ? "left: -64px;" : "right: -64px;"}
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
  }
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
