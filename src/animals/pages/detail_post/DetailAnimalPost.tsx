import { useParams } from "react-router-dom";
import { useGetAnimalPostQuery } from "@/animals/app/api/animalPostsApi";
import AnimalPostDetailContent from "@/animals/components/animal_post_detail_content/AnimalPostDetailContent";
import Layout from "@/common/components/layout/Layout";

function AnimalPostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const {
    data: postData,
    isLoading,
    isError,
  } = useGetAnimalPostQuery(postId ?? "", { skip: !postId });

  return (
    <Layout
      title={`Detalle de la Publicación`}
      isLoading={isLoading}
      loadingMessage="Cargando publicación..."
      isError={isError || !postData}
      errorMessage="No pudimos cargar esta publicación."
    >
      {postData && <AnimalPostDetailContent postData={postData} />}
    </Layout>
  );
}

export default AnimalPostDetail;
