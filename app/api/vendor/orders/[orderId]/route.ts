import { BASE_URL } from '@/config/api';
import { authFetch } from '@/features/libs/auth-fetch';
import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 },
      );
    }

    const res = await authFetch(`${BASE_URL}/vendor/orders/${orderId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message ?? 'Failed to fetch order details',
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order details fetched successfully',
      orderDetails: result?.data ?? null,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch order details',
      },
      { status: 500 },
    );
  }
}
