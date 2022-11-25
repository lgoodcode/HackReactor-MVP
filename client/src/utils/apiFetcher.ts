import fetcher from './fetcher'

const API_URL = import.meta.env.VITE_API_URL

export default async function apiFetcher<T = any>(url: string, options?: RequestInit) {
  return await fetcher<T>(`${API_URL}${url}`, options)
}
