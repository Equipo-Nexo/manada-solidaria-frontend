export function recordToOptions<T extends string>(
  values: Record<T, string>,
): { value: T; label: string }[] {
  return (Object.entries(values) as [T, string][])
    .map(([value, label]) => ({
      value,
      label,
    }));
}