import styled from "styled-components";

export const ImageUploadLoadingState = styled.div`
  width: 100%;
  min-height: 154px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 18px;
  background: ${({ theme }) => theme.colors.background};
`;

export const ImageUploadButton = styled.button`
  width: 100%;
  min-height: 154px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  border: 2px dashed ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 18px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  -webkit-tap-highlight-color: transparent;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;

export const ImageUploadIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 26px;
    height: 26px;
    stroke-width: 2.4;
    color: ${({ theme }) => theme.colors.darkColor};
  }
`;

export const ImageUploadLabel = styled.span`
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

export const ImageUploadPreview = styled.img`
  width: 100%;
  height: 100%;
  min-height: 154px;
  object-fit: cover;
`;

export const EditImageIndicator = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 58px;
  height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  border: 1px solid ${({ theme }) => `${theme.colors.background}80`};
  border-radius: 50%;
  background: ${({ theme }) => `${theme.colors.background}80`};
  color: ${({ theme }) => theme.colors.darkColor};
  box-shadow: 0 6px 18px ${({ theme }) => `${theme.colors.black}33`};
  pointer-events: none;
  backdrop-filter: blur(1.5px);
  transition: transform 160ms ease, background-color 160ms ease, color 160ms ease;

  svg {
    width: 24px;
    height: 24px;
  }

  ${ImageUploadButton}:hover & {
    background: ${({ theme }) => `${theme.colors.background}B3`};
    color: ${({ theme }) => theme.colors.secondary};
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

export const PhotoSheetHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  margin-bottom: 24px;
  margin-top: 42px;
`;

export const PhotoSheetTitle = styled.h2`
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.typography.header2.fontWeight};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
`;

export const PhotoSheetDescription = styled.p`
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`;

export const PhotoSheetActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PhotoSheetAction = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};
    background: ${({ theme }) => theme.colors.secondaryHoverSoft};
  }
`;

export const PhotoSheetActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PhotoSheetActionCopy = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
`;

export const PhotoSheetActionTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.typography.header3.fontWeight};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
`;

export const PhotoSheetActionDescription = styled.span`
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.typography.descriptive.fontWeight};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;
