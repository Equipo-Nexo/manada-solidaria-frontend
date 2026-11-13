import styled from "styled-components";
import BottomSheet from "@common/components/bottomSheet/BottomSheet";

export const Sheet = styled(BottomSheet)`
  @media (min-width: 768px) {
    && {
      box-sizing: border-box;
      width: 100%;
      max-width: 720px;
      padding: 24px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  gap: 24px;
  padding: 8px 0 16px;
  color: ${({ theme }) => theme.colors.darkColor};

  @media (min-width: 768px) {
    box-sizing: border-box;
    max-height: calc(100vh - 160px);
    max-height: calc(100dvh - 160px);
    min-height: 0;
    padding: 8px 0 0;
  }

  @media (max-width: 767px) {
    box-sizing: border-box;
    max-height: calc(100vh - 152px - env(safe-area-inset-bottom));
    max-height: calc(100dvh - 152px - env(safe-area-inset-bottom));
    min-height: 0;
    gap: 16px;
    padding-bottom: 0;
  }
`;

export const Title = styled.h2`
  position: absolute;
  top: 30px;
  left: 62px;
  right: 62px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;

  @media (min-width: 768px) {
    top: 24px;
    left: 24px;
    right: 72px;
    justify-content: flex-start;
    text-align: left;
    ${({ theme }) => theme.typography.header2};
  }
`;

export const FiltersContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scrollbar-width: thin;
    padding: 5px;
    margin: -5px;
  }

  @media (max-width: 767px) {
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scrollbar-width: thin;
    gap: 20px;
    padding: 4px;
    margin: -4px;
    scrollbar-color: ${({ theme }) => theme.colors.neutral} transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.stroke};
      border-radius: 999px;
    }
  }
`;

export const FilterGroup = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    align-items: start;
    gap: 20px;
    min-width: 0;

    & + & {
      padding-top: 20px;
      border-top: 1px solid ${({ theme }) => theme.colors.stroke};
    }
  }
`;

export const GroupTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.darkColor};

  @media (min-width: 768px) {
    min-height: 44px;
  }
`;

export const GroupIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.neutral};
  svg {
    width: 16px;
    height: 16px;
  }
  svg path {
    fill: currentColor;
  }
`;

export const SelectionMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 50%;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;

  svg {
    width: 12px;
    height: 12px;
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 180ms ease,
      transform 180ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    svg {
      transition: none;
    }
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.secondary : theme.colors.stroke};
  border-radius: 20px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.neutral : theme.colors.background};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.secondary : theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease,
    transform 150ms ease;
  ${SelectionMark} {
    border-color: ${({ $selected, theme }) =>
      $selected ? theme.colors.secondary : theme.colors.stroke};
    background: ${({ $selected, theme }) =>
      $selected ? theme.colors.secondary : theme.colors.background};
    color: ${({ theme }) => theme.colors.background};
    svg {
      opacity: ${({ $selected }) => ($selected ? 1 : 0)};
      transform: scale(${({ $selected }) => ($selected ? 1 : 0.5)});
    }
  }

  &:active {
    transform: scale(0.96);
  }
  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.secondary};
      background: ${({ theme }) => theme.colors.neutral};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:active {
      transform: none;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  padding-top: 16px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    justify-content: center;
    border-top: 1px solid ${({ theme }) => theme.colors.stroke};
  }
`;

const ActionButton = styled.button`
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 12px 16px;
  border: none;
  border-radius: 24px;
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  @media (min-width: 768px) {
    flex: 0 1 168px;
  }
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background-color 150ms ease;
  &:active {
    transform: scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:active {
      transform: none;
    }
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 3px;
  }
`;

export const ClearButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.brand};
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  @media (min-width: 768px) and (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
    }
  }
`;

export const ApplyButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  @media (min-width: 768px) and (hover: hover) {
    &:hover {
      background: ${({ theme }) =>
        `color-mix(in srgb, ${theme.colors.brand} 90%, black 10%)`};
      box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
    }
  }
`;
