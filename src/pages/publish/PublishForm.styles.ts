import styled from 'styled-components'

export const PublishFormPage = styled.section`
  width: min(100%, 560px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-self: flex-start;
`

export const PublishFormHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const PublishFormTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.typography.header1.fontFamily};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  font-style: ${({ theme }) => theme.typography.header1.fontStyle};
  font-weight: ${({ theme }) => theme.typography.header1.fontWeight};
  line-height: ${({ theme }) => theme.typography.header1.lineHeight};
`

export const PublishFormDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-style: ${({ theme }) => theme.typography.body.fontStyle};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const PublishForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-radius: 12px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.surfacePlain};
  box-shadow: 0 14px 34px rgb(89 65 55 / 12%);
`

export const PublishField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`

export const PublishInput = styled.input`
  height: 48px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;
  padding: 12px 16px;
  background: #fdf8f4;
  color: ${({ theme }) => theme.colors.darkColor};
  font: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`

export const PublishTextarea = styled.textarea`
  min-height: 112px;
  resize: vertical;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;
  padding: 12px 16px;
  background: #fdf8f4;
  color: ${({ theme }) => theme.colors.darkColor};
  font: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`

export const PublishSubmitButton = styled.button`
  height: 48px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const PhotoSheetHeader = styled.header`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 48px;
  text-align: center;
`

export const PhotoSheetTitle = styled.h2`
  margin: 0;
  color: #261813;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`

export const PhotoSheetDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-style: ${({ theme }) => theme.typography.body.fontStyle};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const PhotoSheetAction = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 20px;
  align-items: center;
  gap: 12px;
  border: 0;
  border-radius: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
  -webkit-tap-highlight-color: transparent;

  > svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.secondary};
    justify-self: end;
    stroke-width: 2.4;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const PhotoSheetActionIcon = styled.span`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2.3;
  }
`

export const PhotoSheetActionCopy = styled.span`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const PhotoSheetActionTitle = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const PhotoSheetActionDescription = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`
