import { useEffect } from "react";

const AUTO_ADVANCE_DURATION = 5000;

type UseAutoAdvanceProps = {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
};

export const useAutoAdvance = ({
  currentIndex,
  totalItems,
  onNext,
}: UseAutoAdvanceProps) => {
  useEffect(() => {
    if (totalItems <= 1) return;

    const timer = setTimeout(() => {
      onNext();
    }, AUTO_ADVANCE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, totalItems, onNext]);
};
