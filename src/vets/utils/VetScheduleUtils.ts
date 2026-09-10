import type { VetCalendarEntry } from "@/vets/app/api/responses/vetsResponse";

const DAY_NAMES: Record<string, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

const formatTime = (time: string) => time.slice(0, 5);

const getDayEntries = (calendar: VetCalendarEntry[], dayOfWeek: string) =>
  calendar
    .filter((entry) => entry.dayOfWeek === dayOfWeek)
    .sort((a, b) => a.openingTime.localeCompare(b.openingTime));

const formatTimeRange = (entry: VetCalendarEntry) =>
  `${formatTime(entry.openingTime)} - ${formatTime(entry.closingTime)}`;

export const getCurrentDayOfWeek = () => {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return days[new Date().getDay()];
};

export const getTodayHours = (
  calendar: VetCalendarEntry[],
  dayOfWeek: string,
) => {
  const todayEntries = getDayEntries(calendar, dayOfWeek);

  if (todayEntries.length === 0) {
    return "Hoy cerrado";
  }

  return `Hoy ${todayEntries.map(formatTimeRange).join(" | ")} hs`;
};

export const formatSchedule = (calendar: VetCalendarEntry[]) => {
  return Object.entries(DAY_NAMES)
    .map(([day, dayName]) => {
      const entries = getDayEntries(calendar, day);

      if (entries.length === 0) {
        return `${dayName}: Cerrado`;
      }

      return `${dayName}: ${entries.map(formatTimeRange).join(" | ")} hs`;
    })
    .join("\n");
};
