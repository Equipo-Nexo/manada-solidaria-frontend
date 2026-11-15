export async function requestNotificationAction({ action, data }) {
    const path = action.url;
    const method = action.httpMethod;
    const headers = action.headers ?? {};
    const body = action.body ?? null;
    const url = import.meta.env.VITE_API_BASE_URL + path;

    fetch(url, {
        method,
        headers,
        body,
    })
        .then((data) => {
            console.log('Request successful:', data);
        })
        .catch((error) => {
            console.error('Request failed:', error);
        });
}
