import { useNavigate, useParams } from "react-router-dom";
import { Arrow, Search, PublishButton } from "@icons/index.ts";
import { ErrorMessage, PhoneInputComponent, DatePicker, ImageUpload, Advice, Loader  } from "@components/index.ts";
import { StyledMaskedInput } from "@components/maskedInput/maskedInput.styles";
import * as S from "./EditFundraisingCampaign.styles";
import { Controller, useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType, Maybe } from "yup";
import { editFundraisingSchema } from "@fundraisings/app/schemas/EditFundraisingCampaign.schema";
import { useGetFundraisingByIdQuery, useUpdateFundraisingCampaignMutation } from "@campaigns/app/api/campaignApi";
import { useEffect } from "react";
import type { Location } from "@services/responses/Location";
import type { UpdateFundraisingCampaignRequest } from "@services/requests/updateCampaignRequest";
import { useToast } from "@hooks/toast/useToast";

export type EditFundraisingForm = InferType<typeof editFundraisingSchema>;

type EditFundraisingFormInput = {
  title: string;
  accountAlias: string;
  amountToBeCollected: Maybe<number | undefined>;
  collectedAmount: Maybe<number | undefined>;
  endDate: Maybe<string | undefined>;
  description: string;
  phoneAreaCode: string;
  phone: string;
  imageId: Maybe<string | undefined>;
  location: Location;
};

