export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (!error || typeof error !== 'object' || !('data' in error)) {
        return fallback;
    }

    const { data } = error;
    if (!data || typeof data !== 'object') {
        return fallback;
    }

    if ('errors' in data && Array.isArray(data.errors)) {
        const message = data.errors
            .filter((item): item is string => typeof item === 'string')
            .map((item) => item.trim())
            .filter(Boolean)
            .join(' ');

        if (message) {
            return message;
        }
    }

    if ('message' in data && typeof data.message === 'string' && data.message.trim()) {
        return data.message.trim();
    }

    return fallback;
}
