import { useGetFundraisingCampaignsQuery } from "@campaigns/app/api/campaignApi";
import { mapFundraisingToCardData } from "@components/fundraisingCard/mapFundraisingToCardData";
import FundraisingList from "./FundraisingList";
import Layout from "@/common/components/layout/Layout";

function Fundraising() {
  const { data, isError, isLoading } = useGetFundraisingCampaignsQuery();

  const fundraisings = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const fundraisingCards = fundraisings.map(mapFundraisingToCardData);

  return (
    <Layout
      title="Casos urgentes"
      subtitle={
        isLoading
          ? "Cargando resultados..."
          : `${totalElements} ${totalElements === 1 ? "resultado" : "resultados"}`
      }
      isLoading={isLoading}
      isError={isError}
    >
      <FundraisingList fundraisings={fundraisingCards} />
    </Layout>
  );
}

export default Fundraising;
