import { fieldFocusVisible } from "@/common/styles/interactions";
import styled from "styled-components";

const FORM_STYLE_VALUES = {
  borderRadius: '12px',
  contentPadding: '16px',
  contentGap: '16px',
  controlHeight: '56px',
  transitionDuration: '160ms',
} as const

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Input = styled.input`
  width: 100%;
  height: ${FORM_STYLE_VALUES.controlHeight};
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: ${FORM_STYLE_VALUES.borderRadius};
  padding: ${FORM_STYLE_VALUES.contentPadding};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; }
  ${fieldFocusVisible}
`

export const IconInputWrapper = styled.div`
  position: relative;
  svg { position: absolute; z-index: 1; top: 18px; left: 12px; width: 20px; height: 20px; color: ${({ theme }) => theme.colors.darkColor}; }
  ${Input} { padding-left: 42px; }
`

export const MapContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  width: 100%; 
  gap: 8px;
`

export const MapWrapper = styled.div`
  width: 100%;
  height: min(620px, calc(100svh - 250px));
  min-height: 420px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgb(89 65 55 / 12%);

  @media (max-width: 767px) {
    height: calc(100svh - 600px);
    min-height: 360px;
  }
`

export const Suggestion = styled.p`
  margin: 0 4px; 
  color: ${({ theme }) => theme.colors.darkColor}; 
  ${({ theme }) => theme.typography.descriptive};
  text-align: left
;`

export const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`
export const AutocompleteDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;

  width: 100%;
  max-height: 250px;
  overflow-y: auto;

  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: ${FORM_STYLE_VALUES.borderRadius};

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  z-index: 100;
`

export const AutocompleteItem = styled.button`
  width: 100%;
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.black};
  text-align: left;

  cursor: pointer;

  ${({ theme }) => theme.typography.body};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.stroke};
  }
`

export const LocationName = styled.span`
  font-weight: 500;
`

export const LocationDescription = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.darkColorMuted};
`

export const AutocompleteMessage = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.darkColorMuted};

  ${({ theme }) => theme.typography.body};
`