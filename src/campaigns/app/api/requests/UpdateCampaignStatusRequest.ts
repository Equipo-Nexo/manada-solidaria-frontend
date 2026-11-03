export type UpdateCampaignStatusRequest = {
  campaignId: string
  status: 'CANCELLED' | 'COMPLETED' | 'FINISHED'
}
