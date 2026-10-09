import type { Role } from "@/users/app/types/User.types";
export type HappyCaseStatus = "FOUND" | "ADOPTED" | "RESCUED";

export type HappyCaseOwner = {
  username: string;
  profileImageURL: string;
  roles: Role[];
};

export type HappyCaseResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: HappyCaseStatus;
  isRecent: boolean;
  owner: HappyCaseOwner;
};
