import styled from "styled-components";

type VariantProps = {
  $isActive: boolean;
};

export const Wrapper = styled.div`
  width: 100%;
  min-width: 0;

  @media (min-width: 750px) {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Card = styled.article<VariantProps>`
  width: 100%;
  min-width: 0;
  min-height: 172px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${({ $isActive }) =>
    $isActive ? "21px 16px 10px" : "11px 16px 10px"};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow:
    1px 1px 4px rgb(0 0 0 / 25%),
    inset 1px 1px 4px rgb(0 0 0 / 25%);
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};

  @media (min-width: 750px) {
    position: relative;
    width: auto;
    height: 125px;
    min-height: 125px;
    flex: 546 1 0;
    padding: 17px 36px 18px 96px;
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;

  @media (min-width: 750px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 9px;
  }
`;

export const Title = styled.h3`
  max-width: 150px;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.header3.fontFamily};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-align: left;

  @media (min-width: 750px) {
    max-width: 440px;
    font-size: 20px;
    line-height: 20px;
  }
`;

export const StatusBadge = styled.span<VariantProps>`
  min-width: 154px;
  min-height: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;

  @media (min-width: 750px) {
    width: 240px;
    min-height: 19px;
    align-self: flex-start;
    justify-content: flex-start;
    padding: 0 10px 0 12px;
    line-height: 19px;
  }
`;

export const StatusDot = styled.span<VariantProps>`
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 999px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.success : theme.colors.error};
`;

export const DescriptionRow = styled.div<VariantProps>`
  display: flex;
  align-items: center;
  text-align: left;
  gap: 7px;
  min-height: ${({ $isActive }) => ($isActive ? "30px" : "15px")};
  margin-top: ${({ $isActive }) => ($isActive ? "7px" : "13px")};
  padding-left: ${({ $isActive }) => ($isActive ? "2px" : "0")};

  > svg {
    display: ${({ $isActive }) => ($isActive ? "block" : "none")};
  }

  @media (min-width: 750px) {
    min-height: 30px;
    margin-top: 9px;
    padding-left: 0;

    > svg {
      display: block;
      position: absolute;
      left: 22px;
      top: 38px;
      width: 50px;
      height: 52px;
    }
  }
`;

export const Description = styled.p`
  max-width: 270px;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 18px;

  @media (min-width: 750px) {
    max-width: 424px;
    font-size: 14px;
    line-height: 20px;
  }
`;
type ActionButtonProps = VariantProps & {
  $desktop?: boolean;
};

export const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  border: 0;
  border-radius: 12px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.error : theme.colors.neutral};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background : theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.action.fontFamily};
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.action.lineHeight};
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
  }

  &:active {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (min-width: 750px) {
    display: ${({ $desktop }) => ($desktop ? "inline-flex" : "none")};
  }
`;

export const MobileOnly = styled.span`
  @media (min-width: 750px) {
    display: none;
  }
`;

export const DesktopOnly = styled.span`
  display: none;

  @media (min-width: 750px) {
    display: inline;
  }
`;

export const DesktopContactCard = styled.div`
  display: none;

  @media (min-width: 750px) {
    width: auto;
    min-width: 0;
    height: 125px;
    display: flex;
    flex: 361 1 0;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 19px 7px 13px 21px;
    border: 0;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow:
      1px 1px 4px rgb(0 0 0 / 25%),
      inset 1px 1px 4px rgb(0 0 0 / 25%);
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.body};
    text-align: left;
  }
`;

export const ContactTitle = styled.span`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
`;

export const ContactPhoneRow = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 100%;
  margin-top: 12px;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const ContactPhone = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
`;

export const ContactReminderRow = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  margin-top: 6px;
`;

export const ContactReminder = styled.span`
  flex: 1;
  min-width: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 18px;
`;
