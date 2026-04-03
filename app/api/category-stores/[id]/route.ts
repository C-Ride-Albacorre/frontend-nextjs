import { fetchCategoryStoresService } from '@/features/user/delivery/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;

  const lat = searchParams.get('lat')
    ? parseFloat(searchParams.get('lat')!)
    : undefined;
  const lng = searchParams.get('lng')
    ? parseFloat(searchParams.get('lng')!)
    : undefined;
  const subcategoryId = searchParams.get('subcategoryId') ?? undefined;
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page')!)
    : undefined;
  const limit = searchParams.get('limit')
    ? parseInt(searchParams.get('limit')!)
    : 5;
  const search = searchParams.get('search') ?? undefined;
  const radiusKm = searchParams.get('radiusKm')
    ? parseFloat(searchParams.get('radiusKm')!)
    : undefined;

  try {
    const result = await fetchCategoryStoresService(
      id,
      lat,
      lng,
      subcategoryId,
      page,
      limit,
      search,
      radiusKm,
    );

    return NextResponse.json({
      stores: result.data?.data ?? [],
      total: result.data?.total ?? 0,
    });
  } catch {
    return NextResponse.json(
      { stores: [], total: 0, error: 'Failed to fetch stores' },
      { status: 500 },
    );
  }
}
