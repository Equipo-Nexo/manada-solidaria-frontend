import styled from "styled-components";
import { fieldFocusVisible, focusVisible } from "../../styles/interactions";

export const PublishFormPage = styled.section`
  width: min(100%, 560px);
  min-height: 100svh;
  margin: 0 auto;
  padding: 16px;
  color: ${({ theme }) => theme.colors.darkColor};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;

  @media (min-width: 600px) {
    padding: 28px 24px 48px;
  }
`;
export const PublishFormHeader = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 16px;
`;
export const PublishBackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover {
    opacity: 0.8;
  }
`;
export const PublishFormTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
`;
export const PublishLabel = styled.label`
  color: ${({ theme }) => theme.colors.black};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
`;

export const PublishForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.colors.background};
`;

export const PublishField = styled.div<{
  $hidden?: boolean;
}>`
  display: ${({ $hidden }) => ($hidden ? "none" : "flex")};
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.black};

  > [role='alert'] {
    margin-top: 12px;
  }
`;

export const PublishInput = styled.input`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 13px 18px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    opacity: 1;
  }

  ${fieldFocusVisible}
`;

export const PublishTextarea = styled.textarea`
  min-height: 155px;
  resize: vertical;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 14px 18px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: 24px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    opacity: 1;
  }
  ${fieldFocusVisible}
`;

export const PublishSubmitButton = styled.button`
  width: 100%;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  ${focusVisible}
`;

export const RequiredMark = styled.span<{
  $hidden?: boolean;
}>`
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
  color: ${({ theme }) => theme.colors.brand};
`;

export const CategoryOptions = styled.div`
  min-height: 156px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 12px 22px;
`;
export const CategoryOption = styled.button<{ $isSelected: boolean }>`
  height: 44px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 2px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.secondary : theme.colors.stroke};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.secondary : theme.colors.background};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.background : theme.colors.black};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: ${({ $isSelected, theme }) =>
    $isSelected
      ? `0 4px 6px -1px ${theme.colors.black}1a,
         0 2px 4px -2px ${theme.colors.black}1a`
      : "none"};
  ${focusVisible}
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.secondary : theme.colors.secondaryHoverSoft};
  }
`;

export const TwoColumnFields = styled.div<{
  $hidden?: boolean;
}>`
  display: ${({ $hidden }) => ($hidden ? "none" : "grid")};
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
`;

export const InputWithIcon = styled.div`
  position: relative;
`;

export const IconInput = styled(PublishInput)<{
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
}>`
  height: 56px;
  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "50px" : "18px")};
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? "50px" : "18px")};
`;

export const FieldIcon = styled.span<{
  $position?: "left" | "right";
}>`
  position: absolute;
  top: 50%;
  ${({ $position }) => ($position === "right" ? "right: 16px;" : "left: 18px;")}
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.darkColor};
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const HelpText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.typography.descriptive.fontWeight};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

export const PhoneFields = styled.div`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 8px;
`;
export const DonationNeeds = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: none;
  padding: 0;
  margin: 0;
  min-inline-size: 0;
`;

export const DonationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 48px;
  row-gap: 24px;
`;
export const DonationOption = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
  }
`;
export const DonationCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  appearance: none;

  width: 20px;
  height: 20px;

  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.background};

  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  &:checked::after {
    content: "✓";
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.background};
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    height: 100%;
  }

  ${focusVisible}
`;
export const MapPreview = styled.div`
  height: 201px;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  background:
    linear-gradient(
      35deg,
      transparent 48%,
      ${({ theme }) => theme.colors.stroke} 49% 51%,
      transparent 52%
    ),
    linear-gradient(
      145deg,
      transparent 46%,
      ${({ theme }) => theme.colors.secondary} 47% 49%,
      transparent 50%
    ),
    linear-gradient(
      8deg,
      transparent 48%,
      ${({ theme }) => theme.colors.stroke} 49% 51%,
      transparent 52%
    ),
    ${({ theme }) => theme.colors.neutral};
  opacity: 0.86;
`;

export const UploadHint = styled.span`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

