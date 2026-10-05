import type { AdoptionCategory } from '../../app/types/AdoptionForm.types';

export const adoptionFormMock: AdoptionCategory[] = [
    {
        id: "home",
        category: "Tu hogar",
        description: "Queremos conocer el lugar donde vivirá el animal.",
        questions: [
            {
                id: "housing-type",
                type: "SELECTION",
                iconName: "Home",
                title: "Tipo de vivienda",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Casa" },
                    { description: "Departamento" },
                    { description: "Otro" },
                ],
            },
            {
                id: "rents-home",
                type: "SELECTION",
                iconName: "Building",
                title: "¿Alquilás?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "pets-allowed",
                type: "SELECTION",
                iconName: "Dog",
                title: "¿Te permiten mascotas los dueños?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                    { description: "No corresponde" },
                ],
            },
            {
                id: "enclosed-yard",
                type: "SELECTION",
                iconName: "Garden",
                title: "¿Contás con patio cerrado?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "lives-with-others",
                type: "SELECTION",
                iconName: "Users",
                title: "¿Vivís con otras personas?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "has-other-pets",
                type: "SELECTION",
                iconName: "PawPrint",
                title: "¿Tenés otras mascotas?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "other-pets-description",
                type: "TEXT",
                iconName: "File",
                title: "Si tenés otras mascotas, contanos cuáles y sus edades...",
                placeHolder: "Ej: Tengo un perro de 3 años y un gato de 5 meses...",
                details: [],
            },
        ],
    },
    {
        id: "adoption",
        category: "Sobre la adopción",
        description:
            "Estas preguntas ayudan a encontrar la mejor familia para cada animal.",
        questions: [
            {
                id: "previous-pet-experience",
                type: "SELECTION",
                iconName: "HandHeart",
                title: "¿Tenés experiencia previa con mascotas?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "can-cover-pet-expenses",
                type: "SELECTION",
                iconName: "DollarSign",
                title:
                    "¿Tenés posibilidad de darle atención veterinaria / vacunas / balanceado?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "additional-information",
                type: "TEXT",
                iconName: "MessageSquare",
                title: "¿Algo más que quieras contarnos?",
                placeHolder:
                    "Cualquier información adicional que creas relevante...",
                details: [],
            },
        ],
    },
];

export const MockedQuestionsResponse = adoptionFormMock;
