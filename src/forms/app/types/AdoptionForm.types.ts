export interface AdoptionQuestion {
  id: string;
  type: 'TEXT' | 'SELECTION' | 'PHONE';
  iconName: string;
  title: string;
  placeHolder: string;
  required?: boolean;
  details: { description: string }[];
}

export interface AdoptionCategory {
  id: string;
  category: string;
  description: string;
  questions: AdoptionQuestion[];
}

