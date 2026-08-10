export function buildDateTime(date?: string, time?: string): string {
  return `${date}T${time}:00`;
}

export const splitDateTime = (dateTime?: string) => ({
  date: dateTime?.slice(0, 10) ?? '',
  time: dateTime?.slice(11, 16) ?? '',
})