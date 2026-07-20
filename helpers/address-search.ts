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
  const response = await fetch(
    `/api/address-search?input=${encodeURIComponent(query)}`,
  );

  const data = await response.json();

  return data.predictions.map((prediction: any) => ({
    description: prediction.description,
    placeId: prediction.place_id,
  }));
}