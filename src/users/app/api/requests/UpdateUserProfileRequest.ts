export interface UpdateUserProfileRequest {
  name?: string | null;
  lastname?: string | null;
  email: string;
  phoneNumber?: string | null;
  profileImageURL?: string | null;
}

export interface UpdateUserProfileResponse {
  name: string | null;
  lastname: string | null;
  email: string;
  phoneNumber: string | null;
  profileImageURL: string | null;
}
