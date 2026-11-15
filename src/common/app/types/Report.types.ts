export type ReportPostType = "ANIMAL_POST" | "CAMPAIGN";

export type CreateReportRequest = {
  postId: string;
  type: ReportPostType;
};
