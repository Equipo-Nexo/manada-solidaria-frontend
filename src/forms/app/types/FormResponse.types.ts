export interface FormResponse {
    counters: Counters,
    forms: Form[],
}

interface Counters {
    total: number,
    pending: number,
    reviewed: number
}

interface Form {
    id: string,
    animalName: string | null,
    animalImageUrl: string,
    applicantName: string,
    description: string | null,
    isRead: boolean,
    createdAt: string
}


