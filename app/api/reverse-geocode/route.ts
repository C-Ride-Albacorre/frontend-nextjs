import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get('lat');
  const lng = request.nextUrl.searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { message: 'Latitude and longitude are required.' },
      { status: 400 },
    );
  }

  const url = new URL(
    'https://maps.googleapis.com/maps/api/geocode/json',
  );

  url.searchParams.set('latlng', `${lat},${lng}`);
  url.searchParams.set(
    'key',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  );

  const response = await fetch(url);

  const data = await response.json();

  if (!data.results?.length) {
    return NextResponse.json(null);
  }

  const result = data.results[0];

  const getComponent = (type: string) =>
    result.address_components.find((c: any) =>
      c.types.includes(type),
    )?.long_name || '';

  return NextResponse.json({
    address: result.formatted_address,
    city:
      getComponent('locality') ||
      getComponent('administrative_area_level_2'),
    state: getComponent('administrative_area_level_1'),
    country: getComponent('country'),
    postalCode: getComponent('postal_code'),
  });
}