import styled from "styled-components";

export const Card = styled.article`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
  @media (min-width: 48rem) {
    width: min(100%, 32rem);
  }
`;

export const Details = styled.div`
  display: flex;
  min-width: 0;
  gap: 0.5rem;
`;

export const ImageWrapper = styled.div`
  width: 5.9rem;
  height: 4.9rem;
  flex: 0 0 5.9rem;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.0625rem 0.0625rem 0.25rem rgb(0 0 0 / 25%);
  @media (min-width: 48rem) {
    width: 7.25rem;
    height: 6rem;
    flex-basis: 7.25rem;
  }
  @media (max-width: 22.5rem) {
    width: 4.25rem;
    height: 4.25rem;
    flex-basis: 4.25rem;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.neutral};
`;

export const Information = styled.div`
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.06rem;
`;

const TruncatedText = styled.p`
  width: 100%;
  margin: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Name = styled(TruncatedText).attrs({ as: "h3" })`
  font-family: ${({ theme }) => theme.typography.header3.fontFamily};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25rem;
  letter-spacing: -0.0125rem;
`;

export const Address = styled(TruncatedText)`
  overflow: visible;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.25rem;
  letter-spacing: -0.0125rem;
  text-overflow: clip;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export const TodayHours = styled(Address)`
  flex: 1;
  line-height: 1.125rem;

  @media (max-width: 22.5rem) {
    font-size: 0.8125rem;
    letter-spacing: -0.025rem;
  }
`;

export const ContactButton = styled.button`
  display: flex;
  flex: 1;
  min-width: 0;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  &:focus-visible,
  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
  }
  &:focus-visible {
    outline: 0.1875rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.125rem;
  }
  @media (max-width: 22.5rem) {
    width: 100%;
    gap: 0.5rem;
  }
`;

export const ScheduleButton = styled.button`
  width: 100%;
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.625rem;
  border: 0;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25rem;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
  &:focus-visible {
    outline: 0.1875rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.125rem;
  }
`;

export const ScheduleIcon = styled.span<{ $isOpen: boolean }>`
  display: inline-flex;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "90deg" : "0deg")});
  transition: transform 160ms ease;
`;

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.5rem 0 0.875rem;
  padding-top: 0.625rem;
  border-top: 1px solid ${({ theme }) => theme.colors.stroke};
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
`;

export const ScheduleRow = styled.div<{ $isToday: boolean }>`
  display: grid;
  grid-template-columns: 6.25rem minmax(0, 1fr);
  align-items: center;
  min-height: 2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;

  background: ${({ $isToday, theme }) =>
    $isToday ? theme.colors.neutral : "transparent"};
`;

export const DayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const DayName = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const TodayLabel = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const DayHours = styled.span`
  min-width: 0;
  color: ${({ theme }) => theme.colors.black};
  text-align: right;
  white-space: nowrap;
`;
export const Description = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.25rem;
`;
export const Actions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;
export const IconButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
