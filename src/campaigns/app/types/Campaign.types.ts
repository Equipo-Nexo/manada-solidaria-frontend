export const campaignTypes = ["NEWS", "FUNDRAISING", "DONATION"]
export type CampaignType = typeof campaignTypes[number]

export const campaignCategories = [
  "FUNDRAISING",
  "DONATION",
  "CASTRATION",
  "VACCINATION",
  "DEWORMING",
  "OTHER"
]
export type CampaignCategory = typeof campaignCategories[number]


export const donationItems = [
  "FOOD",
  "MEDICINE",
  "SHELTER_AND_BEDDING",
  "TOYS_AND_ACCESSORIES",
  "CLOTHING_AND_BLANKETS",
  "OTHER"
]
export type DonationItem = typeof donationItems[number]
