function getOwnerRole(roles: string[]) {
    const isRescuer = roles.includes('RESCUER')
    const isCarriage = roles.includes('CARRIAGE')

    if (isRescuer && isCarriage) return 'Rescatista y transportista'
    if (isRescuer) return 'Rescatista'
    if (isCarriage) return 'Transportista'
    return 'Miembro de la comunidad'
}

export getOwnerRole