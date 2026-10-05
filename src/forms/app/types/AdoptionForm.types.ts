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

// Internal submission data; adapt to the endpoint DTO once its contract is available.
export interface AdoptionFormSubmission {
  answers: { categoryId: string; questionId: string; value: string }[];
  adoptionReason: string;
  phoneNumber: { areaCode: string; number: string };
}
