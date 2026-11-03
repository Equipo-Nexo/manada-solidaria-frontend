import { useRef } from "react";
import { useUpdateCampaignStatusMutation } from "@campaigns/app/api/campaignApi";
import type { GetUserPostsResponse } from "@services/responses/userResponses";
import { useToast } from "@hooks/toast/useToast";
import { getApiErrorMessage } from "@utils/getApiErrorMessage";
import UpdatePostStatusSheet from "../animal_post_status_sheet/UpdatePostStatusSheet";
import { FundraisingStatusLogic } from "../../pages/my_posts/utils/FundraisingStatusLogic";
import {
  fundraisingStatusConfig,
  canChangeFundraisingStatus,
  hasFundraisingStatusActions,
} from "../../pages/my_posts/utils/FundraisingStatusConfig";
import type {
  FundraisingStatus,
  EditableFundraisingStatus,
} from "../../pages/my_posts/utils/FundraisingStatusConfig";

type Props = {
  post: GetUserPostsResponse;
  onClose: () => void;
};

export default function UpdateFundraisingStatus({ post, onClose }: Props) {
  const [updateStatus, { isLoading }] = useUpdateCampaignStatusMutation();
  const pending = useRef(false);
  const toast = useToast();
  const close = () => {
    if (!pending.current) onClose();
  };
  const updateFundraisingStatus = async (status: EditableFundraisingStatus) => {
    if (pending.current || !canChangeFundraisingStatus(post.status, status)) {
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
        `El estado cambió a ${fundraisingStatusConfig[status].text}.`,
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
    post.postType !== "fundraising" ||
    !hasFundraisingStatusActions(post.status)
  ) {
    return null;
  }
  const sheetProps = FundraisingStatusLogic({
    status: post.status as FundraisingStatus,
    onChangeStatus: updateFundraisingStatus,
    onClose: close,
  });

  return <UpdatePostStatusSheet {...sheetProps} isLoading={isLoading} />;
}
