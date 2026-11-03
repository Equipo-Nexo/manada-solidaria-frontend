import type { Location } from "@/common/app/services/responses/Location";

export type VetPhoneNumber = {
  areaCode: string;
  number: string;
};

export type VetCalendarEntry = {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
};

export type VetResponse = {
  id: string;
  name: string;
  phoneNumber: VetPhoneNumber;
  email: string;
  profilePictureUrl?: string;
  vetPageUrl?: string;
  description: string;
  location: Location;
  isOpen: boolean;
  distanceInKm: number | null;
  calendar: VetCalendarEntry[];
};
