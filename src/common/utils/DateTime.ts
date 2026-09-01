export function buildDateTime(date?: string, time?: string): string {
  return `${date}T${time}:00`;
}

export const splitDateTime = (dateTime?: string) => ({
  date: dateTime?.slice(0, 10) ?? '',
  time: dateTime?.slice(11, 16) ?? '',
})

export const formatDateLong = (date: string | Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
  }).format(new Date(date));

export const formatDateTimeLong = (dateTime: string | Date) => {
  const date = new Date(dateTime)
  const dateParts = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(date)
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((part) => part.type === type)?.value ?? ''
  const weekday = getPart('weekday')
  const formattedDate = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${getPart('day')} de ${getPart('month')} ${getPart('year')}`
  const formattedTime = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)

  return {
    date: formattedDate,
    time: `${formattedTime} hs`,
  }
}
