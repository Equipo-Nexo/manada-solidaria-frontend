import type { AdoptionCategory } from '../../app/types/AdoptionForm.types';

export const adoptionFormMock: AdoptionCategory[] = [
    {
        id: "11111111-1111-4111-a111-111111111111",
        category: "Tu hogar",
        description: "Queremos conocer el lugar donde vivirá el animal.",
        questions: [
            {
                id: "a1000000-0000-4000-a000-000000000001",
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
                id: "a1000000-0000-4000-a000-000000000002",
                type: "SELECTION",
                iconName: "Building",
                title: "¿Alquilas?",
                placeHolder: "Seleccioná una opción",
                details: [
                    { description: "Sí" },
                    { description: "No" },
                ],
            },
            {
                id: "a1000000-0000-4000-a000-000000000003",
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
                id: "a1000000-0000-4000-a000-000000000004",
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
                id: "a1000000-0000-4000-a000-000000000005",
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
                id: "a1000000-0000-4000-a000-000000000006",
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
                id: "a1000000-0000-4000-a000-000000000007",
                type: "TEXT",
                iconName: "File",
                title: "Si tenés otras mascotas, contanos cuáles y sus edades...",
                placeHolder: "Ej: Tengo un perro de 3 años y un gato de 5 meses...",
                details: [],
            },
        ],
    },
    {
        id: "22222222-2222-4222-a222-222222222222",
        category: "Sobre la adopción",
        description:
            "Estas preguntas ayudan a encontrar la mejor familia para cada animal.",
        questions: [
            {
                id: "a2000000-0000-4000-a000-000000000001",
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
                id: "a2000000-0000-4000-a000-000000000002",
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
                id: "a2000000-0000-4000-a000-000000000003",
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
