// export interface AddressSuggestion {
//   id: string;
//   description: string;
// }

// export async function searchAddress(query: string) {
//   if (query.length < 3) return [];

//   const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`);

//   if (!res.ok) return [];

//   return (await res.json()) as AddressSuggestion[];
// }

export type AddressSuggestion = {
  description: string;
  placeId: string;
};

export async function searchAddress(
  query: string,
): Promise<AddressSuggestion[]> {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `/api/google-autocomplete?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) return [];

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Address search error:', error);
    return [];
  }
}
