import type { CampaignResponse } from "@/common/app/types/Campaign.types";
import type { CampaignCardData } from "../components/campaign_card/CampaignCard";
import type { CampaignCategory, DonationItem } from "../app/types/Campaign.types";
import type { CampaignFilter } from "../app/api/requests/CampaignRequest";

export const mapCampaignToCardData = (
  campaign: CampaignResponse,
): CampaignCardData => ({
  id: campaign.id,
  type: campaign.type.toUpperCase(),
  title: campaign.title,
  description: campaign.description,
  location: campaign.location,
  imageUrl: campaign.imageId,
})

export const campaignCategoryLabels: Record<CampaignCategory, string> = {
  'DONATION': "Donación",
  'CASTRATION': "Castración",
  'VACCINATION': "Vacunación",
  'DEWORMING': "Desparasitación",
  'OTHER': "Otro",
};

export const CAMPAIGN_FILTER_LABELS: Record<CampaignFilter, string> = {
  '': 'Todos',
  ['DONATION']: 'Donación',
  ['CASTRATION']: `Castración`,
  ['VACCINATION']: 'Vacunación',
}

export const donationItemLabels: Record<DonationItem, string> = {
  "FOOD": 'Balanceado',
  "MEDICINE": 'Medicamentos',
  "SHELTER_AND_BEDDING": 'Camas',
  "TOYS_AND_ACCESSORIES": 'Accesorios',
  "CLOTHING_AND_BLANKETS": 'Ropa',
  "OTHER": 'Otro',
}