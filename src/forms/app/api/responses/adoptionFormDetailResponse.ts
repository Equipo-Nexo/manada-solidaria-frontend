import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";
import type { AdoptionFormAnswer } from "../../types/AdoptionFormDetail.types";

export interface AdoptionFormDetailResponse {
  id: string;
  adoptionPostId: string;
  animalName: string;
  animalImageUrl: string;
  applicantId: string;
  applicantName: string;
  description: string;
  phoneNumber: PhoneNumber;
  isRead: boolean;
  createdAt: string;
  categories: {
    categoryId: string;
    categoryName: string;
    questions: AdoptionFormAnswer[];
  }[];
}
