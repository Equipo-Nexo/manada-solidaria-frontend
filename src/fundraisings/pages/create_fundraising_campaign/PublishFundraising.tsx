import { useNavigate } from "react-router-dom";
import { Arrow, PublishButton } from "@icons/index.ts";
import { DatePicker, ImageUpload, Advice, ErrorMessage, PhoneInputComponent, AutocompleteGeolocation } from "@components/index.ts";
import { StyledMaskedInput } from "@components/maskedInput/maskedInput.styles";
import * as S from "@campaigns/pages/create_campaign/PublishForm.styles";
import { Controller, useController, useForm } from "react-hook-form";
import type { InferType, Maybe } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@hooks/toast/useToast";
import { publishFundraisingSchema } from "@fundraisings/app/schemas/PublishFundraising.schema";
import { useCreateCampaignMutation } from "@campaigns/app/api/campaignApi";
import type { Location } from "@services/responses/Location";
import type { FundraisingCampaignRequest } from "@/campaigns/app/api/requests/CreateCampaignRequest";
import { mapGeolocationToLocation } from "@utils/mapGeolocationToLocation";

export type PublishFundraisingForm = InferType<typeof publishFundraisingSchema>;

type PublishFundraisingFormInput = {
  title: string;
  accountAlias: string;
  amountToBeCollected: Maybe<number | undefined>;
  endDate: Maybe<string | undefined>;
  description: string;
  phoneAreaCode: string;
  phone: string;
  imageId: Maybe<string | undefined>;
  location: Location;
};
function PublishFundraising() {
  const navigate = useNavigate();
  const [createCampaign] = useCreateCampaignMutation();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PublishFundraisingFormInput, unknown, PublishFundraisingForm>({
    resolver: yupResolver(publishFundraisingSchema),
    defaultValues: {
      title: "",
      accountAlias: "",
      amountToBeCollected: undefined,
      endDate: "",
      description: "",
      phoneAreaCode: "",
      phone: "",
      imageId: undefined
    },
  });
  const onSubmit = async (data: PublishFundraisingForm) => {
    const request: FundraisingCampaignRequest = {
      type: "FUNDRAISING",
      title: data.title,
      description: data.description,
      imageId: data.imageId,
      phoneNumber: {
        areaCode: data.phoneAreaCode,
        number: data.phone
      },
      location: data.location,
      accountAlias: data.accountAlias,
      amountToBeCollected: data.amountToBeCollected ?? undefined,
      campaignEndDate: data.endDate ?? undefined,
    };

    createCampaign(request)
      .unwrap()
      .then(() => {
        toast.success(
          "Colecta publicada",
          "La colecta se publicó correctamente.",
        );
        navigate("/home");
      })
      .catch(() => {
        toast.error(
          "No pudimos publicar la colecta",
          "Intentá nuevamente en unos minutos.",
        );
      });
  };

  const { field: areaCodeField, fieldState: areaCodeState } = useController({
    control,
    name: "phoneAreaCode",
  });
  const { field: phoneNumberField, fieldState: phoneNumberState } =
    useController({
      control,
      name: "phone",
    });

  return (
    <S.PublishFormPage>
      <S.PublishFormHeader>
        <S.PublishBackButton
          type="button"
          aria-label="Volver"
          onClick={() => navigate(-1)}
        >
          <Arrow aria-hidden="true" />
        </S.PublishBackButton>
        <S.PublishFormTitle>Publicar Colecta de Dinero</S.PublishFormTitle>
      </S.PublishFormHeader>

      <S.PublishForm onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="350.000"
                  onAccept={(value) => {
                    if (value === "" || value == null) {
                      field.onChange(undefined);
                      return;
                    }

                    field.onChange(Number(value));
                  }}
                />
              )}
            />
          </S.InputWithIcon>
          <ErrorMessage message={errors.amountToBeCollected?.message} />
          <Advice advice="Si conocés el monto que necesitás recaudar, agregá una meta. Esto brinda mayor transparencia y confianza a las personas que desean colaborar." />
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
          <Controller
            control={control}
            name="location"
            render={({ field, fieldState }) => (
              <>
                <AutocompleteGeolocation
                  placeHolder="¿Dónde se realizará la campaña?"
                  onChange={(value) =>
                    field.onChange(value ? mapGeolocationToLocation(value) : undefined)
                  }
                />
                <ErrorMessage message={fieldState.error?.message} />
              </>
            )}
          />
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>Foto de la colecta</S.PublishLabel>
          <Controller
            control={control}
            name="imageId"
            render={({ field }) => (
              <ImageUpload
                onImageSelected={(imageId) => field.onChange(imageId)}
              />
            )}
          />
          <ErrorMessage message={errors.imageId?.message} />
        </S.PublishField>

        <S.PublishSubmitButton type="submit">
          Publicar Colecta de Dinero
          <PublishButton aria-hidden="true" />
        </S.PublishSubmitButton>
      </S.PublishForm>
    </S.PublishFormPage>
  );
}

export default PublishFundraising;
