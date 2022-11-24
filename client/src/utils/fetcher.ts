type FetcherResults<T> = Promise<{ data: T; error: null } | { data: null; error: Error }>

export default async function fetcher<T = any>(
  url: string,
  options?: RequestInit
): FetcherResults<T> {
  const OPTIONS: RequestInit = {
    ...options,
    headers:
      options?.method !== 'POST'
        ? options?.headers
        : {
            'Content-Type': 'application/json',
            ...options.headers,
          },
  }

  return await fetch(url, OPTIONS).then((res) => {
    if (res.ok) {
      return res.json().then((data) => ({ data, error: null }))
    } else {
      return res.json().then((error) => {
        console.error(error)
        return { data: null, error }
      })
    }
  })
}
