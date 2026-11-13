import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { PawPrint, X } from "@icons/index";
import { termsAndConditions } from "@auth/utils/termsAndConditions";
import * as S from "./TermsAndConditions.styles";

type TermsAndConditionsProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
};

function TermsAndConditions({
  isOpen,
  onClose,
  onAccept,
}: TermsAndConditionsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    contentRef.current?.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <S.Dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <S.Header>
        <S.Title id={titleId}>Términos y Condiciones</S.Title>
        <S.CloseButton
          type="button"
          aria-label="Cerrar términos y condiciones"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </S.CloseButton>
      </S.Header>

      <S.ScrollContent
        ref={contentRef}
        tabIndex={0}
        role="region"
        aria-label="Texto de los términos y condiciones"
      >
        <S.Introduction>
          <S.PawBadge aria-hidden="true">
            <PawPrint />
          </S.PawBadge>
          <S.DocumentTitle>{termsAndConditions.title}</S.DocumentTitle>
          <S.UpdatedAt>{termsAndConditions.updatedAt}</S.UpdatedAt>
        </S.Introduction>
        <p>{termsAndConditions.introduction}</p>
        {termsAndConditions.sections.map((section) => (
          <S.Section key={section.title}>
            <S.SectionTitle>{section.title}</S.SectionTitle>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.closingParagraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </S.Section>
        ))}
      </S.ScrollContent>

      <S.Footer>
        <S.AcceptButton type="button" onClick={onAccept}>
          Aceptar y continuar
          <PawPrint width={20} height={19} aria-hidden="true" />
        </S.AcceptButton>
      </S.Footer>
    </S.Dialog>,
    document.body,
  );
}

export default TermsAndConditions;
