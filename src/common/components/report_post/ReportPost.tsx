import { useState, type ReactNode } from "react";
import { useCreateReportMutation } from "@common/app/services/apis/reportsApi";
import type { ReportPostType } from "@common/app/types/Report.types";
import * as S from "./ReportPost.styles";
import { Warning } from "@/common/icons";
import { createPortal } from "react-dom";
import { useToast } from "@/common/hooks/toast/useToast";

type ReportPostProps = {
  postId: string;
  type: ReportPostType;
  renderTrigger?: (openReport: () => void, disabled: boolean) => ReactNode;
};

function ReportPost({ postId, type, renderTrigger }: ReportPostProps) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [createReport, { isLoading }] = useCreateReportMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [reported, setReported] = useState(false);

  const handleReport = async () => {
    try {
      await createReport({ postId, type }).unwrap();
      toast.success(
        "Reporte enviado correctamente. Gracias por tu colaboración.",
      );
      setReported(true);
      setMessage("Tu reporte se registró correctamente.");
      setIsOpen(false);
    } catch (error) {
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? error.status
          : undefined;

      switch (status) {
        case 400:
          setMessage("No podés reportar tu propia publicación.");
          break;
        case 401:
          setMessage("Tu sesión expiró. Iniciá sesión nuevamente.");
          break;
        case 404:
          setMessage("Esta publicación ya no está disponible.");
          break;
        case 409:
          setReported(true);
          setMessage("Ya reportaste esta publicación anteriormente.");
          setIsOpen(false);
          break;
        default:
          setMessage("No pudimos registrar el reporte. Intentá nuevamente.");
      }
    }
  };
  const openReport = () => {
    setMessage(null);
    setIsOpen(true);
  };
  return (
    <>
      {renderTrigger ? (
        renderTrigger(openReport, reported || isLoading)
      ) : (
        <S.ReportButton
          type="button"
          onClick={openReport}
          disabled={reported || isLoading}
        >
          <Warning aria-hidden="true" />
          {reported ? "Reportado" : "Reportar publicación"}
        </S.ReportButton>
      )}

      {isOpen &&
        createPortal(
          <S.Overlay
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isLoading) {
                setIsOpen(false);
              }
            }}
          >
            <S.Dialog
              role="dialog"
              aria-modal="true"
              aria-labelledby="report-title"
              aria-describedby="report-description"
            >
              <S.Title id="report-title">
                ¿Querés reportar esta publicación?
              </S.Title>

              <S.Description id="report-description">
                Si considerás que esta publicación incumple las normas de la
                comunidad, podés enviarnos un reporte para su revisión.
              </S.Description>

              {message && (
                <S.ErrorMessage role="alert">{message}</S.ErrorMessage>
              )}

              <S.Actions>
                <S.CancelButton
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </S.CancelButton>

                <S.ConfirmButton
                  type="button"
                  onClick={handleReport}
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar reporte"}
                </S.ConfirmButton>
              </S.Actions>
            </S.Dialog>
          </S.Overlay>,
          document.body,
        )}
      {!isOpen && message && <S.Feedback role="status">{message}</S.Feedback>}
    </>
  );
}

export default ReportPost;
