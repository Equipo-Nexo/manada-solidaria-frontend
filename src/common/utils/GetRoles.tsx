function getOwnerRole(roles: string[]) {
    const isRescuer = roles.includes('RESCUER')
    const isCarriage = roles.includes('CARRIAGE')

    if (isRescuer) return 'Rescatista'
    if (isCarriage) return 'Transporte'
    return 'Comunidad'
}

export default getOwnerRole