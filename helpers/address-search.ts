export interface AddressSuggestion {
  id: string;
  description: string;
}

export async function searchAddress(query: string) {
  if (query.length < 3) return [];

  const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`);

  if (!res.ok) return [];

  return (await res.json()) as AddressSuggestion[];
}
