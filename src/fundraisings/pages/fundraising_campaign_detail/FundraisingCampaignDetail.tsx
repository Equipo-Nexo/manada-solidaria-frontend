import { useParams } from "react-router-dom";
import { useGetFundraisingByIdQuery } from "@/campaigns/app/api/campaignApi";
import FundraisingCampaignDetailContent from "@/fundraisings/components/fundraising_campaign_detail_content/FundraisingCampaignDetailContent";
import Layout from "@/common/components/layout/Layout";

function FundraisingCampaignDetail() {
  const { fundraisingId } = useParams();
  const { data, isLoading, isError } = useGetFundraisingByIdQuery(fundraisingId!);

  return (
    <Layout
      title={`Información de la Colecta`}
      isLoading={isLoading}
      loadingMessage="Cargando colecta..."
      isError={isError || !data}
      errorMessage="No pudimos cargar esta colecta."
    >
      {data && <FundraisingCampaignDetailContent {...data} />}
    </Layout>
  );
}
export default FundraisingCampaignDetail;
