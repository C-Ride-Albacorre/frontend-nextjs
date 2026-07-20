export interface ReverseGeocodeResult {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<ReverseGeocodeResult | null> {
  const res = await fetch(
    `/api/reverse-geocode?lat=${lat}&lng=${lng}`,
  );

  if (!res.ok) return null;

  return res.json();
}