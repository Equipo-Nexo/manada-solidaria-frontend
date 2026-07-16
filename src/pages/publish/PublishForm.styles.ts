import styled from "styled-components";

export const PublishFormPage = styled.section`
  width: min(100%, 390px);
  display: flex;
  flex-direction: column;
  gap: 0;
  align-self: flex-start;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  text-align: left;

  @media (max-width: 480px) {
    width: calc(100% + 36px);
    margin: -24px -18px -96px;
    padding-bottom: 96px;
  }
`;
export const ErrorMessage = styled.span`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
`;
export const PublishFormHeader = styled.header`
  min-height: 60px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => `0 1px 2px ${theme.colors.black}0d`};
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
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header1.lineHeight};
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
  padding: 24px 16px 42px;
  background: ${({ theme }) => theme.colors.background};
`;

export const PublishField = styled.div<{
  $hidden?: boolean;
}>`
  display: ${({ $hidden }) => ($hidden ? "none" : "flex")};
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.black};
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
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
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
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
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

  &::after {
    content: ">";
    font-size: 20px;
    line-height: 1;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;

export const RequiredMark = styled.span`
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

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

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
`;
export const MapPreview = styled.div`
  height: 201px;
  position: relative;
  overflow: hidden;
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

export const MapPin = styled.span`
  width: 24px;
  height: 30px;
  position: absolute;
  top: 82px;
  left: 50%;
  border-radius: 50% 50% 50% 0;
  background: ${({ theme }) => theme.colors.error};
  transform: translateX(-50%) rotate(-45deg);

  &::after {
    width: 6px;
    height: 6px;
    content: "";
    position: absolute;
    top: 9px;
    left: 9px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const LocateButton = styled.button`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 16px;
  bottom: 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  box-shadow: ${({ theme }) =>
    `0 4px 6px -1px ${theme.colors.black}1a, 0 2px 4px -2px ${theme.colors.black}1a`};
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 999px;
  }

  &::before {
    width: 16px;
    height: 16px;
    top: 7px;
    left: 7px;
    border: 2px solid currentColor;
  }

  &::after {
    width: 6px;
    height: 6px;
    top: 12px;
    left: 12px;
    background: currentColor;
    box-shadow:
      0 -8px 0 -2px currentColor,
      0 8px 0 -2px currentColor,
      -8px 0 0 -2px currentColor,
      8px 0 0 -2px currentColor;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;

export const UploadHint = styled.span`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

export const AdvisoryCard = styled.aside`
  display: grid;
  text-align: left;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 24px;
  border-radius: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.neutral};
`;

export const AdvisoryIcon = styled.span`
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
`;

export const AdvisoryContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AdvisoryTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
`;

export const AdvisoryText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: 26px;
`;
