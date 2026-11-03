import type { GetUserPostsResponse } from "@services/responses/userResponses";
import type { UpdateCampaignStatusRequest } from "@campaigns/app/api/requests/UpdateCampaignStatusRequest";
import type { UpdatePostStatusSheetProps } from "@/users/components/animal_post_status_sheet/UpdatePostStatusSheet.types";

import {
  canChangeCampaignStatus,
  campaignStatusConfig,
  getCampaignStatusInfo,
  isDonationCampaign,
} from "./CampaignStatusConfig";

type CampaignStatus = UpdateCampaignStatusRequest["status"];

interface CampaignStatusLogicParams {
  post: GetUserPostsResponse;
  onChangeStatus: (status: CampaignStatus) => void | Promise<void>;
  onClose: () => void;
}

const confirmationConfig = {
  COMPLETED: {
    title: "¿Completar la donación?",
    description:
      "Se indicará que se logró recaudar lo necesario y la donación se cerrará definitivamente. No podrás volver a cambiar su estado.",
    primaryLabel: "Sí, completar",
    secondaryLabel: "No, volver",
  },
  FINISHED: {
    title: "¿Finalizar la donación?",
    description:
      "La donación se cerrará definitivamente y no podrás volver a cambiar su estado.",
    primaryLabel: "Sí, finalizar",
    secondaryLabel: "No, volver",
  },
  CANCELLED: {
    title: "Cancelar campaña",
    description:
      "La campaña se cancelará definitivamente y dejará de estar activa. Esta acción no se puede deshacer.",
    primaryLabel: "Sí, cancelar",
    secondaryLabel: "No, volver",
  },
} satisfies Record<
  CampaignStatus,
  {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  }
>;

export function CampaignStatusLogic({
  post,
  onChangeStatus,
  onClose,
}: CampaignStatusLogicParams): UpdatePostStatusSheetProps<CampaignStatus> {
  const donation = isDonationCampaign(post.type);

  const targets: CampaignStatus[] = donation
    ? ["FINISHED", "COMPLETED"]
    : ["CANCELLED"];

  const possibleStatus = targets
    .filter(
      (status) =>
        post.postType === "campaign" &&
        canChangeCampaignStatus(post.status, status, post.type),
    )
    .map((status) => {
      const confirmation = confirmationConfig[status];

      return {
        label: campaignStatusConfig[status].text,
        title: campaignStatusConfig[status].text,
        description:
          status === "FINISHED"
            ? "Finalizar la campaña"
            : status === "COMPLETED"
              ? "Se alcanzó el objetivo de la campaña"
              : "Cancelar la campaña",
        backendValue: status,
        isFinalStatus: true,
        confirmationTitle: confirmation.title,
        confirmationDescription: confirmation.description,
        primaryButton: {
          label: confirmation.primaryLabel,
          handleClick: onChangeStatus,
        },
        secondaryButton: {
          label: confirmation.secondaryLabel,
          handleClick: onClose,
        },
      };
    });

  const currentStatus = getCampaignStatusInfo(post.status, post.type);

  return {
    bottomSheetTitle: "Cambiar estado",
    bottomSheetDescription: "¿Cuál es el estado de la campaña?",
    currentStatus: {
      label: currentStatus?.text ?? post.status,
      color: currentStatus?.fontColor ?? "",
      backendValue: post.status,
    },
    possibleStatus,
    onClose,
  };
}
