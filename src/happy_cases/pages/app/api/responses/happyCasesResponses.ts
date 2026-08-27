export type HappyCaseStatus = "FOUND" | "ADOPTED" | "RESCUED";

export type HappyCaseMainRole = "RESCUER" | "COMMUNITY";

export type HappyCaseOwner = {
  username: string;
  profileImageURL: string;
  mainRole: HappyCaseMainRole;
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
