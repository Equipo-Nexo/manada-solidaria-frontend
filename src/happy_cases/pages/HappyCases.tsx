import { Arrow, ChevronRight, Heart, PawPrint } from "@/common/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import * as S from "./HappyCases.styles";
import { useGetHappyCasesQuery } from "./app/api/happyCasesApi";
import { Loader } from "@/common/components";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import Stories from "./Stories";
import { statusLabel } from "./app/api/responses/happyCasesResponses";
import { createPagePaws } from "@/common/utils/PagePawUtils";

function HappyCases() {
  const navigate = useNavigate();
  const location = useLocation();
  const pagePaws = useMemo(() => createPagePaws(location.key), [location.key]);
  const { data, isLoading } = useGetHappyCasesQuery({
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
  const scrollToFeaturedCase = (index: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !card) return;

    carousel.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  );
  if (isLoading) {
    return (
      <S.Container>
        <Loader label="Cargando casos felices..." />
      </S.Container>
    );
  }
  return (
    <S.Container>
      <S.PagePaws aria-hidden="true">
        {pagePaws.map((paw, index) => (
          <S.PagePaw
            key={index}
            $left={paw.left}
            $top={paw.top}
            $size={paw.size}
            $rotation={paw.rotation}
            $opacity={paw.opacity}
          />
        ))}
      </S.PagePaws>
      <S.Intro>
        <S.IntroHeader>
          <S.BackButton onClick={() => navigate("/home")}>
            <Arrow aria-hidden="true" />
          </S.BackButton>
          <S.Title>Casos Felices</S.Title>
        </S.IntroHeader>
      </S.Intro>

      <S.FeaturedLayout>
        <S.Description>
          <S.DescriptionIcon>
            <PawPrint aria-hidden="true" />
          </S.DescriptionIcon>
          <S.DescriptionText>
            Celebramos las segundas oportunidades. Conocé las historias de éxito
            que llenan de alegría a nuestra comunidad.
          </S.DescriptionText>
        </S.Description>

        {recentCases.length > 0 && (
          <>
            <S.FeaturedCarouselArea>
              <S.CarouselArrow
                type="button"
                $direction="previous"
                aria-label="Ver caso anterior"
                disabled={activeIndex === 0}
                onClick={() => scrollToFeaturedCase(activeIndex - 1)}
              >
                <ChevronRight aria-hidden="true" />
              </S.CarouselArrow>

              <S.FeaturedCarousel
                ref={carouselRef}
                onScroll={handleCarouselScroll}
              >
                {recentCases.map((happyCase) => (
                  <S.FeaturedCard key={happyCase.id}>
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
                          onClick={() => {
                            const index = recentCases.findIndex(
                              ({ id }) => id === happyCase.id,
                            );

                            setSelectedStoryIndex(index);
                          }}
                        >
                          Ver historia
                          <ChevronRight aria-hidden="true" />
                        </S.StoryButton>
                      </S.FeaturedInfo>
                    </S.FeaturedContent>
                    <S.FeaturedImage
                      src={`${import.meta.env.VITE_CLOUDFLARE_URL}${happyCase.imageUrl}`}
                      alt={`Foto de ${happyCase.name}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = NOT_FOUND_IMAGE_URL;
                      }}
                    />
                  </S.FeaturedCard>
                ))}
              </S.FeaturedCarousel>

              <S.CarouselArrow
                type="button"
                $direction="next"
                aria-label="Ver caso siguiente"
                disabled={activeIndex === recentCases.length - 1}
                onClick={() => scrollToFeaturedCase(activeIndex + 1)}
              >
                <ChevronRight aria-hidden="true" />
              </S.CarouselArrow>
            </S.FeaturedCarouselArea>
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
      </S.FeaturedLayout>
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
      {selectedStoryIndex !== null && (
        <Stories
          cases={recentCases}
          initialIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}
    </S.Container>
  );
}

export default HappyCases;
