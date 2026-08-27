import { Arrow, ChevronRight, Heart } from "@/common/icons";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import * as S from "./HappyCases.styles";
import type {
  HappyCaseResponse,
  HappyCaseStatus,
} from "./app/api/responses/happyCasesResponses";
import { useGetHappyCasesQuery } from "./app/api/happyCasesApi";
import { Loader } from "@/common/components";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
const statusLabel: Record<HappyCaseStatus, string> = {
  FOUND: "Encontrado",
  ADOPTED: "Adoptado",
  RESCUED: "Rescatado",
};
type HappyCasesProps = {
  onViewCase?: (happyCase: HappyCaseResponse) => void;
};

function HappyCases({ onViewCase }: HappyCasesProps) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetHappyCasesQuery({
    page: 0,
    size: 10,
  });
  const happyCases = data?.content ?? [];
  const recentCases = happyCases.filter(({ isRecent }) => isRecent);
  const visibleCases = happyCases.filter(({ isRecent }) => !isRecent);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.firstElementChild as HTMLElement | null;
    if (!card) return;
    const index = Math.round(carousel.scrollLeft / card.offsetWidth);
    setActiveIndex(index);
  };
  if (isLoading) {
    return (
      <S.Container>
        <Loader label="Cargando casos felices..." />
      </S.Container>
    );
  }
  return (
    <S.Container>
      <S.Intro>
        <S.IntroHeader>
          <S.BackButton onClick={() => navigate("/home")}>
            <Arrow aria-hidden="true" />
          </S.BackButton>
          <S.Title>Casos Felices</S.Title>
        </S.IntroHeader>
        <S.Description>
          Celebramos las segundas oportunidades. Conocé las historias de éxito
          que llenan de alegría a nuestra comunidad.
        </S.Description>
      </S.Intro>

      {recentCases.length > 0 && (
        <>
          <S.FeaturedCarousel ref={carouselRef} onScroll={handleCarouselScroll}>
            {recentCases.map((happyCase) => (
              <S.FeaturedCard
                $imageUrl={`${import.meta.env.VITE_CLOUDFLARE_URL}${happyCase.imageUrl}`}
                key={happyCase.id}
              >
                <S.FeaturedContent>
                  <S.FeaturedBadge>
                    <Heart aria-hidden="true" />
                    Últimos casos de éxito
                  </S.FeaturedBadge>

                  <S.FeaturedInfo>
                    <S.FeaturedName>{happyCase.name}</S.FeaturedName>

                    <S.FeaturedDescription>
                      {happyCase.description}
                    </S.FeaturedDescription>

                    <S.StoryButton
                      type="button"
                      onClick={() => onViewCase?.(happyCase)}
                    >
                      Ver historia
                      <ChevronRight aria-hidden="true" />
                    </S.StoryButton>
                  </S.FeaturedInfo>
                </S.FeaturedContent>
              </S.FeaturedCard>
            ))}
          </S.FeaturedCarousel>
          <S.CarouselIndicators aria-label="Casos destacados">
            {recentCases.slice(0, 5).map((happyCase, index) => (
              <S.Indicator
                key={happyCase.id}
                $active={index === activeIndex}
                aria-hidden="true"
              />
            ))}
          </S.CarouselIndicators>
        </>
      )}
      <S.CasesList>
        {visibleCases.map((happyCase) => (
          <S.CaseWrapper key={happyCase.id}>
            <S.HappyCaseCard
              type="button"
              onClick={() =>
                setExpandedCaseId((currentId) =>
                  currentId === happyCase.id ? null : happyCase.id,
                )
              }
            >
              <S.CaseImage
                src={`${import.meta.env.VITE_CLOUDFLARE_URL}${happyCase.imageUrl}`}
                alt={`Foto de ${happyCase.name}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NOT_FOUND_IMAGE_URL;
                }}
              />

              <S.CaseContent>
                <S.CaseName>{happyCase.name}</S.CaseName>

                <S.CaseDescription>{happyCase.description}</S.CaseDescription>

                <S.CaseFooter>
                  <S.StatusBadge $status={happyCase.status}>
                    {statusLabel[happyCase.status]}
                  </S.StatusBadge>

                  <S.CaseArrow
                    $expanded={expandedCaseId === happyCase.id}
                    aria-hidden="true"
                  >
                    <ChevronRight />
                  </S.CaseArrow>
                </S.CaseFooter>
              </S.CaseContent>
            </S.HappyCaseCard>

            {expandedCaseId === happyCase.id && (
              <S.ExpandedContent>
                <S.FullDescription>{happyCase.description}</S.FullDescription>

                <S.Divider />

                <S.Owner>
                  <S.OwnerImage
                    src={`${import.meta.env.VITE_CLOUDFLARE_URL}${happyCase.owner.profileImageURL}`}
                    alt={`Foto de perfil de ${happyCase.owner.username}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = NOT_FOUND_IMAGE_URL;
                    }}
                  />

                  <S.OwnerInfo>
                    <S.OwnerName>
                      Publicado por <strong>{happyCase.owner.username}</strong>
                    </S.OwnerName>

                    <S.OwnerRole>
                      {happyCase.owner.mainRole === "RESCUER"
                        ? "Rescatista"
                        : "Comunidad"}
                    </S.OwnerRole>
                  </S.OwnerInfo>
                </S.Owner>
              </S.ExpandedContent>
            )}
          </S.CaseWrapper>
        ))}
      </S.CasesList>
    </S.Container>
  );
}

export default HappyCases;
