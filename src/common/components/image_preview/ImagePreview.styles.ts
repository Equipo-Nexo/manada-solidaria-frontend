import styled, { css } from "styled-components";

type ImagePreviewVariant = 'rectangle' | 'round' | 'square' | 'fill'

export const ImageContainer = styled.div<{
  $variant: ImagePreviewVariant
}>`
  position: relative;
  overflow: hidden;

  ${({ $variant }) => $variant === 'rectangle' && css`
    width: 100%;
    aspect-ratio: ${({ theme }) => theme.layout.publicationImageAspectRatio};
  `}

  ${({ $variant }) => $variant !== 'rectangle' && css`
    width: 100%;
    height: 100%;
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

  ${({ $variant }) => $variant === 'rectangle' && css`
    object-fit: cover;
    object-position: ${({ theme }) => theme.layout.publicationImagePosition};
  `}

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

  ${({ $variant }) => $variant === 'fill' && css`
    object-fit: cover;
    object-position: ${({ theme }) => theme.layout.publicationImagePosition};
  `}
`
