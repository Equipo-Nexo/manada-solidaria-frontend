import styled, { css } from "styled-components";

type ImagePreviewVariant = 'rectangle' | 'round' | 'square'

export const ImageContainer = styled.div<{ $variant: ImagePreviewVariant }>`
  ${({ $variant }) => $variant !== 'rectangle' ? css`
    width: 100%;
    height: 100%;
  ` : css`
    max-height: 204px;
    min-height: 204px;
  `}

  ${({ $variant }) => $variant === 'square' && css`
    width: auto;
    aspect-ratio: 1;
    flex: 0 0 auto;
  `}
`

export const Photo = styled.img<{ $variant: ImagePreviewVariant }>`
  display: block;
  width: 100%;
  height: 100%;

  ${({ $variant, theme }) => $variant === 'round' && css`
    border: 4px solid ${theme.colors.background};
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 10px 28px ${theme.colors.darkColor}24;
  `}

  ${({ $variant }) => $variant === 'square' && css`
    object-fit: cover;
    object-position: center;
  `}
`
