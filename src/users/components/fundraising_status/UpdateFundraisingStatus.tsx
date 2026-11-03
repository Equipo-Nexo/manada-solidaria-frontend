import { useState } from "react";
import { useTheme } from "styled-components";
import ProgressBar from "@/common/components/progress_bar/ProgressBar";
import { Check } from "@/common/icons";
import { getFundraisingProgress } from "../../utils/FundraisingProgressUtils";
import * as S from "../animal_post_status_sheet/UpdatePostStatusSheet.styles";
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

export function FundraisingProgress({ post }: Pick<Props, "post">) {
  const theme = useTheme();
  const progress = getFundraisingProgress(post);
  const completed = post.status === "COMPLETED";
  const finished = post.status === "FINISHED";
  const subtitle = completed
    ? "Meta alcanzada"
    : finished
      ? "Colecta finalizada"
      : null;

  return (
    <S.FundraisingProgress>
      {progress !== null && (
        <>
          <S.FundraisingGoal>
            Meta a recaudar:{" "}
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            }).format(post.amountToBeCollected!)}
          </S.FundraisingGoal>
          <ProgressBar
            progress={progress}
            label={`Progreso de la colecta ${post.title}`}
            color={
              completed
                ? theme.colors.success
                : finished
                  ? theme.colors.fundraisingFinishedProgress
                  : undefined
            }
            backgroundColor={
              finished ? `${theme.colors.statusStreetBackground}59` : undefined
            }
          />
        </>
      )}
      {subtitle && (
        <S.FundraisingSubtitle $completed={completed}>
          <Check aria-hidden="true" />
          {subtitle}
        </S.FundraisingSubtitle>
      )}
    </S.FundraisingProgress>
  );
}

export default function UpdateFundraisingStatus({ post, onClose }: Props) {
  const [updateStatus, { isLoading }] = useUpdateCampaignStatusMutation();
  const [pending, setPending] = useState(false);
  const toast = useToast();
  const close = () => {
    if (!pending) onClose();
  };
  const updateFundraisingStatus = async (status: EditableFundraisingStatus) => {
    if (pending || !canChangeFundraisingStatus(post.status, status)) {
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
        `El estado cambió a ${fundraisingStatusConfig[status].text}.`,
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

  return (
    <UpdatePostStatusSheet {...sheetProps} isLoading={isLoading || pending}>
      <FundraisingProgress post={post} />
    </UpdatePostStatusSheet>
  );
}
