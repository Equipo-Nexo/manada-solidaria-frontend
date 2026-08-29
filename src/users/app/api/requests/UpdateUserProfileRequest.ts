import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";

export interface UpdateUserProfileRequest {
  name?: string | null;
  lastname?: string | null;
  email: string;
  phoneNumber?: PhoneNumber | null;
  profileImageURL?: string | null;
}

export interface UpdateUserProfileResponse {
  name: string | null;
  lastname: string | null;
  email: string;
  phoneNumber: PhoneNumber | null;
  profileImageURL: string | null;
}
