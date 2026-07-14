import styled from "styled-components";

export const ImageUploadButton = styled.button`
  width: 100%;
  min-height: 154px;
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
