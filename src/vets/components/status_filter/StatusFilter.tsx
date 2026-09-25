import { useEffect, useRef, useState } from "react";
import { BriefcaseMedical, Check, ChevronRight } from "@/common/icons";
import * as S from "./StatusFilter.styles";

export type VetStatusFilter = "ALL" | "OPEN" | "CLOSED";

type StatusFilterProps = {
  value: VetStatusFilter;
  onChange: (value: VetStatusFilter) => void;
};

function StatusFilter({ value, onChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
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

  const getSelectedContent = () => {
    switch (value) {
      case "OPEN":
        return (
          <>
            <S.StatusDot $status="open" />
            <span>Abierto</span>
          </>
        );

      case "CLOSED":
        return (
          <>
            <S.StatusDot $status="closed" />
            <span>Cerrado</span>
          </>
        );

      default:
        return (
          <>
            <BriefcaseMedical aria-hidden="true" />
            <span>Todas las veterinarias</span>
          </>
        );
    }
  };

  return (
    <S.FilterWrapper ref={filterRef}>
      <S.FilterButton
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <S.SelectedContent>{getSelectedContent()}</S.SelectedContent>

        <S.ChevronWrapper>
          <ChevronRight aria-hidden="true" />
        </S.ChevronWrapper>
      </S.FilterButton>

      {isOpen && (
        <S.Menu role="listbox">
          <S.Option
            type="button"
            role="option"
            aria-selected={value === "ALL"}
            $selected={value === "ALL"}
            onClick={() => handleSelect("ALL")}
          >
            <S.OptionContent>
              <BriefcaseMedical aria-hidden="true" />
              <span>Todas las veterinarias</span>
            </S.OptionContent>

            {value === "ALL" && <Check aria-hidden="true" />}
          </S.Option>

          <S.Option
            type="button"
            role="option"
            aria-selected={value === "OPEN"}
            $selected={value === "OPEN"}
            onClick={() => handleSelect("OPEN")}
          >
            <S.OptionContent>
              <S.StatusDot $status="open" />
              <span>Abierto</span>
            </S.OptionContent>

            {value === "OPEN" && <Check aria-hidden="true" />}
          </S.Option>

          <S.Option
            type="button"
            role="option"
            aria-selected={value === "CLOSED"}
            $selected={value === "CLOSED"}
            onClick={() => handleSelect("CLOSED")}
          >
            <S.OptionContent>
              <S.StatusDot $status="closed" />
              <span>Cerrado</span>
            </S.OptionContent>

            {value === "CLOSED" && <Check aria-hidden="true" />}
          </S.Option>
        </S.Menu>
      )}
    </S.FilterWrapper>
  );
}

export default StatusFilter;
