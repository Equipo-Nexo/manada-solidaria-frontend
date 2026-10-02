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

  ${({ $variant }) => $variant === 'round' && css`
    border-radius: 50%;
    object-fit: cover;
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
