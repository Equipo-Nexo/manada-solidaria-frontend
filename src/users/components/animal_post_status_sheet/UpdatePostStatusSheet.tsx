import { useState } from "react";
import { BottomSheet } from "@/common/components";
import * as S from "./UpdatePostStatusSheet.styles";
import { Check } from "@/common/icons";
import type {
  PossibleStatus,
  UpdatePostStatusSheetProps,
} from "./UpdatePostStatusSheet.types";

const ConfirmationSheet = <TStatus extends string>({
  status,
  onCancel,
  isLoading = false,
}: {
  status: PossibleStatus<TStatus>;
  onCancel: () => void;
  isLoading?: boolean;
}) => {
  return (
    <S.Actions>
      <S.ActionButton
        type="button"
        $primary
        disabled={isLoading}
        aria-busy={isLoading}
        onClick={() =>
          void status.primaryButton.handleClick(status.backendValue)
        }
      >
        {status.primaryButton.label}
      </S.ActionButton>

      <S.ActionButton
        type="button"
        $primary={false}
        disabled={isLoading}
        onClick={onCancel}
      >
        {status.secondaryButton.label}
      </S.ActionButton>
    </S.Actions>
  );
};

const OptionsSheet = <TStatus extends string>({
  option,
  selected,
  onSelect,
  isLoading = false,
}: {
  option: PossibleStatus<TStatus>;
  selected: boolean;
  onSelect: (option: PossibleStatus<TStatus>) => void;
  isLoading?: boolean;
}) => {
  return (
    <S.Option
      type="button"
      $selected={selected}
      aria-pressed={selected}
      disabled={isLoading}
      onClick={() => onSelect(option)}
    >
      <S.OptionText>
        <S.OptionLabel>{option.title}</S.OptionLabel>
        <S.OptionDescription>{option.description}</S.OptionDescription>
      </S.OptionText>

      <S.CheckCircle $selected={selected} aria-hidden="true">
        <Check />
      </S.CheckCircle>
    </S.Option>
  );
};

function UpdatePostStatusSheet<TStatus extends string>(
  props: UpdatePostStatusSheetProps<TStatus>,
) {
  const [selectedStatus, setSelectedStatus] =
    useState<PossibleStatus<TStatus> | null>(null);

  const totalPossibleStatus = props.possibleStatus.length;

  const singleStatus =
    totalPossibleStatus === 1 ? props.possibleStatus[0] : null;

  const needsConfirmation =
    selectedStatus ?? (singleStatus?.isFinalStatus ? singleStatus : null);

  const handleSelectStatus = (option: PossibleStatus<TStatus>) => {
    if (props.isLoading) return;

    if (option.backendValue === props.currentStatus.backendValue) {
      return;
    }

    if (option.isFinalStatus) {
      setSelectedStatus(option);
    } else {
      void option.primaryButton.handleClick(option.backendValue);
    }
  };

  const handleCancelConfirmation = () => {
    if (props.isLoading) return;

    if (totalPossibleStatus > 1) {
      setSelectedStatus(null);
    } else {
      needsConfirmation?.secondaryButton.handleClick();
    }
  };

  return (
    <BottomSheet
      isOpen
      ariaLabel="Confirmar cambio de estado"
      onClose={props.isLoading ? () => {} : props.onClose}
    >
      <S.Content tabIndex={-1} aria-busy={props.isLoading}>
        <S.Title>
          {needsConfirmation?.confirmationTitle ?? props.bottomSheetTitle}
        </S.Title>

        <S.Description>
          {needsConfirmation?.confirmationDescription ??
            props.bottomSheetDescription}
        </S.Description>

        {needsConfirmation ? (
          <ConfirmationSheet
            status={needsConfirmation}
            onCancel={handleCancelConfirmation}
            isLoading={props.isLoading}
          />
        ) : (
          <S.Options aria-label="Estados de la publicación">
            {props.possibleStatus.map((option) => {
              const selected =
                option.backendValue ===
                (selectedStatus?.backendValue ??
                  props.currentStatus.backendValue);

              return (
                <OptionsSheet
                  key={option.backendValue}
                  option={option}
                  selected={selected}
                  onSelect={handleSelectStatus}
                  isLoading={props.isLoading}
                />
              );
            })}
          </S.Options>
        )}
      </S.Content>
    </BottomSheet>
  );
}

export default UpdatePostStatusSheet;
