import { theme } from "@styles/theme";

export type FundraisingStatus = "CREATED" | "COMPLETED" | "FINISHED";

export type EditableFundraisingStatus = "COMPLETED" | "FINISHED";

export const fundraisingStatusConfig = {
  CREATED: {
    text: "En curso",
    description: "La colecta está activa.",
    backgroundColor: theme.colors.neutral,
    fontColor: theme.colors.secondary,
  },
  COMPLETED: {
    text: "Completada",
    description: "Se alcanzó el objetivo de la colecta.",
    backgroundColor: theme.colors.statusFoundBackground,
    fontColor: theme.colors.statusRewardText,
  },
  FINISHED: {
    text: "Finalizada",
    description: "La colecta terminó.",
    backgroundColor: theme.colors.statusStreetBackground,
    fontColor: theme.colors.statusCampaignFinishedText,
  },
} satisfies Record<
  FundraisingStatus,
  {
    text: string;
    description: string;
    backgroundColor: string;
    fontColor: string;
  }
>;

export const isFinalFundraisingStatus = (status: string) =>
  status === "COMPLETED" || status === "FINISHED";

export function getFundraisingStatusInfo(status: string) {
  if (!Object.hasOwn(fundraisingStatusConfig, status)) {
    return undefined;
  }

  return fundraisingStatusConfig[status as FundraisingStatus];
}

export function canChangeFundraisingStatus(
  current: string,
  target: string,
): target is EditableFundraisingStatus {
  return (
    current === "CREATED" && (target === "COMPLETED" || target === "FINISHED")
  );
}

export function hasFundraisingStatusActions(status: string) {
  return (
    canChangeFundraisingStatus(status, "COMPLETED") ||
    canChangeFundraisingStatus(status, "FINISHED")
  );
}
