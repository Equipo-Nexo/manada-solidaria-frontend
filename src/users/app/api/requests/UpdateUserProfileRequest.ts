export interface UpdateUserProfileRequest {
  name?: string;
  lastname?: string;
  email: string;
  phoneNumber?: string;
  profileImageURL?: string;
}

export interface UpdateUserProfileResponse {
  name: string | null;
  lastname: string | null;
  email: string;
  phoneNumber: string | null;
  profileImageURL: string | null;
}
