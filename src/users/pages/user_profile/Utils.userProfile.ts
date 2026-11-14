const calculateMembershipDuration = (
    createdAt: string | Date,
    currentDate = new Date(),
): { years: number; months: number; days: number } | null => {
    const createdDate = new Date(createdAt);

    if (
        Number.isNaN(createdDate.getTime()) ||
        Number.isNaN(currentDate.getTime())
    ) {
        return null;
    }

    let totalMonths =
        (currentDate.getFullYear() - createdDate.getFullYear()) * 12 +
        currentDate.getMonth() -
        createdDate.getMonth();

    if (currentDate.getDate() < createdDate.getDate()) {
        totalMonths--;
    }

    totalMonths = Math.max(0, totalMonths);

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.max(
        0,
        Math.floor((currentDate.getTime() - createdDate.getTime()) / millisecondsPerDay),
    );

    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12,
        days: totalMonths === 0 ? totalDays : 0,
    };
};

export const formatMembershipDuration = (
    createdAt: string | Date,
    currentDate = new Date(),
): string => {
    const duration = calculateMembershipDuration(createdAt, currentDate);
    if (!duration) return "-";

    const { years, months, days } = duration;

    if (years > 0) {
        return `${years} ${years === 1 ? "año" : "años"}`;
    }

    if (months > 0) {
        return `${months} ${months === 1 ? "mes" : "meses"}`;
    }

    return `${days} ${days === 1 ? "día" : "días"}`;
};

