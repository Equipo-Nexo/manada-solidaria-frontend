import type { UpdatePostStatusSheetProps } from "@users/components/animal_post_status_sheet/UpdatePostStatusSheet.types";

import {
  fundraisingStatusConfig,
  canChangeFundraisingStatus,
} from "./FundraisingStatusConfig";

import type { FundraisingStatus, EditableFundraisingStatus } from "./FundraisingStatusConfig";

interface FundraisingStatusLogicParams {
  status: FundraisingStatus;
  onChangeStatus: (status: EditableFundraisingStatus) => void | Promise<void>;
  onClose: () => void;
}

const confirmationConfig = {
  FINISHED: {
    title: "¿Finalizar la colecta?",
    description:
      "La colecta se cerrará definitivamente y no podrás volver a cambiar su estado.",
    primaryLabel: "Sí, finalizar",
    secondaryLabel: "No, volver",
  },
  COMPLETED: {
    title: "¿Completar la colecta?",
    description:
      "Se indicará que se alcanzó el objetivo de la colecta y se cerrará definitivamente. No podrás volver a cambiar su estado.",
    primaryLabel: "Sí, completar",
    secondaryLabel: "No, volver",
  },
} as const;

export function FundraisingStatusLogic({
  status,
  onChangeStatus,
  onClose,
}: FundraisingStatusLogicParams): UpdatePostStatusSheetProps<FundraisingStatus> {
  const targets: EditableFundraisingStatus[] = ["FINISHED", "COMPLETED"];

  const possibleStatus = targets
    .filter((target) => canChangeFundraisingStatus(status, target))
    .map((target) => {
      const confirmation = confirmationConfig[target];

      return {
        label: fundraisingStatusConfig[target].text,
        title: fundraisingStatusConfig[target].text,
        description:
          target === "FINISHED"
            ? "Finalizar la colecta"
            : "Se alcanzó el objetivo de la colecta",
        backendValue: target,
        isFinalStatus: true,
        confirmationTitle: confirmation.title,
        confirmationDescription: confirmation.description,
        primaryButton: {
          label: confirmation.primaryLabel,
          handleClick: (selectedStatus: FundraisingStatus) => {
            if (
              selectedStatus === "COMPLETED" ||
              selectedStatus === "FINISHED"
            ) {
              return onChangeStatus(selectedStatus);
            }
          },
        },
        secondaryButton: {
          label: confirmation.secondaryLabel,
          handleClick: onClose,
        },
      };
    });

  const currentStatus = fundraisingStatusConfig[status];

  return {
    bottomSheetTitle: "Cambiar estado",
    bottomSheetDescription: "¿Cuál es el estado de la colecta?",
    currentStatus: {
      label: currentStatus.text,
      color: "fontColor" in currentStatus ? currentStatus.fontColor : "",
      backendValue: status,
    },
    possibleStatus,
    onClose,
  };
}
