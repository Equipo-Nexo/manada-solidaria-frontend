import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as S from "./BottomSheet.styles";
import X from "../../icons/X";

type BottomSheetProps = {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  ariaLabel?: string;
  onClose: () => void;
};

function BottomSheet({
  className,
  children,
  isOpen,
  ariaLabel,
  onClose,
}: BottomSheetProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <S.BottomSheetBackdrop onClick={onClose}>
      <S.BottomSheetPanel
        className={className}
        aria-label={ariaLabel}
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <S.BottomSheetHandle aria-hidden="true" />
        <S.BottomSheetContent>
          <S.BottomSheetCloseButtonContainer>
            <S.BottomSheetCloseButton
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
            >
              <X aria-hidden="true" />
            </S.BottomSheetCloseButton>
          </S.BottomSheetCloseButtonContainer>
          {children}
        </S.BottomSheetContent>
      </S.BottomSheetPanel>
    </S.BottomSheetBackdrop>,
    document.body,
  );
}

export default BottomSheet;
