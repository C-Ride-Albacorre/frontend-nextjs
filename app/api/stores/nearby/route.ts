// app/api/stores/nearby/route.ts
import { BASE_URL } from '@/config/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const params = new URLSearchParams();

  // Forward all params the client sends
  const search = searchParams.get('search');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radiusKm = searchParams.get('radiusKm');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  const categoryId = searchParams.get('categoryId');

  if (search) params.set('search', search);
  if (lat) params.set('lat', lat);
  if (lng) params.set('lng', lng);
  if (radiusKm) params.set('radiusKm', radiusKm);
  if (limit) params.set('limit', limit);
  if (page) params.set('page', page);
  if (categoryId) params.set('categoryId', categoryId);

  // ✅ Changed from /customer/stores/nearby → /customer/stores
  const res = await fetch(`${BASE_URL}/customer/stores?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
