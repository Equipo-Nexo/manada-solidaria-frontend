import styled, { css } from 'styled-components';
import { ChevronDown } from '@/common/icons';
import { fieldFocusVisible, focusVisible } from '@styles/interactions';

const questionFieldTypography = css`
  ${({ theme }) => theme.typography.body};
  @media (max-width: 1024px) {
    font-size: ${({ theme }) => theme.typography.body.fontSize} !important;
  }
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    @media (min-width: 1024px) {
      max-width: 1280px;
      margin: 0 auto;
    }
`
export const QueryState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: min(100%, 380px);
  margin: 0 auto;
  padding: 24px 0;
`;

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

export const BackButton = styled.button`
  width: 48px;
  height: 48px;
  display: inline-flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  svg {
    width: 48px;
    height: 48px;
  }
  ${focusVisible}
`;

export const TitlesContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  white-space: nowrap;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

export const SecondaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr);
    column-gap: 20px;
    row-gap: 4px;
    width: fit-content;
    margin: 0 auto 28px;
    text-align: left;
  }
`

export const AppLogo = styled.img`
  margin-top: 2rem;
  width: 10rem;
  height: auto;
  @media (min-width: 768px) {
    width: 7.5rem;
    margin-top: 1rem;
  }
  @media (max-width: 1300px) and (max-height: 720px) {
    width: 6rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 850px) {
    width: 5rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    width: 7rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    width: 3rem;
    margin-top: 0.5rem;
  }
  @media (min-width: 1024px) {
    grid-column: 1;
    grid-row: 1 / 3;
    width: 80px;
    margin-top: 0;
  }
`;

export const LogoSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
  margin-bottom: 16px;
  @media (max-width: 767px) and (max-height: 650px) {
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize} !important;
  }
  @media (min-width: 1024px) {
    grid-column: 2;
    grid-row: 1;
    align-self: end;
    margin-bottom: 0;
  }
`;


export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: 16px;
  @media (min-width: 1024px) {
    grid-column: 2;
    grid-row: 2;
    align-self: start;
    margin-bottom: 0;
    text-align: left;
    ${({ theme }) => theme.typography.header1};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: 32px;
  }
`

export const CategoryContainer = styled.div`
   width: min(100%, 380px);
  min-width: 0;
  @media (min-width: 1024px) {
    width: 100%;
    padding: 24px;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow:
      0 2px 6px ${({ theme }) => `${theme.colors.darkColor}0A`},
      0 12px 32px ${({ theme }) => `${theme.colors.darkColor}1A`};
  }
`
export const FormActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: min(100%, 380px);
  margin-top: 16px;
  margin-bottom: 32px;
  @media (min-width: 1024px) {
    grid-column: 1 / -1;
    justify-self: center;
    width: min(100%, 560px);
    gap: 24px;
    margin-top: 8px;
  }
`;

export const ActionButton = styled.button<{ $variant: 'cancel' | 'submit' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 56px;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme, $variant }) => $variant === 'cancel' ? theme.colors.neutral : theme.colors.brand};
  color: ${({ theme, $variant }) => $variant === 'cancel' ? theme.colors.brand : theme.colors.neutral};
  ${({ theme }) => theme.typography.action};
  cursor: pointer;
  ${focusVisible}

  &:focus-visible {
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const CategoryTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  margin-bottom: 8px;
  @media (min-width: 1024px) {
    ${({ theme }) => theme.typography.header2};
  }
`
export const CategoryDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
  text-align: left;
  margin-bottom: 16px;
`
export const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Question = styled.div`
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    align-items: start;
    column-gap: 12px;
`
export const QuestionContent = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
    text-align: left;
    gap: 4px;
`
export const QuestionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  svg {
    display: block;
    width: 24px;
    height: 24px;
  }

    svg [fill]:not([fill='none']) {
        fill: currentColor;
    }

    svg [stroke]:not([stroke='none']) {
        stroke: currentColor;
    }
`
export const QuestionLabel = styled.label`
  width: 100%;
  min-width: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`
export const QuestionInput = styled.input`
  width: 100%;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.darkColorMuted};
    border-radius: 4px;
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
    line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
    ${fieldFocusVisible}
`
export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.brand};
`;



export const TextArea = styled.textarea`
  display: flex;
height: 95px;
padding: 16px;
justify-content: center;
align-items: flex-start;
flex-shrink: 0;
align-self: stretch;
border-radius: 12px;
border: 2px solid var(--Stroke, #E1BFB2);

  width: 100%;
  height:120px
;
  ${questionFieldTypography}
  color: ${({ theme }) => theme.colors.darkColor};
  ${fieldFocusVisible}

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    opacity: 1;
  }
    
`
export const SelectorContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`;

export const Selector = styled.select<{ $hasValue: boolean }>`
  appearance: none;
  display: block;
  width: 100%;
  min-width: 0;
  height: 56px;
  padding: 0 56px 0 24px;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  background: ${({ theme }) => `${theme.colors.background}`};
  color: ${({ theme, $hasValue }) => $hasValue ? theme.colors.darkColor : theme.colors.darkColorMuted};
  ${questionFieldTypography}
  cursor: pointer;

  option {
    color: ${({ theme }) => theme.colors.darkColor};
    background: ${({ theme }) => theme.colors.background};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }

  ${fieldFocusVisible}
`;

export const SelectorArrow = styled(ChevronDown)`
  position: absolute;
  top: 50%;
  right: 24px;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondary};
  pointer-events: none;
`;

