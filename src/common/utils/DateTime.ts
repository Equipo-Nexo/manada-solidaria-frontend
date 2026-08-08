export function buildDateTime(date?: string, time?: string): string {
  console.log('_debug', `${date}T${time}:00`)
  return `${date}T${time}:00`;
}