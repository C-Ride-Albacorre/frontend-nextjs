import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const url = new URL(
    'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  );

  url.searchParams.set('input', query);
  url.searchParams.set('components', 'country:ng');
  url.searchParams.set(
    'key',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  );

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(
    (data.predictions ?? []).map((item: any) => ({
      placeId: item.place_id,
      description: item.description,
    })),
  );
}