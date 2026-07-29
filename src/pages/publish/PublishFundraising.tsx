import { useNavigate } from "react-router-dom";
import Arrow from "../../components/icons/Arrow";
import * as S from "./PublishForm.styles";
import DatePicker from "../../components/datePicker/DatePicker";
import { StyledMaskedInput } from "../../components/maskedInput/maskedInput.styles";
import { Search } from "../../components/icons";
import { Controller, useController, useForm } from "react-hook-form";
import type { InferType, Maybe } from "yup";
import type { CreateCampaignRequest } from "../../app/services/requests/createCampaignRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "../../hooks/toast/useToast";
import { publishFundraisingSchema } from "./PublishFundraising.schema";
import { useCreateCampaignMutation } from "../../app/services/apis/campaignApi";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import PublishButton from "../../components/icons/PublishButton";
import AdviceComponent from "../../components/advice/AdviceComponent";
import FormErrorMessage from "../../components/errors/ErrorMessage";
import PhoneInputComponent from "../../components/inputs/PhoneInputComponent";

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
  location: Maybe<string | undefined>;
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
      imageId: undefined,
      location: "",
    },
  });
  const onSubmit = async (data: PublishFundraisingForm) => {
    const request: CreateCampaignRequest = {
      type: "FUNDRAISING",
      category: null,
      title: data.title,
      description: data.description,
      imageId: data.imageId,
      phoneNumber: `${data.phoneAreaCode}${data.phone}`,
      location: data.location
        ? {
            name: data.location,
            address: "",
            number: 12,
            latitude: 0,
            longitude: 0,
          }
        : undefined,
      items: undefined,
      accountAlias: data.accountAlias,
      amountToBeCollected: data.amountToBeCollected ?? undefined,
      campaignEndDate: data.endDate ?? undefined,
      newsStartDateTime: undefined,
      newsEndDateTime: undefined,
    };
    try {
      await createCampaign(request).unwrap();
      toast.success(
        "Colecta publicada",
        "La colecta se publicó correctamente.",
      );
      navigate("/home");
    } catch {
      toast.error(
        "No pudimos publicar la colecta",
        "Intentá nuevamente en unos minutos.",
      );
    }
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
          <FormErrorMessage message={errors.title?.message} />
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
          <FormErrorMessage message={errors.accountAlias?.message} />
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
                  onAccept={(value) => field.onChange(Number(value))}
                />
              )}
            />
          </S.InputWithIcon>
          <FormErrorMessage message={errors.amountToBeCollected?.message} />
        </S.PublishField>

        <S.PublishField>
          <S.PublishLabel>Fecha fin</S.PublishLabel>
          <DatePicker control={control} name="endDate" />
          <FormErrorMessage message={errors.endDate?.message} />
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
          <FormErrorMessage message={errors.description?.message} />
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
              {...register("location")}
              placeholder="¿Dónde se realizará la campaña?"
              $hasLeftIcon
            />
            <S.FieldIcon aria-hidden="true">
              <Search />
            </S.FieldIcon>
          </S.InputWithIcon>
          <S.MapPreview aria-hidden="true" />
          <S.HelpText>
            Buscá una dirección o tocá el mapa para marcar el punto.
          </S.HelpText>
          <FormErrorMessage message={errors.location?.message} />
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
          <FormErrorMessage message={errors.imageId?.message} />
        </S.PublishField>
        <AdviceComponent
          advice="Las campañas con metas claras y fotos nítidas suelen completarse
              un 40% más rápido. Asegurate de incluir toda la información
              relevante."
        />
        <S.PublishSubmitButton type="submit">
          Publicar Colecta de Dinero
          <PublishButton aria-hidden="true" />
        </S.PublishSubmitButton>
      </S.PublishForm>
    </S.PublishFormPage>
  );
}

export default PublishFundraising;
