import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Phone } from "@/common/icons";
import type { AdoptionFormAnswer } from "../../app/types/AdoptionFormDetail.types";
import { iconsMap } from "../../utils/iconsMap";
import * as S from "./AdoptionFormDetail.styles";
import { openWhatsApp } from "@/common/utils/Whatsapp";
import {
  useGetAdoptionFormDetailQuery,
  useMarkAdoptionFormAsReadMutation,
} from "@/forms/app/api/adoptionFormsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import {
  normalizeImageUrl,
  NOT_FOUND_IMAGE_URL,
} from "@/common/utils/CommonUtils";
import { getInitials } from "@/forms/utils/getInitials";
import { AdoptionQuestionsMock } from "@/forms/utils/AdoptionQuestionsMocked";
import { formatDateShort } from "@/common/utils/DateTime";
import { skipToken } from "@reduxjs/toolkit/query";
import { useToast } from "@/common/hooks/toast/useToast";

const adoptionReasonQuestion = AdoptionQuestionsMock.find(
  (question) => question.id === "adoption-reason",
);

function Answer({ question }: { question: AdoptionFormAnswer }) {
  const icon = iconsMap.get(question.iconName);
  return (
    <S.AnswerRow>
      <S.QuestionIcon aria-hidden="true">{icon}</S.QuestionIcon>
      <S.AnswerContent>
        <S.QuestionTitle>{question.questionTitle}</S.QuestionTitle>
        <S.AnswerText>{question.answer?.trim() || "-"}</S.AnswerText>
      </S.AnswerContent>
    </S.AnswerRow>
  );
}

export default function AdoptionFormDetail() {
  const navigate = useNavigate();
  const toast = useToast();
  const { adoptionFormId } = useParams<{ adoptionFormId: string }>();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAdoptionFormDetailQuery(adoptionFormId ?? skipToken);

  const [markAdoptionFormAsRead, { isLoading: isMarkingAsRead }] =
    useMarkAdoptionFormAsReadMutation();

  const handleMarkAsReviewed = async () => {
    if (!adoptionFormId || response?.isRead) return;

    try {
      await markAdoptionFormAsRead(adoptionFormId).unwrap();
    } catch {
      toast.error(
        "No pudimos marcar el formulario como revisado",
        "Intentá nuevamente.",
      );
    }
  };

  if (isLoading) {
    return <PawLoader label="Cargando formulario..." />;
  }
  if (isError || !response) {
    return (
      <Message
        message="No pudimos cargar esta respuesta del formulario de adopción."
        iconName="pawPrint"
      />
    );
  }
  const applicantName = response.applicantName?.trim() || "Posible adoptante";
  const formattedDate = formatDateShort(response.createdAt);
  const initials = getInitials(response.applicantName);
  return (
    <S.Page>
      <S.Summary>
        <S.BackButton
          type="button"
          aria-label="Volver"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>
        <S.SummaryFrame>
          <S.Header>
            <S.AnimalPhotoFrame>
              <S.AnimalPhoto
                src={normalizeImageUrl(response.animalImageUrl)}
                alt={`Foto de ${response.animalName}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NOT_FOUND_IMAGE_URL;
                }}
              />
            </S.AnimalPhotoFrame>
            <S.AnimalName>{response.animalName}</S.AnimalName>
          </S.Header>
          <S.ApplicantCard>
            <S.Avatar aria-hidden="true">{initials}</S.Avatar>
            <S.ApplicantInfo>
              <S.ApplicantHeading>
                <S.ApplicantName>{applicantName}</S.ApplicantName>
                <S.Status $isRead={response.isRead} role="status">
                  {response.isRead ? "Revisado" : "Pendiente"}
                </S.Status>
              </S.ApplicantHeading>
              <S.SentDate>
                <Calendar aria-hidden="true" />
                Enviado el
                <time dateTime={response.createdAt}>{formattedDate}</time>
              </S.SentDate>
            </S.ApplicantInfo>
          </S.ApplicantCard>
        </S.SummaryFrame>
      </S.Summary>
      <S.Categories>
        {response.categories.map((category, index) => (
          <S.Category
            key={category.categoryId}
            aria-labelledby={`category-${category.categoryId}`}
          >
            <S.CategoryTitle id={`category-${category.categoryId}`}>
              {category.categoryName}
            </S.CategoryTitle>

            <S.Answers $compact={index === response.categories.length - 1}>
              {category.questions.map((question) => (
                <S.AnswerGroup key={question.questionId}>
                  <Answer question={question} />
                </S.AnswerGroup>
              ))}

              {index === response.categories.length - 1 &&
                adoptionReasonQuestion && (
                  <S.AnswerGroup>
                    <Answer
                      question={{
                        questionId: adoptionReasonQuestion.id,
                        questionTitle: adoptionReasonQuestion.title,
                        iconName: adoptionReasonQuestion.iconName,
                        answer: response.description,
                      }}
                    />
                  </S.AnswerGroup>
                )}
            </S.Answers>
          </S.Category>
        ))}
      </S.Categories>
      <S.Actions>
        <S.ReviewButton
          type="button"
          onClick={handleMarkAsReviewed}
          disabled={response.isRead || isMarkingAsRead}
        >
          {isMarkingAsRead
            ? "Marcando como revisado..."
            : response.isRead
              ? "Revisado"
              : "Marcar como revisado"}
        </S.ReviewButton>
        <S.ContactButton
          type="button"
          onClick={() =>
            openWhatsApp(
              `${response.phoneNumber.areaCode}${response.phoneNumber.number}`,
              `Hola ${applicantName}, me contacto por tu solicitud de adopción de ${response.animalName}.`,
            )
          }
        >
          <Phone aria-hidden="true" />
          Contactar
        </S.ContactButton>
      </S.Actions>
    </S.Page>
  );
}
