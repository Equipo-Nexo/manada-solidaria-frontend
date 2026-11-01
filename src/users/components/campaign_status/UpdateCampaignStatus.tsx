import { useRef } from "react";
import { useUpdateCampaignStatusMutation } from "@campaigns/app/api/campaignApi";
import type { GetUserPostsResponse } from "@services/responses/userResponses";
import { useToast } from "@hooks/toast/useToast";
import { getApiErrorMessage } from "@utils/getApiErrorMessage";
import UpdatePostStatusSheet from "../animal_post_status_sheet/UpdatePostStatusSheet";
import { CampaignStatusLogic } from "../../pages/my_posts/utils/CampaignStatusLogic";
import {
  campaignStatusConfig,
  canChangeCampaignStatus,
  hasCampaignStatusActions,
} from "../../pages/my_posts/utils/CampaignStatusConfig";
import type { UpdateCampaignStatusRequest } from "@campaigns/app/api/requests/UpdateCampaignStatusRequest";
type CampaignStatus = UpdateCampaignStatusRequest["status"];

type Props = {
  post: GetUserPostsResponse;
  onClose: () => void;
};

export default function UpdateCampaignStatus({ post, onClose }: Props) {
  const [updateStatus, { isLoading }] = useUpdateCampaignStatusMutation();
  const pending = useRef(false);
  const toast = useToast();

  const close = () => {
    if (!pending.current) onClose();
  };

  const updateCampaignStatus = async (status: CampaignStatus) => {
    if (
      pending.current ||
      !canChangeCampaignStatus(post.status, status, post.type)
    ) {
      return;
    }

    pending.current = true;

    try {
      await updateStatus({
        campaignId: post.id,
        status,
      }).unwrap();

      toast.success(
        "Estado actualizado",
        `El estado cambió a ${campaignStatusConfig[status].text}.`,
      );

      onClose();
    } catch (error) {
      toast.error(
        "No pudimos cambiar el estado",
        getApiErrorMessage(error, "Intentá nuevamente."),
      );
    } finally {
      pending.current = false;
    }
  };

  if (
    post.postType !== "campaign" ||
    !hasCampaignStatusActions(post.status, post.type)
  ) {
    return null;
  }

  const sheetProps = CampaignStatusLogic({
    post,
    onChangeStatus: updateCampaignStatus,
    onClose: close,
  });

  return <UpdatePostStatusSheet {...sheetProps} isLoading={isLoading} />;
}
