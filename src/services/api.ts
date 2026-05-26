const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
