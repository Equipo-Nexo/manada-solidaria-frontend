import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Phone } from "@/common/icons";
import type { AdoptionFormAnswer } from "../../app/types/AdoptionFormDetail.types";
import { iconsMap } from "../../utils/iconsMap";
import * as S from "./AdoptionFormDetail.styles";
import { openWhatsApp } from "@/common/utils/Whatsapp";
import { useGetAdoptionFormDetailQuery } from "@/forms/app/api/adoptionFormsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";

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
  const { adoptionFormId } = useParams<{ adoptionFormId: string }>();

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAdoptionFormDetailQuery(adoptionFormId!, {
    skip: !adoptionFormId,
  });

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

  const initials = (response.applicantName ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const date = new Date(response.createdAt);

  const formattedDate = Number.isNaN(date.getTime())
    ? "-"
    : new Intl.DateTimeFormat("es-AR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
        .format(date)
        .replace(/\./g, "");

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
                src={response.animalImageUrl}
                alt={response.animalName}
              />
            </S.AnimalPhotoFrame>
            <S.AnimalName>{response.animalName}</S.AnimalName>
          </S.Header>
          <S.ApplicantCard>
            <S.Avatar aria-hidden="true">{initials}</S.Avatar>
            <S.ApplicantInfo>
              <S.ApplicantHeading>
                <S.ApplicantName>
                  {response.applicantName || "Posible Adoptante"}
                </S.ApplicantName>
                <S.Status $isRead={response.isRead} role="status">
                  {response.isRead ? "Revisado" : "Pendiente"}
                </S.Status>
              </S.ApplicantHeading>
              <S.SentDate>
                <Calendar aria-hidden="true" />
                Enviado el{" "}
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
              {category.questions.map((question, questionIndex) => (
                <S.AnswerGroup key={question.questionId}>
                  {index === response.categories.length - 1 &&
                    questionIndex === category.questions.length - 1 && (
                      <Answer
                        question={{
                          questionId: "description",
                          questionTitle: "¿Por qué querés adoptar?",
                          iconName: "Heart",
                          answer: response.description,
                        }}
                      />
                    )}
                  <Answer question={question} />
                </S.AnswerGroup>
              ))}
              {index === response.categories.length - 1 &&
                category.questions.length === 0 && (
                  <Answer
                    question={{
                      questionId: "description",
                      questionTitle: "¿Por qué querés adoptar?",
                      iconName: "Heart",
                      answer: response.description,
                    }}
                  />
                )}
            </S.Answers>
          </S.Category>
        ))}
      </S.Categories>
      <S.Actions>
        <S.ReviewButton type="button" disabled={response.isRead}>
          {response.isRead ? "Revisado" : "Marcar como revisado"}
        </S.ReviewButton>
        <S.ContactButton
          type="button"
          onClick={() =>
            openWhatsApp(
              `${response.phoneNumber.areaCode}${response.phoneNumber.number}`,
              `Hola ${response.applicantName}, me contacto por tu solicitud de adopción de ${response.animalName}.`,
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
