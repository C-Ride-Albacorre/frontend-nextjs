// app/api/place-details/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json(
      { message: 'placeId required' },
      { status: 400 },
    );
  }

  const url = new URL(
    'https://maps.googleapis.com/maps/api/place/details/json',
  );

  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'formatted_address,geometry');
  url.searchParams.set(
    'key',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  );

  const response = await fetch(url);
  const data = await response.json();

  const result = data.result;

  return NextResponse.json({
    address: result.formatted_address,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
  });
}