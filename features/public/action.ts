import { fetchNearbyStoresService } from "./service";

export async function fetchNearbyStoresAction(
  lat?: number,
  lng?: number,
  search?: string,
  radiusKm?: number,
  page?: number,
  limit?: number,
) {
  const result = await fetchNearbyStoresService(
    lat,
    lng,
    search,
    radiusKm,
    page,
    limit,
  );
  return {
    stores: result.data.data ?? [],
    total: result.data.meta?.total ?? 0,
  };
}
