import styled, { css } from "styled-components";
import { CardContainer as AnimalCard } from "../animalPostCard/animalPostCard.styles";
import { Card as CampaignCard } from "@campaigns/components/campaign_card/CampaignCard.styles";

type CarouselArrowProps = {
  $direction: "previous" | "next";
};
type CarouselAreaProps = {
  $showArrowsOnHover: boolean;
  $hideArrowsOnMobile: boolean;
};
export const Carousel = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  gap: 8px;
  align-items: flex-start;
  flex-shrink: 0;
  overflow-x: auto;
  padding-top: 8px;
  padding-bottom: 16px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselItem = styled.div<{ $visibleItems: number }>`
  flex: 0 0 100%;
  min-width: min(100%, ${({ theme }) => theme.layout.publicationCardWidth});
  align-self: flex-start;
  box-sizing: border-box;
  scroll-snap-align: start;

  @container (min-width: 658px) {
    flex-basis: ${({ $visibleItems }) =>
      `calc((100% - ${(Math.min(2, $visibleItems) - 1) * 8}px) / ${Math.min(2, $visibleItems)})`};
  }

  @container (min-width: 991px) {
    flex-basis: ${({ $visibleItems }) =>
      `calc((100% - ${(Math.min(3, $visibleItems) - 1) * 8}px) / ${Math.min(3, $visibleItems)})`};
  }

  @container (min-width: 1324px) {
    flex-basis: ${({ $visibleItems }) =>
      `calc((100% - ${($visibleItems - 1) * 8}px) / ${$visibleItems})`};
  }

  && > * {
    width: 100%;
    max-width: 100%;
    flex-shrink: 0;
  }

  && > ${AnimalCard}, && > ${CampaignCard} {
    height: auto;
    min-height: ${({ theme }) => theme.layout.publicationCardHeight};
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

export const CarouselArea = styled.div<CarouselAreaProps>`
  position: relative;
  container-type: inline-size;
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  align-self: flex-start;
  ${({ $hideArrowsOnMobile }) =>
    $hideArrowsOnMobile &&
    css`
      @media (max-width: 767px) {
        ${CarouselArrow} {
          display: none;
        }
      }
    `}

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  --arrow-width: 16px;

  @media (min-width: 768px) {
    --arrow-width: 28px;
  }

  ${Carousel} {
    position: relative;
    grid-area: 1 / 1;
  }

  ${CarouselIndicators} {
    grid-area: 2 / 1;
  }

  ${CarouselArrow} {
    grid-area: 1 / 1;
    top: 50%;
    right: calc(-1 * var(--arrow-width) - 2px);
    left: auto;
    width: var(--arrow-width);
    height: 44px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    box-shadow: none;

    &:first-child {
      right: auto;
      left: calc(-1 * var(--arrow-width) - 2px);
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.neutral};
      color: ${({ theme }) => theme.colors.secondary};
      transform: translateY(-50%);
    }

    &:focus-visible {
      outline-offset: -3px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    ${CarouselArrow} {
      transition: none;
    }
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
