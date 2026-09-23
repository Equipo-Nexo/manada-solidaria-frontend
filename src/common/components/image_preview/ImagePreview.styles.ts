import styled, { css } from "styled-components";

type ImagePreviewVariant = 'rectangle' | 'round' | 'square'

export const ImageContainer = styled.div<{
  $variant: ImagePreviewVariant
  $src?: string
}>`
  position: relative;
  overflow: hidden;

  ${({ $variant }) => $variant === 'rectangle' && css`
    width: 100%;
    height: 204px;
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

  ${({ $variant, $src }) => $variant === 'rectangle' && $src && css`
    &::before {
      content: '';
      position: absolute;
      inset: -10px;

      background-image: url(${$src});
      background-size: cover;
      background-position: center;

      filter: blur(16px);
      transform: scale(1.1);
      opacity: 0.65;
    }
  `}
`

export const Photo = styled.img<{ $variant: ImagePreviewVariant }>`
  display: block;
  width: 100%;
  height: 100%;

  ${({ $variant }) => $variant === 'rectangle' && css`
    position: relative;
    z-index: 1;

    object-fit: contain;
    object-position: center;
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
`