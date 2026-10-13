import type { AdoptionFormDetailResponse } from "../app/api/responses/adoptionFormDetailResponse";

export const adoptionFormDetailMock: AdoptionFormDetailResponse = {
  id: "c67cdbc3-d47a-476d-8c4a-5295e45f87ed",
  adoptionPostId: "6d75c24d-c4a6-45bb-8292-79eb9fe81f26",
  animalName: "Pupi",
  animalImageUrl: "/mocks/adoption-animal.png",
  applicantId: "8477ca89-dab5-4972-987d-4a9e6fba35db",
  applicantName: "Rocío Menardi",
  description:
    "Quiero una gatita para que le haga compañía a mi gato de 2 años para que crezcan juntos.",
  phoneNumber: { areaCode: "353", number: "4014524" },
  isRead: false,
  createdAt: "2026-09-20T12:00:00",
  categories: [
    {
      categoryId: "11111111-1111-4111-a111-111111111111",
      categoryName: "Tu hogar",
      questions: [
        {
          questionId: "home-1",
          questionTitle: "Tipo de vivienda",
          iconName: "Home",
          answer: "Casa",
        },
        {
          questionId: "home-2",
          questionTitle: "¿Alquilas?",
          iconName: "Building",
          answer: "Sí",
        },
        {
          questionId: "home-3",
          questionTitle: "¿Te permiten mascotas los dueños?",
          iconName: "Dog",
          answer: "Sí",
        },
        {
          questionId: "home-4",
          questionTitle: "¿Contás con patio cerrado?",
          iconName: "Garden",
          answer: "Sí",
        },
        {
          questionId: "home-5",
          questionTitle: "¿Vivís con otras personas?",
          iconName: "Users",
          answer: "Sí",
        },
        {
          questionId: "home-6",
          questionTitle: "¿Tenés otras mascotas?",
          iconName: "PawPrint",
          answer: "Sí",
        },
        {
          questionId: "home-7",
          questionTitle:
            "Si tenés otras mascotas, contanos cuáles y sus edades...",
          iconName: "File",
          answer: "Tengo una gata hembra de aprox 2 años.",
        },
      ],
    },
    {
      categoryId: "22222222-2222-4222-a222-222222222222",
      categoryName: "Sobre la adopción",
      questions: [
        {
          questionId: "adoption-1",
          questionTitle: "¿Tenés experiencia previa con mascotas?",
          iconName: "HeartHandshake",
          answer: "Sí",
        },
        {
          questionId: "adoption-2",
          questionTitle:
            "¿Tenés posibilidad de darle atención veterinaria / vacunas / balanceado?",
          iconName: "DollarSign",
          answer: "Sí",
        },
        {
          questionId: "adoption-3",
          questionTitle: "¿Algo más que quieras contarnos?",
          iconName: "MessageSquare",
          answer: "",
        },
      ],
    },
  ],
};
