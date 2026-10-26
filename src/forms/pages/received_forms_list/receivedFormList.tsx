import { ArrowLeft, Calendar, ChevronRight, PawPrint } from "@/common/icons";
import * as S from "./receivedFormList.styles";
import { useNavigate } from "react-router-dom";
import { CategorySelector } from "@/common/components";
import { useState } from "react";
import { normalizeImageUrl } from "@/common/utils/CommonUtils";
import { formatDateShort } from "@/common/utils/DateTime";
import { useGetFormsQuery } from "@/forms/app/api/adoptionFormsApi";

function ReceivedFormList() {
    const navigate = useNavigate();
    const [selectedCategory, setCategory] = useState("Todos");
    const { data: receivedForms } = useGetFormsQuery({ filter: 'REVIEWER' });
    const categories = ['Todos', 'Pendientes', 'Revisados']
    const categoryLabels: Record<string, string> = {
        Todos: `Todos (${receivedForms?.counters.total ?? 0})`,
        Pendientes: `Pendientes (${receivedForms?.counters.pending ?? 0})`,
        Revisados: `Revisados (${receivedForms?.counters.reviewed ?? 0})`,
    }
    return (
        <S.MainContainer>
            <S.Header>
                <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
                <S.TitlesContainer>
                    <S.PageTitle>Formularios Recibidos</S.PageTitle>
                    <S.PageSubtitle> Personas interesadas en adoptar
                    </S.PageSubtitle>
                </S.TitlesContainer>
            </S.Header>
            <S.FiltersContainer>
                <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setCategory}
                    getCategoryLabel={(category) => categoryLabels[category]}
                    ariaLabel="Filtrar publicaciones por categoría"
                />
            </S.FiltersContainer>
            <S.CardsContainer $hasSingleCard={receivedForms?.forms.length === 1}>
                {receivedForms?.forms.map((form, index) =>
                    <S.Card key={index}>
                        <S.Photo src={normalizeImageUrl(form.animalImageUrl)} alt={`Foto de perfil de ${form.applicantName}`} />
                        <S.Info>
                            <S.FirstLine>
                                <S.Name>

                                    {form.applicantName}
                                </S.Name>
                                <S.Status $isRead={form.isRead}>{form.isRead ? "Revisado" : "Pendiente"}</S.Status>
                            </S.FirstLine>
                            <S.CreationDate>
                                <Calendar aria-hidden="true" />
                                Enviado el {formatDateShort(form.createdAt)}
                            </S.CreationDate>
                            <S.Description>{form.description?.trim() || "Sin descripción"}</S.Description>
                            {form.animalName?.trim() &&
                                <S.LastLine>
                                    <S.AnimalName><PawPrint aria-hidden="true" />{form.animalName}</S.AnimalName>
                                </S.LastLine>
                            }

                        </S.Info>
                        <ChevronRight aria-hidden="true" />
                    </S.Card>
                )}
            </S.CardsContainer>



        </S.MainContainer >
    );
}
export default ReceivedFormList;
