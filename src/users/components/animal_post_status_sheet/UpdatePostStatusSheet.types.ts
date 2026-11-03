import type { UpdateAnimalPostStatusRequest } from "@animals/app/api/requests/animalPostRequests";
import type { ReactNode } from "react";

export type PostStatus = UpdateAnimalPostStatusRequest["status"];

export type ChangePostStatus<TStatus extends string = PostStatus> = (
  status: TStatus,
) => void | Promise<void>;

export interface PrimaryStatusButton<TStatus extends string = PostStatus> {
  label: string;
  handleClick: ChangePostStatus<TStatus>;
}

export interface SecondaryStatusButton {
  label: string;
  handleClick: () => void;
}

export interface PossibleStatus<TStatus extends string = PostStatus> {
  label: string;
  title: string;
  description: string;
  backendValue: TStatus;
  isFinalStatus: boolean;
  confirmationTitle?: string;
  confirmationDescription?: string;
  primaryButton: PrimaryStatusButton<TStatus>;
  secondaryButton: SecondaryStatusButton;
}

export interface CurrentStatus {
  label: string;
  color: string;
  backendValue: string;
}

export interface UpdatePostStatusSheetProps<
  TStatus extends string = PostStatus,
> {
  bottomSheetTitle: string;
  bottomSheetDescription: string;
  currentStatus: CurrentStatus;
  possibleStatus: PossibleStatus<TStatus>[];
  onClose: () => void;
  isLoading?: boolean;
  children?: ReactNode;
}
