export function buildDateTime(date?: string, time?: string): string {
  return `${date}T${time}:00`;
}