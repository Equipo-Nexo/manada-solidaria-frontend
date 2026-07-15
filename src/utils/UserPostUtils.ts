type PostUtil = {
    text: string;
    backgroundColor: string;
    fontColor: string;
}

export const UserPostUtil: Record<string, PostUtil> = {
    'SEARCHING': {
        text: 'Perdido',
        backgroundColor: '#FFA49F',
        fontColor: '#B3261E'
    },
    'FOUND': {
        text: 'Encontrado',
        backgroundColor: '#CCF59B',
        fontColor: '#60B100'
    },
    'SEARCHING_ADOPT_AND_TRANSIT': {
        text: 'En tránsito',
        backgroundColor: '#F5E7D4',
        fontColor: '#EA5F09'
    },
    'SEARCHING_ADOPT': {
        text: 'En adopción',
        backgroundColor: '#CBB6FF',
        fontColor: '#4F378A'
    },
    'ADOPTED': {
        text: 'Adoptado',
        backgroundColor: '#F5E7D4',
        fontColor: '#A95C28'
    },
    'CREATED': {
        text: 'Creado',
        backgroundColor: '#F5E7D4',
        fontColor: '#A95C28'
    }
}