export const campaignTypes = ["NEWS", "FUNDRAISING", "DONATION"]
export type CampaignType = typeof campaignTypes[number]

export const campaignCategories = [
  "DONATION",
  "CASTRATION",
  "VACCINATION",
  "DEWORMING",
  "OTHER",
  "FUNDRAISING",
]
export type CampaignCategory = typeof campaignCategories[number]


export const donationItems = [
  "CLOTHING_AND_BLANKETS",
  "FOOD",
  "TOYS_AND_ACCESSORIES",
  "SHELTER_AND_BEDDING",
  "MEDICINE",
  "OTHER"
] as const
export type DonationItem = typeof donationItems[number]
