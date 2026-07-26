import { useNavigate } from "react-router-dom";
import Arrow from "../../components/icons/Arrow";
import * as S from "./PublishForm.styles";
import DatePicker from "../../components/datePicker/DatePicker";
import { StyledMaskedInput } from "../../components/maskedInput/maskedInput.styles";
import { Phone, Search } from "../../components/icons";
import { Controller, useForm } from "react-hook-form";
import type { CreateCampaignRequest } from "../../app/services/requests/createCampaignRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "../../hooks/toast/useToast";
import { publishFundraisingSchema } from "./PublishFundraising.schema";
import { useCreateCampaignMutation } from "../../app/services/apis/campaignApi";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import PublishButton from "../../components/icons/PublishButton";
import AdviceComponent from "../../components/advice/AdviceComponent";
import FormErrorMessage from "../../components/errors/ErrorMessage";
export interface PublishFundraisingForm {
  title: string;
  accountAlias: string;
  amountToBeCollected: number;
  endDate?: string;
  description: string;
  phoneAreaCode: string;
  phone: string;
  location?: string;
}
function PublishFundraising() {
  const navigate = useNavigate();
  const [createCampaign] = useCreateCampaignMutation();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publishFundraisingSchema),
  });
  const onSubmit = async (data: PublishFundraisingForm) => {
    const phoneNumber = `${data.phoneAreaCode}${data.phone}`;
    const request: CreateCampaignRequest = {
      type: "FUNDRAISING",
      category: null,
      title: data.title,
      description: data.description,
      imageId: "abc123",
      phoneNumber,
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
      amountToBeCollected: data.amountToBeCollected,
      campaignEndDate: data.endDate,
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
    } catch (error) {
      toast.error(
        "No pudimos publicar la colecta",
        "Intentá nuevamente en unos minutos.",
      );
    }
  };
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
          <S.PublishLabel>
            Meta de recaudación <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
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
            <S.RequiredMark>*</S.RequiredMark>
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
          <S.PhoneFields>
            <S.InputWithIcon>
              <Controller
                control={control}
                name="phoneAreaCode"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    type="areaCode"
                    placeholder="353"
                    $hasLeftIcon
                    onAccept={(value) => field.onChange(value)}
                  />
                )}
              />
              <S.FieldIcon aria-hidden="true">
                <Phone />
              </S.FieldIcon>
            </S.InputWithIcon>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <StyledMaskedInput
                  {...field}
                  type="phoneNumber"
                  placeholder="56523551"
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
          </S.PhoneFields>
          <S.HelpText>
            El número es requerido para envío de comprobante de pago o para
            consultas.
          </S.HelpText>
          <FormErrorMessage
            message={errors.phoneAreaCode?.message ?? errors.phone?.message}
          />
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
          <ImageUpload />
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
