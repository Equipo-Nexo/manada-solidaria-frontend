import type { CampaignStatus } from "@campaigns/app/types/Campaign.types";
import type { UpdateCampaignStatusRequest } from "@campaigns/app/api/requests/UpdateCampaignStatusRequest";
import { theme } from "@styles/theme";

export const isFinalCampaignStatus = (status: string) =>
  ["FINISHED", "CANCELLED", "COMPLETED"].includes(status);

export const campaignStatusConfig = {
  COMPLETED: {
    text: "Completada",
    description: "Se alcanzó el objetivo de la campaña",
    backgroundColor: theme.colors.statusFoundBackground,
    fontColor: theme.colors.statusRewardText,
  },
  CREATED: {
    text: "Pendiente",
    description: "La campaña todavía no comenzó.",
    backgroundColor: theme.colors.tertiary,
    fontColor: theme.colors.statusCampaignPendingText,
  },
  STARTED: {
    text: "En curso",
    description: "La campaña está activa.",
    backgroundColor: theme.colors.neutral,
    fontColor: theme.colors.secondary,
  },
  FINISHED: {
    text: "Finalizada",
    description: "La campaña terminó.",
    backgroundColor: theme.colors.statusStreetBackground,
    fontColor: theme.colors.statusCampaignFinishedText,
  },
  CANCELLED: {
    text: "Cancelada",
    description: "La campaña no se realizará.",
    backgroundColor: theme.colors.statusLostBackground,
    fontColor: theme.colors.statusSearchingtext,
  },
} satisfies Record<
  CampaignStatus,
  {
    text: string;
    description: string;
    backgroundColor: string;
    fontColor: string;
  }
>;

export const isNewsCampaign = (type?: string) =>
  ["NEWS", "VACCINATION", "CASTRATION", "DEWORMING", "OTHER"].includes(
    type?.toUpperCase() ?? "",
  );

export const isDonationCampaign = (type?: string) =>
  type?.toUpperCase() === "DONATION";

export const campaignTypeLabels: Record<string, string> = {
  DONATION: "Campaña de donación",
  VACCINATION: "Campaña de vacunación",
  CASTRATION: "Campaña de castración",
  DEWORMING: "Campaña de desparasitación",
  OTHER: "Campaña solidaria",
};
export const getCampaignTypeLabel = (type?: string) =>
  campaignTypeLabels[type?.toUpperCase() ?? ""] ?? "Campaña";

export function getCampaignStatusInfo(status: string, type?: string) {
  if (
    (!isNewsCampaign(type) && !isDonationCampaign(type)) ||
    !Object.hasOwn(campaignStatusConfig, status)
  )
    return undefined;
  if (isDonationCampaign(type) && status === "CREATED")
    return campaignStatusConfig.STARTED;
  return campaignStatusConfig[status as CampaignStatus];
}

export function canChangeCampaignStatus(
  current: string,
  target: string,
  type?: string,
): target is UpdateCampaignStatusRequest["status"] {
  if (isDonationCampaign(type))
    return (
      current === "CREATED" && (target === "COMPLETED" || target === "FINISHED")
    );
  return (
    isNewsCampaign(type) && current === "STARTED" && target === "CANCELLED"
  );
}

export function hasCampaignStatusActions(current: string, type?: string) {
  return (
    canChangeCampaignStatus(current, "CANCELLED", type) ||
    canChangeCampaignStatus(current, "COMPLETED", type)
  );
}
