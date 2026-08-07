export const campaignFilters = [ '', "DONATION", "CASTRATION", "VACCINATION" ] as const;
export type CampaignFilter = typeof campaignFilters[number];