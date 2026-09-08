export const capitalizeFirstLetter = (value: string) =>
    value ? `${value.charAt(0).toLocaleUpperCase('es-AR')}${value.slice(1)}` : value