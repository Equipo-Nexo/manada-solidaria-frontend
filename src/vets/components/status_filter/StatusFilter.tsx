import { useEffect, useRef, useState } from "react";
import { BriefcaseMedical, Check, ChevronRight } from "@/common/icons";
import * as S from "./StatusFilter.styles";

export type VetStatusFilter = "ALL" | "OPEN" | "CLOSED";

type StatusFilterProps = {
  value: VetStatusFilter;
  onChange: (value: VetStatusFilter) => void;
};

const statusOptions: {
  value: VetStatusFilter;
  label: string;
  status?: "open" | "closed";
}[] = [
  {
    value: "ALL",
    label: "Todas las veterinarias",
  },
  {
    value: "OPEN",
    label: "Abierto",
    status: "open",
  },
  {
    value: "CLOSED",
    label: "Cerrado",
    status: "closed",
  },
];

function StatusFilter({ value, onChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const selectedOption = statusOptions.find(
    (option) => option.value === value,
  )!;

  const handleSelect = (newValue: VetStatusFilter) => {
    onChange(newValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderOptionIcon = (option: (typeof statusOptions)[number]) => {
    if (option.status) {
      return <S.StatusDot $status={option.status} />;
    }

    return <BriefcaseMedical aria-hidden="true" />;
  };

  return (
    <S.FilterWrapper ref={filterRef}>
      <S.FilterButton
        type="button"
        $active={value !== "ALL"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <S.SelectedContent>
          {renderOptionIcon(selectedOption)}
          <span>{selectedOption.label}</span>
        </S.SelectedContent>

        <S.ChevronWrapper>
          <ChevronRight aria-hidden="true" />
        </S.ChevronWrapper>
      </S.FilterButton>

      {isOpen && (
        <S.Menu>
          {statusOptions.map((option) => {
            const isSelected = value === option.value;

            return (
              <S.MenuItem key={option.value}>
                <S.Option
                  type="button"
                  aria-pressed={isSelected}
                  $selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                >
                  <S.OptionContent>
                    {renderOptionIcon(option)}
                    <span>{option.label}</span>
                  </S.OptionContent>

                  {isSelected && <Check aria-hidden="true" />}
                </S.Option>
              </S.MenuItem>
            );
          })}
        </S.Menu>
      )}
    </S.FilterWrapper>
  );
}

export default StatusFilter;
