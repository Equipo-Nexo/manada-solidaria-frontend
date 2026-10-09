import { ArrowLeft, Calendar, ChevronRight, PawPrint } from "@/common/icons";
import * as S from "./receivedFormList.styles";
import { useNavigate } from "react-router-dom";
import { CategorySelector } from "@/common/components";
import { useState } from "react";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import { useGetFormsQuery } from "@/forms/app/api/adoptionFormsApi";
function ReceivedFormList() {
    const navigate = useNavigate();
    const categories = ['Todos', 'Pendientes', 'Revisados']
    const [selectedCategory, setCategory] = useState("");
    const { data: forms } = useGetFormsQuery({ filter: 'REVIEWER' });
    const response = forms;
    console.log(response)
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

                    ariaLabel="Filtrar publicaciones por categoría"
                />
            </S.FiltersContainer>
            <S.Card>
                <S.Photo src={NOT_FOUND_IMAGE_URL} alt="Foto de perfil de María Lopez" />
                <S.Info>
                    <S.FirstLine>
                        <S.Name>María Lopez</S.Name>
                        <S.Status>Pendiente</S.Status>
                    </S.FirstLine>

                    <S.CreationDate>
                        <Calendar aria-hidden="true" />
                        Enviado el 18 sep 2026
                    </S.CreationDate>
                    <S.Description>Quiero darle un hogar y una familia.</S.Description>
                    <S.LastLine>
                        <S.AnimalName><PawPrint aria-hidden="true" />Fisu</S.AnimalName>
                    </S.LastLine>
                </S.Info>
                <ChevronRight aria-hidden="true" />

            </S.Card>


        </S.MainContainer >
    );
}
export default ReceivedFormList;
