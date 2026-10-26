export const getInitials = (name?: string | null): string => {
  if (!name?.trim()) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};
