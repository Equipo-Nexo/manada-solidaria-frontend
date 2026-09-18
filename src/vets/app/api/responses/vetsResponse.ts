export type VetPhoneNumber = {
  areaCode: string;
  number: string;
};

export type VetLocation = {
  id: string;
  name: string;
  address: string;
  number: number;
  latitude: number;
  longitude: number;
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
  location: VetLocation;
  calendar: VetCalendarEntry[];
};
