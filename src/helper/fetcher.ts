export interface FetcherConfig {
  url: string;
}

export const token = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetcher<T>(config: FetcherConfig): Promise<T> {
  const { url } = config;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return (await response.json()) as T;
}
