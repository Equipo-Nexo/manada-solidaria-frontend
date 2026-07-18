import ChevronRight from "../icons/ChevronRight";
import styled from "styled-components";
import {
  InputWithIcon,
  IconInput,
  FieldIcon,
} from "../../pages/publish/PublishForm.styles";
import { createGlobalStyle } from "styled-components";

export const CallyStyles = createGlobalStyle`
  calendar-date::part(button) {
    border: none;
    background: transparent;
    box-shadow: none;
    cursor: pointer;
  }

  calendar-date::part(button):hover {
    background: ${({ theme }) => theme.colors.focus};
    border-radius: 8px;
  }

  calendar-month::part(day selected) {
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
    border-radius: 10px;
  }
  calendar-month::part(day):hover {
    border-radius: 10px;
  }
`;
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const CalendarContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 9999;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  padding: 12px;
`;

export const CalendarButton = styled.button`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  border: 1px solid ${({ theme }) => theme.colors.background};

  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PreviousIcon = styled(ChevronRight)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  rotate: 180deg;
  padding: 4px;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const NextIcon = styled(ChevronRight)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  padding: 4px;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
export { InputWithIcon, IconInput, FieldIcon };