function EditFundraising() {

  const toaster = useToast();
  const navigate = useNavigate();
  const { fundraisingId } = useParams<{ fundraisingId: string }>()
  const { data: campaign, isLoading, isError } = useGetFundraisingByIdQuery(fundraisingId || "");
  const [ updateFundraisingCampaign, { isLoading: isUpdating } ] = useUpdateFundraisingCampaignMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditFundraisingFormInput, unknown, EditFundraisingForm>({
    resolver: yupResolver(editFundraisingSchema)
  });

  useEffect(() => {
    if (campaign) {
      setValue("title", campaign.title);
      setValue("accountAlias", campaign.accountAlias);
      setValue("amountToBeCollected", campaign.amountToBeCollected || null);
      setValue("collectedAmount", campaign.amountCollected || null);
      setValue("endDate", campaign.campaignEndDate);
      setValue("description", campaign.description);
      setValue("phoneAreaCode", campaign.phoneNumber.substring(0, 3))
      setValue("phone", campaign.phoneNumber.substring(3));
      setValue("imageId", campaign.imageId);
      setValue("location", campaign.location);
    }
  }, [isLoading, campaign, setValue]);

  const { field: areaCodeField, fieldState: areaCodeState } = useController({
    control,
    name: "phoneAreaCode",
  });
  const { field: phoneNumberField, fieldState: phoneNumberState } =
    useController({
      control,
      name: "phone",
    });

  const onSubmit = (data: EditFundraisingForm) => {
    const requestBody: UpdateFundraisingCampaignRequest = {
      type: "FUNDRAISING",
      title: data.title,
      description: data.description,
      imageId: data.imageId,
      location: data.location,
      phoneNumber: `${data.phoneAreaCode}${data.phone}`,
      accountAlias: data.accountAlias,
      amountToBeCollected: data.amountToBeCollected || null,
      amountCollected: data.collectedAmount || null,
      campaignEndDate: data.endDate || null,
      newsStartDateTime: null,
      newsEndDateTime: null,
    };

    updateFundraisingCampaign({ 
      postId: fundraisingId || "", 
      body: requestBody 
    }).unwrap()
      .then(() => {
        toaster.success("Colecta actualizada con éxito");
        navigate("/mis-publicaciones");
      })
      .catch(() => {
        toaster.error("Error al actualizar la colecta");
      });
  }

  return (
    <S.EditFormContainer>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <Arrow aria-hidden="true" />
        </S.BackButton>
        <S.FormTitle>Editar Colecta de Dinero</S.FormTitle>
      </S.Header>
      { isLoading && <Loader label="Cargando información de la colecta." /> }
      { isError || !campaign && <div>Hubo un error al obtener informacion de la colecta.</div> }
      { !isLoading && !isError && campaign && (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.PublishField>
            <S.PublishLabel>
              Título de la colecta <S.RequiredMark>*</S.RequiredMark>
            </S.PublishLabel>
            <S.PublishInput
              type="text"
              {...register("title")}
              placeholder="Ej: Saldar gastos de la veterinaria"
            />
            <ErrorMessage message={errors.title?.message} />
          </S.PublishField>

          <S.PublishField>
            <S.PublishLabel>
              Alias <S.RequiredMark>*</S.RequiredMark>
            </S.PublishLabel>
            <S.PublishInput
              type="text"
              {...register("accountAlias")}
              placeholder="maca.123.mp"
            />
            <ErrorMessage message={errors.accountAlias?.message} />
          </S.PublishField>

          <S.PublishField>
            <S.PublishLabel>Meta de recaudación</S.PublishLabel>
            <S.InputWithIcon>
              <S.FieldIcon>$</S.FieldIcon>
              <Controller
                control={control}
                name="amountToBeCollected"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="money"
                    value={field.value?.toString() ?? ""}
                    onAccept={(value) => field.onChange(Number(value))}
                  />
                )}
              />
            </S.InputWithIcon>
            <ErrorMessage message={errors.amountToBeCollected?.message} />
          </S.PublishField>
          <Advice
            advice="Si conocés el monto que necesitás recaudar, agregá una meta. Esto brinda mayor transparencia y confianza a las personas que desean colaborar."
          />
          <S.PublishField>
            <S.PublishLabel>Monto recaudado actual</S.PublishLabel>
            <S.InputWithIcon>
              <S.FieldIcon>$</S.FieldIcon>
              <Controller
                control={control}
                name="collectedAmount"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="money"
                    value={field.value?.toString() ?? ""}
                    onAccept={(value) => field.onChange(Number(value))}
                  />
                )}
              />
            </S.InputWithIcon>
            <ErrorMessage message={errors.collectedAmount?.message} />
          </S.PublishField>

          <S.PublishField>
            <S.PublishLabel>Fecha fin</S.PublishLabel>
            <DatePicker control={control} name="endDate" />
            <ErrorMessage message={errors.endDate?.message} />
          </S.PublishField>

          <S.PublishField>
            <S.PublishLabel>
              Descripción de la colecta
              <S.RequiredMark> *</S.RequiredMark>
            </S.PublishLabel>
            <S.PublishTextarea
              {...register("description")}
              placeholder="Contanos por qué es importante esta colecta de dinero y a quiénes ayudará..."
            />
            <ErrorMessage message={errors.description?.message} />
          </S.PublishField>

          <S.PublishField>
            <S.PublishLabel>
              Número de teléfono <S.RequiredMark>*</S.RequiredMark>
            </S.PublishLabel>

            <PhoneInputComponent
              areaCodeValue={areaCodeField.value}
              phoneNumberValue={phoneNumberField.value}
              onAreaCodeChange={areaCodeField.onChange}
              onPhoneNumberChange={phoneNumberField.onChange}
              onAreaCodeBlur={areaCodeField.onBlur}
              onPhoneNumberBlur={phoneNumberField.onBlur}
              areaCodeRef={areaCodeField.ref}
              phoneNumberRef={phoneNumberField.ref}
              error={
                areaCodeState.error?.message ?? phoneNumberState.error?.message
              }
            />
            <S.HelpText>
              El número es requerido para envío de comprobante de pago o para
              consultas.
            </S.HelpText>
          </S.PublishField>

          <S.PublishField as="div">
            <S.PublishLabel>Ubicación</S.PublishLabel>
            <S.InputWithIcon>
              <S.IconInput
                type="text"
                {...register("location.address")}
                placeholder="¿Dónde se realizará la campaña?"
                $hasLeftIcon
              />
              <S.FieldIcon aria-hidden="true">
                <Search />
              </S.FieldIcon>
            </S.InputWithIcon>
            <ErrorMessage message={errors.location?.address?.message} />
            <S.MapPreview aria-hidden="true" />
            <S.HelpText>
              Buscá una dirección o tocá el mapa para marcar el punto.
            </S.HelpText>
            <ErrorMessage message={errors.location?.message} />
          </S.PublishField>

          <S.PublishField as="div">
            <S.PublishLabel>Foto de la colecta</S.PublishLabel>
            <Controller
              control={control}
              name="imageId"
              render={({ field }) => (
                <ImageUpload
                  onImageSelected={(imageId) => field.onChange(imageId)}
                  imageUrl={campaign.imageId}
                />
              )}
            />
            <ErrorMessage message={errors.imageId?.message} />
          </S.PublishField>
          <Advice
            advice="Las metas de recaudación con metas claras y fotos nítidas suelen completarse
                un 40% más rápido. Asegurate de incluir toda la información
                relevante."
          />
          <S.PublishSubmitButton type="submit" disabled={isUpdating}>
            { isUpdating ? "Actualizando..." : "Guardar Cambios" }
            <PublishButton aria-hidden="true" />
          </S.PublishSubmitButton>
        </S.Form>
      )}
    </S.EditFormContainer>
  )
}

export default EditFundraising;
