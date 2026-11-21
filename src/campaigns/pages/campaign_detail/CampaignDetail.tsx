import { useGetCampaignQuery } from "@/campaigns/app/api/campaignApi";
import Layout from "@/common/components/layout/Layout";
import CampaignDetailContent from "@/campaigns/components/campaign_detail_content/CampaignDetailContent";
import { useParams } from "react-router-dom";

function CampaignDetail() {
  const { campaignId } = useParams<{ campaignId: string }>();

  const { data: campaignData, isLoading, isError } = useGetCampaignQuery(campaignId!);

  return (
    <Layout
      title={`Información de la Campaña`}
      isLoading={isLoading}
      loadingMessage="Cargando campaña..."
      isError={isError || !campaignData}
      errorMessage="No pudimos cargar esta campaña."
    >
      {campaignData && <CampaignDetailContent campaignData={campaignData} />}
    </Layout>
  );
}
export default CampaignDetail;
