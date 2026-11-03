import { useState } from "react";
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
  const [pending, setPending] = useState(false);
  const toast = useToast();

  const close = () => {
    if (!pending) onClose();
  };
  const updateCampaignStatus = async (status: CampaignStatus) => {
    if (pending || !canChangeCampaignStatus(post.status, status, post.type)) {
      return;
    }
    setPending(true);
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
      setPending(false);
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

  return (
    <UpdatePostStatusSheet {...sheetProps} isLoading={isLoading || pending} />
  );
}
