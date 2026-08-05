import { useEffect, useRef, useState } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Calendar from "../../icons/Calendar";
import * as S from "./DatePicker.styles";

type Props<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = {
  control: Control<TFieldValues, TContext, TTransformedValues>;
  name: Path<TFieldValues>;
};

type CalendarDateElement = HTMLElement & {
  value: string;
};

function formatDisplayDate(value: unknown) {
  if (typeof value !== "string" || !value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function DatePicker<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({ control, name }: Props<TFieldValues, TContext, TTransformedValues>) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<CalendarDateElement>(null);
  const { field } = useController({
    control,
    name,
  });

  useEffect(() => {
    if (!isOpen) return;

    const calendar = calendarRef.current;
    if (!calendar) return;

    const handleChange = () => {
      field.onChange(calendar.value);
      setIsOpen(false);
    };

    calendar.addEventListener("change", handleChange);
    return () => {
      calendar.removeEventListener("change", handleChange);
    };
  }, [field, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || wrapper.contains(event.target as Node)) return;

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.InputWithIcon onClick={() => setIsOpen(true)}>
        <S.IconInput
          readOnly
          value={formatDisplayDate(field.value)}
          placeholder="dd/mm/yyyy"
          $hasRightIcon
        />

        <S.CalendarButton
          type="button"
          aria-label="Abrir calendario"
          aria-expanded={isOpen}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen((current) => !current);
          }}
        >
          <Calendar />
        </S.CalendarButton>
      </S.InputWithIcon>

      {isOpen && (
        <S.CalendarContainer>
          <S.CallyStyles />
          <calendar-date
            ref={calendarRef}
            className="cally"
            value={field.value ?? ""}
          >
            <S.PreviousIcon slot="previous" aria-label="Anterior" />
            <S.NextIcon slot="next" aria-label="Siguiente" />
            <calendar-month />
          </calendar-date>
        </S.CalendarContainer>
      )}
    </S.Wrapper>
  );
}
export default DatePicker;
